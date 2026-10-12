#!/usr/bin/env python3
"""Send the morning-brief notification to every phone that turned it on.

Runs in GitHub Actions (.github/workflows/morning-push.yml) right after data/briefings.json is
published, plus one later backup run. It needs the repository secret FIREBASE_SERVICE_ACCOUNT
(the Firebase service-account JSON file's contents) and never prints it or any phone's token.

MODE=brief (default)  send today's brief (Beirut date), at most once per day; the date of the
                      last send is kept in Firestore at meta/lastPush
MODE=test             send the newest brief now, whatever its date, without counting it as
                      today's send (used to check that notifications work)
"""
import datetime as dt
import json
import math
import os
import re
import sys
import time
from zoneinfo import ZoneInfo

import requests

FIRESTORE = "https://firestore.googleapis.com/v1"
FCM = "https://fcm.googleapis.com/v1"
SCOPES = ["https://www.googleapis.com/auth/firebase.messaging", "https://www.googleapis.com/auth/datastore"]
BEIRUT = ZoneInfo("Asia/Beirut")
BRIEFINGS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "briefings.json")
TEXT = {
    "en": {"title": "Your 60-second brief is ready", "top": "Top event: ", "leb": "Lebanon: ",
           "a1": "Read in 60 seconds", "a2": "Listen"},
    "ar": {"title": "موجزك في 60 ثانية جاهز", "top": "الحدث الأبرز: ", "leb": "لبنان: ",
           "a1": "اقرأ في 60 ثانية", "a2": "استمع"},
    "fr": {"title": "Votre briefing en 60 secondes est prêt", "top": "Événement clé : ", "leb": "Liban : ",
           "a1": "Lire en 60 secondes", "a2": "Écouter"},
}
LEBRANK = {"high": 0, "medium": 1, "low": 2}


def note(msg):
    """Plain log line plus a notice on the GitHub Actions run page."""
    print(f"::notice::{msg}" if os.environ.get("GITHUB_ACTIONS") else msg)
    summary = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary:
        with open(summary, "a", encoding="utf-8") as f:
            f.write(msg + "\n\n")


# ---------- what to say ----------

def js_number(v):
    """JavaScript Number(v), for the JSON values a briefing holds."""
    if v is None:
        return 0.0
    if isinstance(v, bool):
        return 1.0 if v else 0.0
    if isinstance(v, (int, float)):
        return float(v)
    s = str(v).strip()
    if not s:
        return 0.0
    try:
        return float(s)
    except ValueError:
        return float("nan")


def impact(e):
    """The app's impact score (0-100): Goldstein severity 50, market move 25, human toll 25."""
    g = js_number(e["goldstein"]) if "goldstein" in e else float("nan")
    s = 50 * max(0.0, min(1.0, (10 - g) / 20)) if math.isfinite(g) else 0
    mv = e.get("marketMovePct")
    m = 25 * min(abs(js_number(mv)) / 5, 1) if mv is not None and math.isfinite(js_number(mv)) else 0
    c = e.get("casualties") or {}
    k, i = js_number(c.get("killed")), js_number(c.get("injured"))
    k, i = (k if math.isfinite(k) else 0), (i if math.isfinite(i) else 0)
    h = 0 if c.get("known") is False else 25 * min(math.log10(max(1.0, 1 + k + 0.25 * i)) / 3, 1)
    return math.floor(s + m + h + 0.5)


def first_sentence(text):
    text = " ".join(str(text or "").split())
    m = re.search(r"(?<!\b[A-Z])[.!?؟](?=\s|$)", text)
    return text[: m.end()] if m else text


def localized(b, lang, section, i, field):
    tr = b.get(lang) if lang != "en" else None
    items = (tr or {}).get(section) or []
    if i < len(items) and isinstance(items[i], dict) and items[i].get(field):
        return items[i][field]
    return ((b.get(section) or [{}])[i] or {}).get(field, "")


def message(b, lang):
    """Notification fields for one language; falls back to English when the brief isn't translated yet."""
    if lang not in TEXT or (lang != "en" and not isinstance(b.get(lang), dict)):
        lang = "en"
    t = TEXT[lang]
    lines = []
    pol = b.get("politics") or []
    if pol:
        top = sorted(range(len(pol)), key=lambda i: -impact(pol[i]))[0]          # same order as the app's top event
        lines.append(t["top"] + localized(b, lang, "politics", top, "title"))
    else:
        head = (b.get(lang) or {}).get("headline") if lang != "en" else b.get("headline")
        lines.append(first_sentence(head or b.get("headline", "")))
    leb = b.get("lebanon") or []
    if leb:
        first = sorted(range(len(leb)), key=lambda i: LEBRANK.get(leb[i].get("severity"), 3))[0]
        lines.append(t["leb"] + localized(b, lang, "lebanon", first, "title"))
    body = "\n".join(x for x in lines if x.strip())
    if len(body) > 240:
        body = body[:239].rsplit(" ", 1)[0] + "…"
    return {"title": t["title"], "body": body, "lang": lang, "url": "./?open=quick", "tag": "rb-morning",
            "a1": t["a1"], "a2": t["a2"]}


def newest_brief(path=None):
    with open(path or BRIEFINGS, encoding="utf-8") as f:
        data = json.load(f)
    if not data:
        return None
    key = max(data, key=lambda k: data[k].get("date", k))
    b = data[key]
    b.setdefault("date", key)
    return b


# ---------- Firebase ----------

def access_token(info):
    from google.auth.transport.requests import Request
    from google.oauth2 import service_account
    creds = service_account.Credentials.from_service_account_info(info, scopes=SCOPES)
    creds.refresh(Request())
    return creds.token


class Store:
    """The few Firestore calls we need (the service account bypasses the website's security rules)."""

    def __init__(self, sess, project):
        self.s = sess
        self.base = f"{FIRESTORE}/projects/{project}/databases/(default)/documents"

    def tokens(self):
        out, page = [], None
        while True:
            params = {"pageSize": 300, **({"pageToken": page} if page else {})}
            r = self.s.get(f"{self.base}/pushTokens", params=params, timeout=30)
            r.raise_for_status()
            j = r.json()
            for d in j.get("documents", []):
                f = d.get("fields", {})
                tok = f.get("token", {}).get("stringValue")
                if tok:
                    out.append((d["name"], tok, f.get("lang", {}).get("stringValue", "en")))
            page = j.get("nextPageToken")
            if not page:
                return out

    def delete(self, name):
        self.s.delete(f"{FIRESTORE}/{name}", timeout=30)

    def last_push(self):
        r = self.s.get(f"{self.base}/meta/lastPush", timeout=30)
        if r.status_code == 404:
            return ""
        r.raise_for_status()
        return r.json().get("fields", {}).get("date", {}).get("stringValue", "")

    def set_last_push(self, date, sent, failed):
        now = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        fields = {"date": {"stringValue": date}, "sent": {"integerValue": str(sent)},
                  "failed": {"integerValue": str(failed)}, "at": {"timestampValue": now}}
        r = self.s.patch(f"{self.base}/meta/lastPush", json={"fields": fields}, timeout=30)
        r.raise_for_status()


def send(sess, project, token, data):
    """Returns 'ok', 'gone' (phone turned it off or token expired) or an error label."""
    body = {"message": {"token": token, "data": data,
                        "webpush": {"headers": {"TTL": "43200", "Urgency": "high"}}}}   # drop after 12 h
    for attempt in range(3):
        r = sess.post(f"{FCM}/projects/{project}/messages:send", json=body, timeout=30)
        if r.status_code not in (429, 500, 502, 503, 504):
            break
        time.sleep(2 * (attempt + 1))
    if r.ok:
        return "ok"
    try:
        err = r.json().get("error", {})
    except ValueError:
        err = {}
    codes = {err.get("status") or ""} | {d.get("errorCode") or "" for d in err.get("details", []) if isinstance(d, dict)}
    if r.status_code == 404 or "UNREGISTERED" in codes or \
            (r.status_code == 400 and "registration token" in (err.get("message") or "").lower()):
        return "gone"
    return f"HTTP {r.status_code} {' '.join(sorted(c for c in codes if c))}".strip()


def main():
    mode = (os.environ.get("MODE") or "brief").strip().lower()
    raw = (os.environ.get("FIREBASE_SERVICE_ACCOUNT") or "").strip()
    if not raw:
        note("The FIREBASE_SERVICE_ACCOUNT secret isn't set up yet, so no notification was sent.")
        return 0
    try:
        info = json.loads(raw)
        project = info["project_id"]
    except (ValueError, KeyError, TypeError):
        note("FIREBASE_SERVICE_ACCOUNT isn't a complete service-account file. Paste the whole .json file's contents.")
        return 1

    b = newest_brief()
    if not b:
        note("No briefings in data/briefings.json; nothing sent.")
        return 0
    date = b["date"]
    today = dt.datetime.now(BEIRUT).date().isoformat()
    if mode == "brief" and date != today:
        note(f"The newest brief is {date}, not today's ({today}); nothing sent.")
        return 0

    sess = requests.Session()
    sess.headers["Authorization"] = f"Bearer {access_token(info)}"
    store = Store(sess, project)
    if mode == "brief" and store.last_push() == date:
        note(f"The {date} brief was already sent; nothing sent again.")
        return 0

    tokens = store.tokens()
    msgs = {}
    sent = gone = 0
    errors = {}
    for name, tok, lang in tokens:
        data = msgs.setdefault(lang, message(b, lang))
        res = send(sess, project, tok, data)
        if res == "ok":
            sent += 1
        elif res == "gone":
            gone += 1
            store.delete(name)
        else:
            errors[res] = errors.get(res, 0) + 1
    failed = sum(errors.values())
    label = "Test of the" if mode == "test" else "The"
    note(f"{label} {date} brief: sent to {sent} of {len(tokens)} phones; removed {gone} no longer reachable; "
         f"{failed} failed{' (' + ', '.join(f'{k} ×{v}' for k, v in errors.items()) + ')' if errors else ''}.")
    if mode == "brief" and (sent or not failed):
        store.set_last_push(date, sent, failed)
    return 1 if failed and not sent else 0


if __name__ == "__main__":
    sys.exit(main())
