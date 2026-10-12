/* Ripple Brief — installable-app data layer.
   Replaces the claude.ai runtime with read-only JSON files in ./data/ (published each morning).
   Personal data (wallet, alerts, settings) stays in this browser only. */
(()=>{
  const BASE = new URL("./", location.href);
  const memo = {};
  const load = name => memo[name] || (memo[name] = fetch(new URL("data/"+name+".json", BASE), {cache:"no-cache"})
    .then(r => r.ok ? r.json() : {}).catch(() => ({})));
  const snapC = o => ({docs: Object.keys(o).map(id => ({id, data: () => o[id]}))});
  const snapD = d => ({exists: d != null, data: () => d, metadata: {}});
  function collection(name){
    let ord=null, lim=null;
    const q = {
      orderBy(f, dir){ ord=[f, dir]; return q; },
      limit(n){ lim=n; return q; },
      onSnapshot(cb, err){
        load(name).then(o => {
          let ids = Object.keys(o);
          if (ord) ids.sort((a,b) => { const x=o[a][ord[0]], y=o[b][ord[0]]; return (x<y?-1:x>y?1:0) * (ord[1]==="desc"?-1:1); });
          if (lim) ids = ids.slice(0, lim);
          const m = {}; ids.forEach(i => m[i]=o[i]); cb(snapC(m));
        }).catch(e => err && err(e));
        return () => {};
      }
    };
    return q;
  }
  function doc(path){
    const i = path.lastIndexOf("/"), c = path.slice(0,i), id = path.slice(i+1);
    return {
      onSnapshot(cb){ load(c).then(o => cb(snapD(o[id] ?? null))); return () => {}; },
      async get(){ const o = await load(c); return snapD(o[id] ?? null); },
      async set(){}, async update(){}, async delete(){}
    };
  }
  window.claude = { use: async n => n === "db" ? {collection, doc} : null };

  /* offline support */
  if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

  /* back after 30+ minutes (e.g. the app left open since yesterday): reload for today's brief and the newest version */
  let hiddenAt = 0;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { hiddenAt = Date.now(); return; }
    if (hiddenAt && Date.now() - hiddenAt > 30 * 60 * 1000 && navigator.onLine !== false) location.reload();
  });

  /* "Install app" button when the browser allows it */
  let deferred = null;
  addEventListener("beforeinstallprompt", e => {
    e.preventDefault(); deferred = e;
    if (document.getElementById("rbInstall")) return;
    const b = document.createElement("button");
    b.id = "rbInstall"; b.type = "button";
    const L = (document.documentElement.lang || "en");
    b.textContent = L === "ar" ? "تثبيت التطبيق" : L === "fr" ? "Installer l'app" : "Install app";
    b.style.cssText = "position:fixed;inset-inline-end:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:80;border-radius:999px;padding:10px 16px;box-shadow:0 6px 20px rgba(0,0,0,.2)";
    b.onclick = async () => { b.remove(); if (deferred){ deferred.prompt(); try{ await deferred.userChoice; }catch(_){} deferred = null; } };
    document.body.appendChild(b);
  });
  addEventListener("appinstalled", () => { const b=document.getElementById("rbInstall"); if (b) b.remove(); });
})();
