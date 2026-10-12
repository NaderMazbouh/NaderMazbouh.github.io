"""Build the installable Ripple Brief site from the claude.ai artifact page.
Usage: python3 tools/build_pwa.py <artifact index.html> <db export dir> <site dir>
The db export dir holds one folder per collection with <doc id>.json files (ArtifactData out_dir format)."""
import sys, os, json, glob
src, dbdir, site = sys.argv[1:4]
html = open(src, encoding="utf-8").read()
def rep(a, b):
    global html
    assert html.count(a) == 1, a[:70]; html = html.replace(a, b)
head = ('<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#1f6a4a">'
        '<link rel="icon" href="icons/favicon-48.png" sizes="48x48"><link rel="apple-touch-icon" href="icons/apple-touch-icon.png">'
        '<meta name="description" content="Daily world politics, world economy and Lebanon economy briefing.">'
        '<script src="rb-pwa.js"></script>')
rep("<head><meta charset=utf8>", "<head><meta charset=utf8>" + head)
rep('const APP_URL = "https://claude.ai/artifact/Mw3RZPZwJjGuSXqA97X7dU";', 'const APP_URL = location.href.split(/[?#]/)[0];')
html = html.replace('shareNote:"People you send this to need access to the app to open the link."', 'shareNote:"Anyone can open the link."')
html = html.replace('shareNote:"يحتاج من ترسل إليه إلى صلاحية الوصول إلى التطبيق لفتح الرابط."', 'shareNote:"يمكن لأي شخص فتح الرابط."')
html = html.replace('shareNote:"Vos destinataires doivent avoir accès à l\'application pour ouvrir le lien."', 'shareNote:"Tout le monde peut ouvrir le lien."')
open(os.path.join(site, "index.html"), "w", encoding="utf-8").write(html)
def export(coll, keep=None, drop=()):
    out = {}
    for f in sorted(glob.glob(os.path.join(dbdir, coll, "*.json"))):
        d = json.load(open(f, encoding="utf-8")); d = d.get("data", d)
        doc_id = os.path.basename(f)[:-5]
        if keep and doc_id not in keep: continue
        for k in drop: d.pop(k, None)
        out[doc_id] = d
    os.makedirs(os.path.join(site, "data"), exist_ok=True)
    json.dump(out, open(os.path.join(site, "data", coll + ".json"), "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))
    return len(out)
print("briefings", export("briefings"))
print("series", export("series"))
print("forecasts", export("forecasts"))
print("meta", export("meta", keep={"fx"}))
print("alerts", export("alerts"))
