/* Ripple Brief service worker: newest page when online, saved copy offline; data network-first; morning notification. */
const VERSION = "rb-2026-10-13-3";
const SHELL = ["./", "./index.html", "./rb-pwa.js", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon-48.png", "./icons/badge-96.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const FRESH = /\/$|\.(html|js|webmanifest)$/;
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url), same = url.origin === location.origin;
  const put = (key, res) => { if (res && (res.ok || res.type === "opaque")) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(key, copy)); } return res; };
  if (same && url.pathname.includes("/data/")) {           // fresh briefings first, cached copy offline
    e.respondWith(fetch(req).then(r => put(req, r)).catch(() => caches.match(req)));
  } else if (same && (req.mode === "navigate" || FRESH.test(url.pathname))) {
    // the page and its script: newest version when online (saved copy if the network takes over 4 s), saved copy offline
    const key = url.origin + url.pathname;                  // one saved copy per page, whatever its ?query
    const saved = () => caches.match(key, { ignoreSearch: true });
    const net = fetch(key, { cache: "no-cache", credentials: "same-origin" }).then(r => put(key, r));
    e.respondWith(new Promise(done => {
      let over = false; const finish = r => { if (!over && r) { over = true; done(r); } };
      net.then(r => r.ok ? finish(r) : saved().then(s => finish(s || r)), () => saved().then(r => finish(r || Response.error())));
      setTimeout(() => saved().then(finish), 4000);
    }));
  } else if (same || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname) || /(^|\.)(thumb|upload)\.wikimedia\.org$/.test(url.hostname)) {
    // icons, fonts and article photos: saved copy first, refreshed in the background
    e.respondWith(caches.match(req).then(hit => { const net = fetch(req).then(r => put(req, r)).catch(() => hit); return hit || net; }));
  }
});

/* Morning notification, sent once a day by tools/send_push.py through Firebase Cloud Messaging.
   The message carries only data: title, body, lang, url, tag and the two button labels (a1, a2). */
self.addEventListener("push", e => {
  let d = {};
  try { const p = e.data ? e.data.json() : {}; d = Object.assign({}, p.notification || {}, p.data || {}); }
  catch (_) { d = { body: e.data ? e.data.text() : "" }; }
  const opts = {
    body: d.body || "", lang: d.lang || "en", dir: d.lang === "ar" ? "rtl" : "ltr",
    icon: "icons/icon-192.png", badge: "icons/badge-96.png",
    tag: d.tag || "rb-morning",                 // today's brief replaces yesterday's if it is still showing
    data: { url: d.url || "./?open=quick" }
  };
  if (d.a1 && d.a2) opts.actions = [{ action: "quick", title: d.a1 }, { action: "listen", title: d.a2 }];
  e.waitUntil(self.registration.showNotification(d.title || "Ripple Brief", opts));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const go = e.action === "listen" ? "./?open=listen" : (e.notification.data && e.notification.data.url) || "./?open=quick";
  const url = new URL(go, self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(ws => {
    const w = ws.find(c => c.url.startsWith(self.registration.scope) && "focus" in c);
    if (!w) return self.clients.openWindow(url);
    return w.focus().then(c => (c || w).navigate(url)).catch(() => {});
  }));
});
