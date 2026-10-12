  /* ---------- v1.0 redesign: hero, day in prices, top articles, reading comfort, tabs ---------- */
  const RD = {
    en:{ prices:"Your day in prices", pk:{usdlbp:"Dollar in lira", gas95:"Gasoline, 20 L", bread:"Bread bundle", gen_kwh:"Generator kWh"},
      tk:{usdlbp:"Dollar", gas95:"Gasoline 95", diesel:"Diesel", bread:"Bread", gascyl:"Gas cylinder", gen_kwh:"Generator kWh", brent:"Brent", gold:"Gold"},
      up:x=>`up ${x}`, down:x=>`down ${x}`, steady:"steady", since:d=>`since ${d}`, lbp:"LBP",
      arts:"Top articles today", artsSub:"From the news outlets cited in this brief. Changes every morning.", inEn:"In English", filePhoto:"File photo", sat:"Satellite image",
      tracked:n=>`${n} events tracked`, rising:n=>`${n} rising since yesterday`, topEv:"Top event today", st:{escalating:"rising since yesterday", new:"new today", easing:"easing since yesterday", ongoing:"no change since yesterday"},
      tabs:["Today","Prices","Wallet","Stories"], aa:"Text size and reading comfort", comfort:"Reading comfort", saved:"Saved on this phone",
      size:"Text size", sizes:{s:"Small", m:"Medium", l:"Large", xl:"Extra large"}, spacing:"Line spacing", compact:"Compact", relaxed:"Relaxed",
      look:"Look", light:"Light", night:"Night", auto:"Auto", autoNote:"Auto follows your phone's light or dark setting.",
      motion:"Moving effects", motionNote:"Turn off for a still screen. Your phone's reduce-motion setting turns them off too.", on:"On", off:"Off",
      offline:t=>`No connection. Showing the briefing saved on your phone${t?`, last updated ${t}`:""}.`, beirut:"Beirut", map:"Live map of today's events and how they reach Beirut" },
    ar:{ prices:"أسعار يومك", pk:{usdlbp:"الدولار بالليرة", gas95:"بنزين 95، 20 ليتراً", bread:"ربطة الخبز", gen_kwh:"كيلوواط المولّد"},
      tk:{usdlbp:"الدولار", gas95:"بنزين 95", diesel:"مازوت", bread:"ربطة الخبز", gascyl:"قارورة الغاز", gen_kwh:"كيلوواط المولّد", brent:"برنت", gold:"الذهب"},
      up:x=>`ارتفع \u2066${x}\u2069`, down:x=>`انخفض \u2066${x}\u2069`, steady:"مستقر", since:d=>`منذ ${d}`, lbp:"ل.ل.",
      arts:"أبرز المقالات اليوم", artsSub:"من وسائل الإعلام التي يستند إليها موجز اليوم، وتتجدّد كل صباح.", inEn:"بالإنجليزية", filePhoto:"صورة أرشيفية", sat:"صورة فضائية",
      tracked:n=>`نتابع ${n} أحداث`, rising:n=>`${n} منها في تصاعد منذ أمس`, topEv:"أبرز حدث اليوم", st:{escalating:"في تصاعد منذ أمس", new:"جديد اليوم", easing:"تهدئة منذ أمس", ongoing:"دون تغيير منذ أمس"},
      tabs:["اليوم","الأسعار","محفظتي","القصص"], aa:"حجم النص وراحة القراءة", comfort:"راحة القراءة", saved:"محفوظ على هذا الهاتف",
      size:"حجم النص", sizes:{s:"صغير", m:"وسط", l:"كبير", xl:"كبير جداً"}, spacing:"تباعد الأسطر", compact:"متقارب", relaxed:"مريح",
      look:"المظهر", light:"فاتح", night:"ليلي", auto:"تلقائي", autoNote:"يتبع الوضع التلقائي إعداد الفاتح أو الداكن في هاتفك.",
      motion:"المؤثرات المتحركة", motionNote:"أوقفها لشاشة ثابتة. يوقفها أيضاً إعداد تقليل الحركة في هاتفك.", on:"تشغيل", off:"إيقاف",
      offline:t=>`لا يوجد اتصال. نعرض الموجز المحفوظ على هاتفك${t?`، آخر تحديث ${t}`:""}.`, beirut:"بيروت", map:"خريطة حيّة لأحداث اليوم وكيف يصل أثرها إلى بيروت" },
    fr:{ prices:"Votre journée en prix", pk:{usdlbp:"Dollar en livres", gas95:"Essence, 20 L", bread:"Paquet de pain", gen_kwh:"kWh du générateur"},
      tk:{usdlbp:"Dollar", gas95:"Essence 95", diesel:"Diesel", bread:"Pain", gascyl:"Bouteille de gaz", gen_kwh:"kWh générateur", brent:"Brent", gold:"Or"},
      up:x=>`en hausse de ${x}`, down:x=>`en baisse de ${x}`, steady:"stable", since:d=>`depuis le ${d}`, lbp:"LL",
      arts:"Articles clés du jour", artsSub:"Des médias cités dans ce briefing. Mis à jour chaque matin.", inEn:"En anglais", filePhoto:"Photo d'archive", sat:"Image satellite",
      tracked:n=>`${n} événements suivis`, rising:n=>`${n} en hausse depuis hier`, topEv:"Événement principal du jour", st:{escalating:"en hausse depuis hier", new:"nouveau aujourd'hui", easing:"en baisse depuis hier", ongoing:"inchangé depuis hier"},
      tabs:["Aujourd'hui","Prix","Portefeuille","Sujets"], aa:"Taille du texte et confort de lecture", comfort:"Confort de lecture", saved:"Enregistré sur ce téléphone",
      size:"Taille du texte", sizes:{s:"Petit", m:"Moyen", l:"Grand", xl:"Très grand"}, spacing:"Interlignage", compact:"Serré", relaxed:"Aéré",
      look:"Apparence", light:"Clair", night:"Nuit", auto:"Auto", autoNote:"Auto suit le réglage clair ou sombre de votre téléphone.",
      motion:"Effets animés", motionNote:"Désactivez-les pour un écran fixe. Le réglage « réduire les animations » du téléphone les coupe aussi.", on:"Activés", off:"Désactivés",
      offline:t=>`Pas de connexion. Voici le briefing enregistré sur votre téléphone${t?`, mis à jour ${t}`:""}.`, beirut:"Beyrouth", map:"Carte en direct des événements du jour et de leur effet sur Beyrouth" }
  };
  const RT = () => RD[curLang()] || RD.en;
  ZOOM.xl = 1.25;
  const HOST_THEME = document.documentElement.getAttribute("data-theme");
  const motionOK = () => prefs.motion!=="off" && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  function applyComfort(){
    const r=document.documentElement;
    r.classList.toggle("rb-compact", prefs.spacing==="compact");
    r.classList.toggle("rb-still", prefs.motion==="off");
    if (prefs.look==="light") r.setAttribute("data-theme","light");
    else if (prefs.look==="night") r.setAttribute("data-theme","dark");
    else if (prefs.look==="auto" && r.dataset.rbSet){ if (HOST_THEME) r.setAttribute("data-theme",HOST_THEME); else r.removeAttribute("data-theme"); }
    if (prefs.look==="light"||prefs.look==="night") r.dataset.rbSet="1"; else delete r.dataset.rbSet;
  }
  const scoreTier = s => s>=75 ? "hi" : s>=50 ? "" : "lo";
  const scoreHex = s => s>=75 ? "#E2574C" : s>=50 ? "#F2A541" : "#7FC8C4";

  /* indicators: number, change in plain words */
  const rawIndOf = (raw, key) => (raw.indicators||[]).find(x=>x&&x.key===key);
  const numOf = i => { const n=Number(i&&i.num); if (isFinite(n) && i.num!=="" && i.num!=null) return n; const m=String((i&&i.value)||"").replace(/,/g,"").match(/-?\d+(\.\d+)?/); return m?Number(m[0]):NaN; };
  function chgOf(ri, date){
    const tx=RT(); const c=String((ri&&ri.change)||"");
    if (ri && ri.asOfDate && date && (new Date(date+"T12:00:00")-new Date(ri.asOfDate+"T12:00:00"))/864e5 > 14) return {txt:tx.since(fmtDate(ri.asOfDate,{day:"numeric",month:"short"})), cls:"", arrow:""};
    if (/^(stable|unchanged|steady|flat)/i.test(c)) return {txt:tx.steady, cls:"", arrow:""};
    const pct=c.match(/\(([+−-]\s?[\d.,]+%)\)/), first=c.match(/^([+−-])\s?([\d.,]+%?)/);
    const s = pct ? pct[1] : first ? first[0] : "";
    if (!s) return {txt:"", cls:"", arrow:""};
    const up=/^\+/.test(s), mag=s.replace(/^[+−-]\s?/,"");
    return {txt: up?tx.up(mag):tx.down(mag), cls: up?"up":"down", arrow:(up?"▲ ":"▼ ")+mag};
  }
  const LBPK = new Set(["usdlbp","gas95","diesel","gascyl","bread","gen_kwh"]);
  const showVal = (ri, key) => LBPK.has(key) && isFinite(numOf(ri)) ? numOf(ri).toLocaleString("en-US") : String(ri.value||"");

  function tickerHtml(raw){
    const tx=RT();
    const it = ["usdlbp","gas95","diesel","bread","gascyl","gen_kwh","brent","gold"].map(k=>{ const ri=rawIndOf(raw,k); if(!ri||!ri.value) return ""; const ch=chgOf(ri, raw.date);
      return `<span class="tick-it"><span>${esc(tx.tk[k])}</span><b><bdi>${esc(showVal(ri,k))}${k==="usdlbp"?" "+esc(tx.lbp):""}</bdi></b>${ch.arrow?`<span class="${ch.cls}"><bdi>${esc(ch.arrow)}</bdi></span>`:ch.txt&&!ch.txt.includes(" ")?`<span>${esc(ch.txt)}</span>`:""}</span><span class="tick-dot" aria-hidden="true"></span>`; }).join("");
    if (!it) return "";
    return `<div class="tick" aria-hidden="true"><div class="tick-in">${it}${it}</div></div>`;
  }

  /* hero map: today's events placed on a stylised regional map, effects flowing to Beirut */
  const MX = lon => (lon-28)/34*390, MY = lat => (38-lat)/18*222;
  function heroMap(pol){
    const tx=RT(), mv=motionOK(), rtl=curLang()==="ar";
    const pts = pol.filter(p=>isFinite(Number(p.lon))&&isFinite(Number(p.lat))).map(p=>({p, x:MX(Number(p.lon)), y:MY(Number(p.lat))})).filter(q=>q.x>=6&&q.x<=384&&q.y>=6&&q.y<=216);
    const bx=MX(35.5), by=MY(33.89);
    const waves=[26,62,98,134,170,206].map((y,i)=>`<path d="M0 ${y} C${60+i*5} ${y-8} ${120+i*5} ${y+8} ${180+i*5} ${y} S${300} ${y-8} 390 ${y+2}" fill="none" stroke="#1D5878" stroke-width="1.2"/>`).join("");
    const top = pts[0] && pts[0].p===pol[0] ? pts[0] : null;
    const A = (a, v, d, extra="") => mv ? `<animate attributeName="${a}" values="${v}" dur="${d}" repeatCount="indefinite"${extra}/>` : "";
    let fx="";
    if (top){
      const c=scoreHex(top.p._s);
      fx = `<g transform="translate(${top.x.toFixed(1)} ${top.y.toFixed(1)}) scale(1 0.58)">${[36,72,108,144].map((r,i)=>`<circle r="${r}" fill="none" stroke="#5FA9B5" stroke-width="1.2" opacity="${[.55,.4,.28,.18][i]}" vector-effect="non-scaling-stroke"/>`).join("")}
        ${mv?`<path d="M0 0 L0 -144 A144 144 0 0 1 101.8 -101.8 Z" fill="#F2A541" opacity="0.14"><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite"/></path>
        <circle r="10" fill="none" stroke="#9BD6CF" stroke-width="2.2" vector-effect="non-scaling-stroke">${A("r","10;168","3.4s")}${A("opacity","0.95;0","3.4s")}</circle>
        <circle r="10" fill="none" stroke="#9BD6CF" stroke-width="2.2" vector-effect="non-scaling-stroke" opacity="0">${A("r","10;168","3.4s",' begin="1.7s"')}${A("opacity","0.95;0","3.4s",' begin="1.7s"')}</circle>`:""}</g>
        <path d="M${top.x.toFixed(1)} ${top.y.toFixed(1)} Q${((top.x+bx)/2-20).toFixed(1)} ${((top.y+by)/2-30).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="#9BD6CF" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 7" opacity="0.85">${A("stroke-dashoffset","0;-18","0.9s")}</path>`;
      void c;
    }
    const boxes=[[bx-6, by-24, 70, 20]];
    const hit = r => boxes.some(o=>r[0]<o[0]+o[2] && r[0]+r[2]>o[0] && r[1]<o[1]+o[3] && r[1]+r[3]>o[1]);
    const lbl = (q) => { const name=String(q.p.region||q.p.title||"").split("/")[0].trim().slice(0,22)+" "+q.p._s; const w=name.length*6.6+4;
      const cands=[[q.x+10,q.y-6],[q.x+10,q.y+16],[q.x-10-w,q.y-6],[q.x-10-w,q.y+16],[q.x-w/2,q.y-14],[q.x-w/2,q.y+24]];
      let c=cands.find(([x,y])=>x>=2&&x+w<=388&&y>=12&&y<=218&&!hit([x,y-12,w,15])); if(!c) return ""; boxes.push([c[0],c[1]-12,w,15]);
      return `<text x="${c[0].toFixed(1)}" y="${c[1].toFixed(1)}" fill="#FFE2A8" font-size="12" font-weight="600"${rtl?` direction="rtl" text-anchor="end"`:""}>${esc(name)}</text>`; };
    const dots = pts.slice(0,6).map((q,i)=>{ const c=scoreHex(q.p._s), r=q===top?7:(q.p._s>=50?5:4);
      return `<circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="${r+3}" fill="${c}" opacity="0.35">${q.p._s>=50?A("r",`${r};${r*2.6}`,`${(1.8+i*.3).toFixed(1)}s`)+A("opacity","0.5;0",`${(1.8+i*.3).toFixed(1)}s`):""}</circle><circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="${r}" fill="${c}"/>${i<4?lbl(q):""}`; }).join("");
    const beirut = `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="10" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6"/><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="5" fill="#fff"/><text x="${(bx-2).toFixed(1)}" y="${(by-12).toFixed(1)}" fill="#fff" font-size="12.5" font-weight="700"${rtl?' direction="rtl" text-anchor="end"':""}>${esc(tx.beirut)}</text>`;
    return `<svg class="hmap" viewBox="0 0 390 222" role="img" aria-label="${esc(tx.map)}" style="font-family:var(--f-body)">${waves}${fx}${dots}${beirut}</svg>`;
  }

  function heroHtml(b, raw, pol){
    const tx=RT();
    const rising = (b.politics||[]).filter(p=>p.status==="escalating").length;
    const top = pol[0];
    const topRow = top ? `<a class="htop" href="#ev${top._i}" data-pick="${top._i}"><span class="rbadge ${scoreTier(top._s)} glow">${top._s}</span><span class="ht"><strong>${esc(top.title)}</strong><span class="hs">${esc(tx.topEv)}${top.status&&tx.st[top.status]?", "+esc(tx.st[top.status]):""}</span></span></a>` : "";
    return `<section class="hero" dir="${curLang()==="ar"?"rtl":"ltr"}">${tickerHtml(raw)}${heroMap(pol)}
      <div class="hchips"><span class="hchip">${esc(tx.tracked((b.politics||[]).length))}</span>${rising?`<span class="hchip r">${esc(tx.rising(rising))}</span>`:""}</div>${topRow}</section>`;
  }

  /* your day in prices */
  const PICONS = {
    usdlbp:`<svg width="40" height="40" viewBox="0 0 46 46" aria-hidden="true"><rect x="7" y="14" width="32" height="19" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="23" cy="23.5" r="5" fill="#F2A541"/><path d="M12 18.5h2M32 28.5h2" stroke="#1F8A8A" stroke-width="2.2" stroke-linecap="round"/><path d="M9 38c4-2 8-2 12 0s8 2 12 0" fill="none" stroke="#7FC8C4" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    gas95:`<svg width="40" height="40" viewBox="0 0 46 46" aria-hidden="true"><rect x="10" y="9" width="17" height="27" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="13.5" y="13" width="10" height="7" rx="1.5" fill="#F2A541"/><path d="M27 17h3.5l4.5 4.5v10a2.3 2.3 0 0 1-4.6 0V26H27" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 38c4-2 8-2 12 0s8 2 12 0" fill="none" stroke="#7FC8C4" stroke-width="1.8" stroke-linecap="round"/></svg>`,
    bread:`<svg width="40" height="40" viewBox="0 0 46 46" aria-hidden="true"><ellipse cx="23" cy="30" rx="15" ry="5.5" fill="#FBEBD0" stroke="currentColor" stroke-width="2"/><ellipse cx="23" cy="24.5" rx="15" ry="5.5" fill="#FBEBD0" stroke="currentColor" stroke-width="2"/><ellipse cx="23" cy="19" rx="15" ry="5.5" fill="#FBEBD0" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="18" r="1.3" fill="#F2A541"/><circle cx="27" cy="20" r="1.3" fill="#F2A541"/><circle cx="23" cy="17" r="1.1" fill="#F2A541"/></svg>`,
    gen_kwh:`<svg width="40" height="40" viewBox="0 0 46 46" aria-hidden="true"><rect x="8" y="14" width="30" height="18" rx="3.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M25 16.5l-6 8h4.5L22 30l6.5-8.5H24z" fill="#F2A541"/><path d="M12 32v4M34 32v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M38 20h3M38 26h3" stroke="#1F8A8A" stroke-width="2" stroke-linecap="round"/></svg>`
  };
  function pricesHtml(raw){
    const tx=RT();
    const tiles = ["usdlbp","gas95","bread","gen_kwh"].map(k=>{ const ri=rawIndOf(raw,k); if(!ri) return ""; const ch=chgOf(ri, raw.date);
      return `<div class="dp"><span class="ic" style="color:var(--ink)">${PICONS[k]}</span><span class="k">${esc(tx.pk[k])}</span><span class="v"><bdi>${esc(showVal(ri,k))}</bdi></span><span class="c ${ch.cls}">${esc(ch.txt)}</span></div>`; }).join("");
    return tiles ? `<section class="dayp" id="secDay"><h2>${esc(tx.prices)}</h2><div class="dayp-g">${tiles}</div></section>` : "";
  }

  /* top articles: one card per top event, from a major outlet when the brief cites one */
  const MAJOR=/reuters|associated press|\bap\b|al jazeera|bloomberg|\bbbc\b|\bcnn\b|cnbc|axios|financial times|guardian|new york times|washington post|wall street journal|l'orient|anadolu|al arabiya|the national|al-monitor|france 24|\bafp\b|\bdw\b|naharnet|lbci|annahar|al bawaba|korea times|kyodo|nikkei/i;
  function pickArticle(rp){
    const list=(rp.more||[]).filter(m=>m&&safeUrl(m.url));
    const m = list.find(x=>MAJOR.test(x.source||"")) || list[0];
    if (m) return {src:m.source||"", title:m.title||"", url:m.url};
    return safeUrl(rp.url) ? {src:rp.source||"", title:rp.title||"", url:rp.url} : null;
  }
  const RMON={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Sept:8,Oct:9,Nov:10,Dec:11};
  function artDate(title, year){
    const m=String(title).match(/\(([A-Z][a-z]{2,4})\.? (\d{1,2})\)\s*$/); if (!m || !(m[1] in RMON)) return "";
    const d=new Date(Date.UTC(Number(year), RMON[m[1]], Number(m[2]))); return d.toISOString().slice(0,10);
  }
  const cleanTitle = s => String(s).replace(/\s*\([A-Z][a-z]{2,4}\.? \d{1,2}\)\s*$/,"").trim();
  const cleanSrc = s => String(s).replace(/\s*\(.*?\)\s*/g," ").replace(/\s+live updates$/i,"").trim();
  const TOPIC=[["leb",/lebanon|lebanese|beirut/i],["talk",/talk|deal|negotiat|ceasefire|truce|reply|response|proposal|summit|agree/i],["sea",/ship|tanker|vessel|shipping|maritime|seafarer|navy|hormuz/i],["air",/airport|air ?strike|flight|aviation|plane/i],["fuel",/oil|diesel|fuel|gasoline|refiner|energy|opec|brent|crude/i]];
  const topicOf = s => { for (const [k,re] of TOPIC) if (re.test(s)) return k; return "gen"; };
  const SCENE = {
    air:`<path d="M40 60 H330" stroke="#2F6B88" stroke-width="1"/><path d="M150 92 L218 92 L196 60 L172 60 Z" fill="#164B68"/><path d="M184 64 V90" stroke="#9BD6CF" stroke-width="1.6" stroke-dasharray="4 4"/><rect x="268" y="28" width="9" height="32" fill="#CFE6E4" opacity="0.9"/><rect x="262" y="20" width="21" height="9" rx="2" fill="#EEF6F5"/><circle cx="252" cy="58" r="11" fill="#F2A541" opacity="0.28"/><circle cx="252" cy="58" r="4" fill="#F2A541"/><g fill="#EEF6F5"><rect x="96" y="28" width="46" height="6" rx="3"/><path d="M114 31 L124 31 L113 45 L106 45 Z"/><path d="M114 31 L124 31 L116 22 L110 22 Z" opacity="0.75"/><path d="M97 31 L102 31 L97 21 L93 21 Z"/></g>`,
    sea:`<path d="M250 62 Q300 44 380 50 L380 92 L250 92 Z" fill="#164B68"/><path d="M96 60 L262 60 L250 76 L108 76 Z" fill="#CFE6E4"/><rect x="104" y="72" width="152" height="4" fill="#7FC8C4"/><rect x="226" y="40" width="24" height="20" rx="2" fill="#EEF6F5"/><rect x="236" y="32" width="7" height="9" fill="#F2A541"/><path d="M116 56 H220" stroke="#7FC8C4" stroke-width="2"/><path d="M0 80 C40 74 80 86 120 80 S200 74 240 80 S320 86 380 80" fill="none" stroke="#9BD6CF" stroke-width="1.6" opacity="0.7"/><path d="M0 88 C40 82 80 94 120 88 S200 82 240 88 S320 94 380 88" fill="none" stroke="#EEF6F5" stroke-width="1.2" opacity="0.4"/>`,
    leb:`<circle cx="276" cy="24" r="9" fill="#F2A541" opacity="0.85"/><path d="M0 66 Q80 42 170 58 T380 50 L380 92 L0 92 Z" fill="#1F6B73"/><path d="M0 80 Q110 60 220 74 T380 70 L380 92 L0 92 Z" fill="#2A8A86"/><path d="M150 74 V62" stroke="#0E3A53" stroke-width="2.5"/><circle cx="150" cy="56" r="9" fill="#9BD6CF"/><path d="M186 72 V58" stroke="#0E3A53" stroke-width="2.5"/><circle cx="186" cy="52" r="11" fill="#7FC8C4"/><path d="M222 74 V63" stroke="#0E3A53" stroke-width="2.5"/><circle cx="222" cy="57" r="8" fill="#9BD6CF"/><g fill="#EEF6F5"><rect x="104" y="62" width="18" height="12"/><path d="M101 63 L113 54 L125 63 Z"/></g>`,
    talk:`<g fill="none" stroke="#EEF6F5" stroke-width="2" stroke-linejoin="round"><rect x="112" y="40" width="44" height="30" rx="3"/><path d="M112 42 L134 58 L156 42"/><rect x="214" y="30" width="44" height="30" rx="3"/><path d="M214 32 L236 48 L258 32"/></g><path d="M160 44 Q186 14 210 34" fill="none" stroke="#9BD6CF" stroke-width="1.6" stroke-dasharray="3 5"/><path d="M212 62 Q186 84 160 68" fill="none" stroke="#F2A541" stroke-width="1.6" stroke-dasharray="3 5"/>`,
    fuel:`<path d="M0 78 H380" stroke="#2F6B88" stroke-width="2"/><rect x="120" y="44" width="92" height="26" rx="13" fill="#CFE6E4"/><rect x="120" y="54" width="92" height="5" fill="#F2A541"/><path d="M216 50 H238 L250 62 V72 H216 Z" fill="#EEF6F5"/><rect x="224" y="54" width="14" height="8" rx="1.5" fill="#1F6F86"/><rect x="116" y="68" width="136" height="5" fill="#7FC8C4"/><g fill="#0E3A53" stroke="#CFE6E4" stroke-width="2"><circle cx="140" cy="76" r="6"/><circle cx="196" cy="76" r="6"/><circle cx="238" cy="76" r="6"/></g>`,
    gen:`<g fill="none" stroke="#9BD6CF"><circle cx="190" cy="50" r="12" opacity=".8"/><circle cx="190" cy="50" r="26" opacity=".5"/><circle cx="190" cy="50" r="42" opacity=".3"/></g><circle cx="190" cy="50" r="5" fill="#F2A541"/>`
  };
  const RINGS = `<svg viewBox="0 0 520 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#5FA9B5" stroke-width="1"><circle cx="90" cy="20" r="18" opacity="0.28"/><circle cx="90" cy="20" r="34" opacity="0.15"/><circle cx="300" cy="14" r="22" opacity="0.24"/><circle cx="300" cy="14" r="42" opacity="0.12"/><circle cx="460" cy="26" r="16" opacity="0.26"/><circle cx="460" cy="26" r="30" opacity="0.14"/></g></svg>`;

  /* photos: approved library first, then a careful Wikimedia search; website only (the Claude version can't load outside pictures) */
  const PHOTO_OK = /(^|\.)github\.io$/.test(location.hostname);
  const PLIB = [
    {t:"leb", re:/lebanon/i, file:"Olive field in Bterram.jpg", kind:"file"},
    {t:"sea", re:/./, file:"A Whale.jpg", kind:"file"},
    {t:"air", re:/riyadh|saudi/i, file:"Riyadh 1749852957748.jpg", kind:"file"},
    {t:"talk", re:/iran|hormuz/i, file:"Strait of Hormuz (MODIS 2020-12-04).jpg", kind:"sat"},
    {t:"fuel", re:/./, file:"MiRO2c.jpg", kind:"file"}
  ];
  const PBAD=/dead|body|bodies|corpse|blood|wound|injur|killed|victim|funeral|massacre|explos|destroy|ruin|rubble|attack|war\b|soldier|weapon|missile|militant|terror|riot|protest|portrait|logo|map of|chart|graph|diagram|flag/i;
  const photoMem = {};
  try{ Object.assign(photoMem, JSON.parse(localStorage.getItem("rb-photos")||"{}")); }catch(e){}
  const savePhotos = () => { try{ const k=Object.keys(photoMem); if (k.length>80) k.slice(0,k.length-80).forEach(x=>delete photoMem[x]); localStorage.setItem("rb-photos", JSON.stringify(photoMem)); }catch(e){} };
  const stripHtml = s => String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const photoKey = a => a.lib ? "lib:"+a.lib.file : "q:"+a.q;
  async function fetchPhoto(a){
    const key=photoKey(a); if (photoMem[key] && (Date.now()-photoMem[key].at) < 7*864e5) return photoMem[key];
    const base="https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=800&iiextmetadatafilter=LicenseShortName|Artist|ImageDescription";
    let page=null;
    if (a.lib){ const j=await fetch(base+"&titles="+encodeURIComponent("File:"+a.lib.file)).then(r=>r.json()); page=Object.values((j.query&&j.query.pages)||{})[0]; }
    else {
      const j=await fetch(base+"&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch="+encodeURIComponent(a.q+" filetype:bitmap")).then(r=>r.json());
      page=Object.values((j.query&&j.query.pages)||{}).sort((x,y)=>x.index-y.index).find(p=>{ const ii=(p.imageinfo||[])[0]; if(!ii||!ii.thumburl) return false; const m=ii.extmetadata||{}; const txt=p.title+" "+stripHtml(m.ImageDescription&&m.ImageDescription.value);
        return ii.width>=ii.height*1.25 && ii.width>=800 && !PBAD.test(txt) && (m.LicenseShortName&&m.LicenseShortName.value); });
    }
    const ii=page&&(page.imageinfo||[])[0]; if (!ii||!ii.thumburl) { photoMem[key]={at:Date.now(), none:true}; savePhotos(); return photoMem[key]; }
    const m=ii.extmetadata||{};
    const by=stripHtml(m.Artist&&m.Artist.value).replace(/^(U\.S\.|US) (Coast Guard|Navy) photo by .*/i,"US $2").slice(0,40);
    photoMem[key]={at:Date.now(), src:ii.thumburl, page:ii.descriptionurl, by, lic:stripHtml(m.LicenseShortName&&m.LicenseShortName.value), kind:a.lib?a.lib.kind:"file"};
    savePhotos(); return photoMem[key];
  }
  const credit = ph => `${ph.kind==="sat"?RT().sat:RT().filePhoto} · ${ph.by?ph.by+", ":""}${ph.lic}`;
  const photoLayer = ph => `<img src="${esc(ph.src)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`;

  let artList = [];
  function artsHtml(b, raw, pol){
    const tx=RT(), en=curLang()==="en", year=String(raw.date||"").slice(0,4)||String(new Date().getFullYear());
    artList = pol.slice(0,5).map(p=>{ const rp=(raw.politics||[])[p._i]||p; const a=pickArticle(rp); if(!a) return null;
      const all=[rp.title, a.title, rp.region].join(" "), t=topicOf(all);
      const lib=PLIB.find(x=>x.t===t && x.re.test(all));
      const q=lib?"":[String(rp.region||"").split("/")[0], {air:"airport",sea:"tanker ship",leb:"Lebanon landscape",talk:"city skyline",fuel:"oil refinery",gen:"landscape"}[t]].join(" ").trim();
      return {p, a, t, lib, q, date:artDate(a.title, year)||raw.date}; }).filter(Boolean);
    if (!artList.length) return "";
    const cards = artList.map((x,i)=>{ const ph=PHOTO_OK && photoMem[photoKey(x)] && !photoMem[photoKey(x)].none ? photoMem[photoKey(x)] : null;
      return `<a class="acard" href="${esc(safeUrl(x.a.url))}" target="_blank" rel="noopener" data-art="${i}"><span class="im"><span class="bk">${ph?photoLayer(ph):RINGS}</span>${ph?"":`<span class="mid"><svg viewBox="0 0 380 92" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${SCENE[x.t]}</svg></span>`}${ph?`<span class="shade"></span><span class="cr" title="${esc(credit(ph))}">${esc(credit(ph))}</span>`:""}<span class="rbadge ${scoreTier(x.p._s)}">${x.p._s}</span>${en?"":`<span class="lng">${esc(tx.inEn)}</span>`}</span>
        <span class="tx"><span class="so"><b>${esc(cleanSrc(x.a.src))}</b><span>${esc(fmtDate(x.date,{day:"numeric",month:"short"}))}</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></span><span class="hl">${esc(en?cleanTitle(x.a.title):x.p.title)}</span></span></a>`; }).join("");
    return `<section class="arts" id="secArts"><h2>${esc(tx.arts)}</h2><p class="sub">${esc(tx.artsSub)}</p><div class="arts-track">${cards}</div><div class="arts-dots" aria-hidden="true">${artList.map((_,i)=>`<span${i?"":` class="on"`}></span>`).join("")}</div></section>`;
  }

  /* parallax: layers inside each card move slower than the card as the strip scrolls */
  let artTimer=null, artPaused=false; const photoBusy={};
  function artsWire(){
    const tr=document.querySelector(".arts-track"); clearInterval(artTimer); if (!tr) return;
    const cards=[...tr.querySelectorAll(".acard")], dots=[...document.querySelectorAll(".arts-dots span")];
    const upd = () => { const r=tr.getBoundingClientRect(), cx=r.left+r.width/2; let best=0, bd=1e9;
      cards.forEach((c,i)=>{ const cr=c.getBoundingClientRect(), off=(cr.left+cr.width/2)-cx; if (Math.abs(off)<bd){bd=Math.abs(off); best=i;}
        if (motionOK()){ const bk=c.querySelector(".bk"), md=c.querySelector(".mid"); if(bk) bk.style.transform=`translateX(${(-off*0.22).toFixed(1)}px)`; if(md) md.style.transform=`translateX(${(-off*0.1).toFixed(1)}px)`; } });
      dots.forEach((d,i)=>d.classList.toggle("on", i===best)); };
    let raf=0; tr.addEventListener("scroll", ()=>{ if(!raf) raf=requestAnimationFrame(()=>{ raf=0; upd(); }); }, {passive:true});
    ["pointerdown","touchstart","wheel","focusin"].forEach(ev=>tr.addEventListener(ev, ()=>{ artPaused=true; }, {passive:true}));
    upd();
    if (motionOK() && cards.length>1) artTimer=setInterval(()=>{ if (artPaused || document.hidden || !document.body.contains(tr)) return;
      const rtl=getComputedStyle(tr).direction==="rtl", step=(cards[0].getBoundingClientRect().width+12)*(rtl?-1:1);
      const atEnd = rtl ? (tr.scrollLeft <= -(tr.scrollWidth-tr.clientWidth)+4) : (tr.scrollLeft >= tr.scrollWidth-tr.clientWidth-4);
      if (atEnd) tr.scrollTo({left:0, behavior:"smooth"}); else tr.scrollBy({left:step, behavior:"smooth"}); }, 5200);
    if (PHOTO_OK) artList.forEach((x,i)=>{ const k=photoKey(x); if (photoMem[k] || photoBusy[k]) return; photoBusy[k]=fetchPhoto(x).finally(()=>{ delete photoBusy[k]; }); photoBusy[k].then(ph=>{ if (!ph||ph.none) return; const c=document.querySelector(`.arts-track [data-art="${i}"] .im`); if(!c || c.querySelector("img")) return;
      c.querySelector(".bk").innerHTML=photoLayer(ph); const md=c.querySelector(".mid"); if(md) md.remove();
      c.querySelector(".bk").insertAdjacentHTML("afterend", `<span class="shade"></span><span class="cr" title="${esc(credit(ph))}">${esc(credit(ph))}</span>`); upd(); }).catch(()=>{}); });
  }

  /* offline notice (website) */
  const offlineHtml = raw => (typeof navigator!=="undefined" && navigator.onLine===false) ? `<p class="offline" role="status"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 8.5a15 15 0 0 1 20 0"/><path d="M5.5 12a10 10 0 0 1 13 0"/><path d="M9 15.5a5 5 0 0 1 6 0"/><path d="M3 3l18 18"/></svg><span>${esc(RT().offline(raw.generatedAt||""))}</span></p>` : "";
  window.addEventListener("online", ()=>render()); window.addEventListener("offline", ()=>render());

  /* reading comfort panel (Aa button) */
  function aaRender(){
    const p=$("#aaPanel"); if (!p || p.hidden) return; const tx=RT();
    const opt = (k, v, label) => `<button type="button" data-aa="${k}" data-v="${v}" aria-pressed="${prefs[k]===v}">${esc(label)}</button>`;
    p.setAttribute("dir", lang==="ar"?"rtl":"ltr"); p.setAttribute("lang", lang);
    p.innerHTML = `<span class="grab" aria-hidden="true"></span><div class="hd"><h2 id="aaTitle">${esc(tx.comfort)}</h2><button type="button" class="icon ghost" id="aaClose" aria-label="${esc(t().close)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>
      <fieldset><legend>${esc(tx.size)}</legend><div class="opts">${["s","m","l","xl"].map(v=>opt("size",v,tx.sizes[v])).join("")}</div></fieldset>
      <fieldset><legend>${esc(tx.spacing)}</legend><div class="opts">${opt("spacing","compact",tx.compact)}${opt("spacing","relaxed",tx.relaxed)}</div></fieldset>
      <fieldset><legend>${esc(tx.look)}</legend><div class="opts">${opt("look","light",tx.light)}${opt("look","night",tx.night)}${opt("look","auto",tx.auto)}</div><p class="note">${esc(tx.autoNote)}</p></fieldset>
      <fieldset><legend>${esc(tx.motion)}</legend><div class="opts">${opt("motion","on",tx.on)}${opt("motion","off",tx.off)}</div><p class="note">${esc(tx.motionNote)}</p></fieldset>
      ${pushRow()}
      <p class="note">${esc(tx.saved)}</p>`;
  }
  function aaOpen(on){
    const p=$("#aaPanel"), s=$("#aaScrim"), b=$("#aaBtn"); if(!p) return;
    p.hidden=!on; s.hidden=!on; b.setAttribute("aria-expanded", String(!!on));
    if (on){ aaRender(); const f=p.querySelector('[aria-pressed="true"]'); if(f) f.focus(); } else b.focus();
  }
  document.addEventListener("click", e=>{
    if (e.target.closest("#aaBtn")){ aaOpen($("#aaPanel").hidden); return; }
    if (e.target.closest("#aaClose") || e.target.closest("#aaScrim")){ aaOpen(false); return; }
    const o=e.target.closest("[data-aa]"); if (o){ prefs[o.dataset.aa]=o.dataset.v; savePrefs(); aaRender(); const n=$(`[data-aa="${o.dataset.aa}"][data-v="${o.dataset.v}"]`); if(n) n.focus(); if (o.dataset.aa==="motion") render(); return; }
    const pk=e.target.closest("[data-pick]"); if (pk){ e.preventDefault(); pick(Number(pk.dataset.pick), true); return; }
    const tb=e.target.closest("[data-tabgo]"); if (tb){ tabGo(tb.dataset.tabgo); return; }
  });
  document.addEventListener("keydown", e=>{ if (e.key==="Escape" && $("#aaPanel") && !$("#aaPanel").hidden) aaOpen(false); });

  /* bottom tabs */
  let tabNow="today";
  function tabbarRender(){
    const bar=$("#tabbar"); if(!bar) return; const tx=RT(); const ids=["today","prices","wallet","stories"];
    const ic={today:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="10" opacity="0.5"/></svg>`,
      prices:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 17l5-5 4 4 8-8"/><path d="M15 8h5v5"/></svg>`,
      wallet:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12.5h2"/><path d="M3 9h14a2 2 0 0 0 2-2V6"/></svg>`,
      stories:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h14v16l-7-4-7 4z"/></svg>`};
    bar.setAttribute("dir", lang==="ar"?"rtl":"ltr"); bar.setAttribute("lang", lang);
    bar.innerHTML = ids.map((k,i)=>`<button type="button" data-tabgo="${k}" aria-current="${tabNow===k}">${ic[k]}<span>${esc(tx.tabs[i])}</span></button>`).join("");
  }
  function tabGo(k){
    tabNow=k; const beh = motionOK() ? "smooth" : "auto";
    if (k==="today") window.scrollTo({top:0, behavior:beh});
    else if (k==="wallet"){ lebShown=true; const ww=$("#secWallet"); if (ww) ww.classList.remove("leb-hidden"); if (typeof econTab!=="undefined" && econTab!=="wallet"){ econTab="wallet"; try{ localStorage.setItem("rb-etab","wallet"); }catch(e){} render(); } const el=$("#secWallet"); if(el) el.scrollIntoView({behavior:beh, block:"start"}); }
    else { if (k!=="prices") foldShow("ev"); const el=$(k==="prices"?"#secDay":(".f-ev")||"#secEvents") || $("#secEvents"); if(el) el.scrollIntoView({behavior:beh, block:"start"}); }
    tabbarRender();
  }
  function rdAfter(){ foldWire(); lebCard(); pageWire(); snapWire(); artsWire(); tabbarRender(); aaRender(); pushSync(); openFromLink(); const ab=$("#aaBtn"); if(ab){ ab.setAttribute("aria-label", RT().aa); ab.title=RT().aa; } }

  /* morning notification (website only): one push each morning after the brief is published */
  const FB = {apiKey:"AIzaSyAbMQhelPmOcPkkDToPDKtgDObOjwkl0nw", authDomain:"ripple-brief-dc986.firebaseapp.com", projectId:"ripple-brief-dc986", storageBucket:"ripple-brief-dc986.firebasestorage.app", messagingSenderId:"170751347733", appId:"1:170751347733:web:71265f68eff8a5fa4c921c"};
  const VAPID = "BJhlntjoPpYrie3VN2nbgWs4DNc-1WmEnuoloNpSxzOwHpkGYK3lVsahYJZFehuO1AR6YEo-8GtNfAlZKIZCji0";
  const FBV = "10.14.1";
  const PUSH_API = "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  const IS_IOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform==="MacIntel" && navigator.maxTouchPoints>1);
  const STANDALONE = !!(window.navigator.standalone || (window.matchMedia && matchMedia("(display-mode: standalone)").matches));
  const IOS_NEEDS_INSTALL = IS_IOS && !STANDALONE;   // iPhone/iPad allow notifications only from the Home Screen app
  const PUSH_OK = PHOTO_OK && (PUSH_API || IOS_NEEDS_INSTALL);
  const PS = {
    en:{h:"Get the morning brief", p:"One notification each morning when the brief is ready.", on:"Turn on", later:"Not now", row:"Morning brief notification", isOn:"On", isOff:"Off", done:"Morning brief is on. You'll get one notification each morning.", off:"Morning brief notifications are off.", blocked:"Notifications are blocked for this site in your browser settings.", fail:"Couldn't turn on notifications. Try again in a moment.", ios:"On iPhone, add Ripple Brief to your Home Screen first (Share, then Add to Home Screen), then turn this on from there."},
    ar:{h:"احصل على موجز الصباح", p:"إشعار واحد كل صباح عندما يصبح الموجز جاهزاً.", on:"تفعيل", later:"ليس الآن", row:"إشعار موجز الصباح", isOn:"تشغيل", isOff:"إيقاف", done:"تم تفعيل موجز الصباح. سيصلك إشعار واحد كل صباح.", off:"تم إيقاف إشعارات موجز الصباح.", blocked:"الإشعارات محظورة لهذا الموقع في إعدادات المتصفح.", fail:"تعذّر تفعيل الإشعارات. حاول مجدداً بعد قليل.", ios:"على الآيفون، أضف Ripple Brief إلى الشاشة الرئيسية أولاً (مشاركة ثم إضافة إلى الشاشة الرئيسية)، ثم فعّل الإشعار من هناك."},
    fr:{h:"Recevoir le briefing du matin", p:"Une notification chaque matin quand le briefing est prêt.", on:"Activer", later:"Pas maintenant", row:"Notification du briefing du matin", isOn:"Activée", isOff:"Désactivée", done:"Briefing du matin activé : une notification chaque matin.", off:"Notifications du briefing du matin désactivées.", blocked:"Les notifications sont bloquées pour ce site dans les réglages du navigateur.", fail:"Impossible d'activer les notifications. Réessayez dans un instant.", ios:"Sur iPhone, ajoutez d'abord Ripple Brief à l'écran d'accueil (Partager, puis Sur l'écran d'accueil), puis activez-les depuis là."}
  };
  const PT = () => PS[lang] || PS.en;
  const lsG = k => { try{ return localStorage.getItem(k)||""; }catch(e){ return ""; } };
  const lsS = (k,v) => { try{ if (v==null) localStorage.removeItem(k); else localStorage.setItem(k,v); }catch(e){} };
  let pushState = lsG("rb-push");
  const loadScript = src => new Promise((ok,no)=>{ const s=document.createElement("script"); s.src=src; s.onload=ok; s.onerror=no; document.head.appendChild(s); });
  const inTime = (p, ms) => Promise.race([p, new Promise((_,no)=>setTimeout(()=>no(new Error("timeout")), ms))]);
  async function fbMessaging(){
    if (!window.firebase || !firebase.messaging){ await loadScript(`https://www.gstatic.com/firebasejs/${FBV}/firebase-app-compat.js`); await loadScript(`https://www.gstatic.com/firebasejs/${FBV}/firebase-messaging-compat.js`); }
    if (!firebase.apps.length) firebase.initializeApp(FB);
    return firebase.messaging();
  }
  async function sha256hex(s){ const b=await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join(""); }
  const FSDOC = id => `https://firestore.googleapis.com/v1/projects/${FB.projectId}/databases/(default)/documents/pushTokens${id?"/"+id:""}`;
  const pushDel = id => id ? fetch(FSDOC(id)+`?key=${FB.apiKey}`, {method:"DELETE"}).catch(()=>{}) : Promise.resolve();
  async function pushSaveLang(id){
    const r=await fetch(FSDOC(id)+`?updateMask.fieldPaths=lang&currentDocument.exists=true&key=${FB.apiKey}`, {method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({fields:{lang:{stringValue:lang}}})});
    if (r.ok) lsS("rb-push-lang", lang); return r.ok;
  }
  async function pushSave(tok){
    const id=await sha256hex(tok);
    let r=await fetch(FSDOC()+`?documentId=${id}&key=${FB.apiKey}`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({fields:{token:{stringValue:tok}, lang:{stringValue:lang}, created:{timestampValue:new Date().toISOString()}}})});
    if (r.status===409) { if (!(await pushSaveLang(id))) throw new Error("lang"); }
    else if (!r.ok) throw new Error("save "+r.status);
    lsS("rb-push-id", id); lsS("rb-push-lang", lang); lsS("rb-push-chk", String(Date.now()));
    return id;
  }
  async function pushToken(){
    const reg = await inTime(navigator.serviceWorker.ready, 15000);
    const m = await inTime(fbMessaging(), 20000);
    return inTime(m.getToken({vapidKey:VAPID, serviceWorkerRegistration:reg}), 20000);
  }
  async function pushOn(){
    if (IOS_NEEDS_INSTALL){ toast(PT().ios); return; }
    if (!PUSH_API) return;
    try{
      const perm = await Notification.requestPermission();
      if (perm!=="granted"){ toast(PT().blocked); pushState="later"; lsS("rb-push","later"); render(); return; }
      const tok = await pushToken();
      if (!tok) throw new Error("no token");
      const old = lsG("rb-push-id"), id = await pushSave(tok);
      if (old && old!==id) pushDel(old);
      pushState="on"; lsS("rb-push","on"); toast(PT().done);
    } catch(e){ console.warn("[push]", e); toast(PT().fail); }
    render(); aaRender();
  }
  async function pushOff(){
    try{ const m=await inTime(fbMessaging(), 20000); await m.deleteToken(); }catch(e){}
    await pushDel(lsG("rb-push-id"));
    lsS("rb-push-id", null); lsS("rb-push-lang", null); lsS("rb-push-chk", null);
    pushState="off"; lsS("rb-push","off"); toast(PT().off); render(); aaRender();
  }
  /* every few days: keep the phone's address fresh (browsers rotate it), and tidy up if notifications were switched off in the browser */
  async function pushRefresh(){
    try{
      if (Notification.permission!=="granted"){ await pushDel(lsG("rb-push-id")); lsS("rb-push-id", null); lsS("rb-push-lang", null); pushState="off"; lsS("rb-push","off"); aaRender(); return; }
      if (Date.now()-Number(lsG("rb-push-chk")||0) < 3*864e5) return;
      const tok = await pushToken(); if (!tok) return;
      const old = lsG("rb-push-id"), id = await sha256hex(tok);
      if (id!==old){ await pushSave(tok); pushDel(old); } else lsS("rb-push-chk", String(Date.now()));
    }catch(e){ console.warn("[push] refresh", e); }
  }
  function pushHtml(){
    if (!PUSH_OK || pushState) return "";
    const p=PT();
    return `<section class="pushcard" dir="${lang==="ar"?"rtl":"ltr"}" lang="${lang}"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F2A541" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10.3 20a1.9 1.9 0 0 0 3.4 0"/></svg><div class="pc-t"><strong>${esc(p.h)}</strong><span>${esc(p.p)}</span></div><div class="pc-b"><button type="button" data-push="on">${esc(p.on)}</button><button type="button" class="ghost" data-push="later">${esc(p.later)}</button></div></section>`;
  }
  function pushRow(){
    if (!PUSH_OK) return ""; const p=PT(), on=pushState==="on";
    return `<fieldset><legend>${esc(p.row)}</legend><div class="opts"><button type="button" data-push="on" aria-pressed="${on}">${esc(p.isOn)}</button><button type="button" data-push="off" aria-pressed="${!on}">${esc(p.isOff)}</button></div><p class="note">${esc(p.p)}</p></fieldset>`;
  }
  document.addEventListener("click", e=>{
    const b=e.target.closest("[data-push]"); if (!b) return;
    const v=b.dataset.push;
    if (v==="on"){ if (pushState!=="on") pushOn(); }
    else if (v==="off"){ if (pushState==="on") pushOff(); }
    else { pushState="later"; lsS("rb-push","later"); render(); }
  });
  let pushChecked=false;
  function pushSync(){
    if (!PUSH_API || pushState!=="on") return;
    if (lsG("rb-push-id") && lsG("rb-push-lang")!==lang) pushSaveLang(lsG("rb-push-id")).catch(()=>{});
    if (!pushChecked){ pushChecked=true; setTimeout(pushRefresh, 4000); }
  }

  /* opened from the notification: ?open=quick shows the 60-second read; ?open=listen also points at the Listen button */
  let openLink = "";
  try{ const u=new URL(location.href); openLink=u.searchParams.get("open")||""; if (openLink){ u.searchParams.delete("open"); history.replaceState(history.state, "", u.pathname+u.search+u.hash); } }catch(e){}
  function openFromLink(){
    const o=openLink; openLink=""; if (o!=="quick" && o!=="listen") return;
    if (!quick) setQuick(true);
    if (o==="listen") setTimeout(()=>{ const b=document.getElementById("qListen"); if (!b) return; b.classList.add("rb-pulse"); try{ b.focus({preventScroll:true}); }catch(e){} setTimeout(()=>b.classList.remove("rb-pulse"), 4000); }, 400);
  }

  /* v1.1: "More events today" list, as in the approved design */
  const MORE = {
    en:{h:"More events today", st:{escalating:"rising", new:"new", easing:"easing", ongoing:"no change"}},
    ar:{h:"أحداث أخرى اليوم", st:{escalating:"في تصاعد", new:"جديد", easing:"تهدئة", ongoing:"دون تغيير"}},
    fr:{h:"Autres événements du jour", st:{escalating:"en hausse", new:"nouveau", easing:"en baisse", ongoing:"inchangé"}}
  };
  function moreHtml(pol){
    const rest=(pol||[]).slice(1,6); if (!rest.length) return "";
    const m=MORE[curLang()]||MORE.en;
    const rows=rest.map(p=>`<a class="mrow" href="#ev${p._i}" data-pick="${p._i}"><span class="rbadge ${scoreTier(p._s)}${p._s>=50?" glow":""}">${p._s}</span><span class="mt">${esc(p.title)}</span>${p.status&&m.st[p.status]?`<span class="ms${p.status==="escalating"?" up":""}">${esc(m.st[p.status])}</span>`:""}</a>`).join("");
    return `<section class="more" id="secMore"><h2>${esc(m.h)}</h2><div class="mlist">${rows}</div></section>`;
  }
  /* v1.1 header line, as in the design: "Monday 12 October, researched 07:53 Beirut" */
  function researchedLine(b){
    const tm=(String(b.generatedAt||"").match(/(\d{1,2}:\d{2})/)||[])[1]||"";
    const d=fmtDate(b.date,{weekday:"long",day:"numeric",month:"long"}), L=curLang();
    if (!tm) return d;
    return L==="ar" ? `${d}، بحث الساعة ${tm} بتوقيت بيروت` : L==="fr" ? `${d}, recherché à ${tm} (Beyrouth)` : `${d}, researched ${tm} Beirut`;
  }

  /* v1.1: sections from Key indicators down fold into framed bars (name + arrow); Lebanon's economy stays open */
  const foldOpen = new Set();
  const FARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="square" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';
  const SURF='var(--surface)';
  const FRAME = {
    ind: W => { let t=""; for (let x=0;x<W;x+=10) t+=`<line x1="${x}" y1="0" x2="${x}" y2="${x%40===0?8:4}" stroke="#0E3A53" stroke-width="1.2"/>`;
      const pts=[]; for (let i=0;i<=12;i++){ const x=(W-64)*i/12, y=[60,57,62,52,55,46,50,41,47,36,40,30,33][i]; pts.push(x.toFixed(1)+","+y); }
      return `<svg class="fr mir" viewBox="0 0 ${W} 68" preserveAspectRatio="none" aria-hidden="true"><rect width="${W}" height="68" fill="${SURF}"/><rect x="1" y="1" width="${W-2}" height="66" fill="none" stroke="#0E3A53" stroke-width="2"/>${t}<polyline points="${pts.join(" ")}" fill="none" stroke="#F2A541" stroke-width="2"/></svg>`; },
    out: W => `<svg class="fr mir" viewBox="0 0 ${W} 68" aria-hidden="true"><defs><linearGradient id="rbSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F2A541" stop-opacity=".28"/><stop offset="1" stop-color="#F2A541" stop-opacity="0"/></linearGradient></defs><rect width="${W}" height="68" fill="${SURF}"/><rect width="${W}" height="54" fill="url(#rbSky)"/><circle cx="${W-66}" cy="54" r="16" fill="#F2A541" opacity=".55"/><rect y="54" width="${W}" height="14" fill="${SURF}"/><line x1="0" y1="54" x2="${W}" y2="54" stroke="#9A5B0B" stroke-width="1.5"/><path d="M0 62H${W}" stroke="#9A5B0B" stroke-dasharray="6 6" opacity=".5"/><rect x="1" y="1" width="${W-2}" height="66" fill="none" stroke="#9A5B0B" stroke-width="1.5"/></svg>`,
    ev: W => { let r=""; for (const k of [24,48,72,96,120]) r+=`<circle cx="${W}" cy="68" r="${k}" fill="none" stroke="#16706F" stroke-width="1.2" opacity="${(0.6-k/300).toFixed(2)}"/>`;
      return `<svg class="fr mir" viewBox="0 0 ${W} 68" aria-hidden="true"><rect width="${W}" height="68" fill="${SURF}"/>${r}<circle cx="${W-62}" cy="48" r="4" fill="#F2A541"/><circle cx="${W-110}" cy="16" r="3" fill="#E2574C"/><rect x="1" y="1" width="${W-2}" height="66" fill="none" stroke="#16706F" stroke-width="2"/><path d="M1 14V1h13M${W-14} 67h13v-13" fill="none" stroke="#F2A541" stroke-width="3"/></svg>`; },
    world: W => { let g=""; const cx=W-118; for (const rx of [10,24,38,46]) g+=`<ellipse cx="${cx}" cy="34" rx="${rx}" ry="46" fill="none" stroke="#2F5D7C" stroke-width="1" opacity=".55"/>`;
      for (const y of [12,24,34,44,56]) g+=`<line x1="${cx-46}" y1="${y}" x2="${cx+46}" y2="${y}" stroke="#2F5D7C" stroke-width="1" opacity=".35"/>`;
      return `<svg class="fr mir" viewBox="0 0 ${W} 68" aria-hidden="true"><rect width="${W}" height="68" fill="${SURF}"/>${g}<rect x="1" y="1" width="${W-2}" height="66" fill="none" stroke="#2F5D7C" stroke-width="2"/><rect x="5" y="5" width="${W-10}" height="58" fill="none" stroke="#2F5D7C" stroke-width=".8" opacity=".5"/></svg>`; },
    cal: W => {
      const now=new Date(new Date().toLocaleString("en-US",{timeZone:"Asia/Beirut"})); const dow=(now.getDay()+6)%7; const mon=new Date(now); mon.setDate(now.getDate()-dow);
      const L=curLang(); let mname=""; try{ mname=now.toLocaleDateString(L==="ar"?"ar-LB":L==="fr"?"fr-FR":"en-GB",{month:"long",year:"numeric"}); }catch(e){}
      if (L!=="ar") mname=mname.toUpperCase();
      const cw=W/7; let g="", n="";
      for (let i=1;i<7;i++) g+=`<line x1="${(i*cw).toFixed(1)}" y1="18" x2="${(i*cw).toFixed(1)}" y2="68" stroke="var(--line)"/>`;
      g+=`<line x1="0" y1="43" x2="${W}" y2="43" stroke="var(--line)"/>`;
      for (let r=0;r<2;r++) for (let c=0;c<7;c++){ const d=new Date(mon); d.setDate(mon.getDate()+r*7+c); const x=(c*cw+cw-4).toFixed(1), y=r?62:27;
        if (!(r===1 && c<3)) n+=`<text x="${x}" y="${y}" text-anchor="end" font-size="8" fill="#B5C9C6" font-family="Instrument Sans,sans-serif">${d.getDate()}</text>`;
        if (r===0 && c===dow) n+=`<circle cx="${(c*cw+cw-8).toFixed(1)}" cy="24.5" r="7" fill="none" stroke="#F2A541" stroke-width="1.8"/>`; }
      let h=""; for (let x=14;x<W;x+=22) h+=`<circle cx="${x}" cy="5" r="2.2" fill="#fff"/><path d="M${x} -2V5" stroke="#0E3A53" stroke-width="2.2"/>`;
      return `<svg class="fr" viewBox="0 0 ${W} 68" aria-hidden="true"><rect width="${W}" height="68" fill="${SURF}"/>${g}${n}<rect width="${W}" height="18" fill="#D7262E"/>${h}<text x="${W/2}" y="15" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="700" font-size="8" letter-spacing="${L==="ar"?0:2}" fill="#fff">${esc(mname)}</text><rect x=".5" y=".5" width="${W-1}" height="67" fill="none" stroke="var(--line)"/><path d="M${W-16} 68L${W} 52V68Z" fill="var(--line)"/></svg>`; }
  };
  function foldShow(k){ foldOpen.add(k); const f=document.querySelector(`.fold[data-fold="${k}"]`); if (f){ f.querySelector(".fbar").setAttribute("aria-expanded","true"); f.querySelector(".fbody").hidden=false; } }
  function foldWire(){
    const main=$("#main"); if (!main || !$("#secPrices")) return;
    const w=$("#secWallet"), anchor=$("#secMore")||$("#secArts")||$("#secDay");
    if (w && anchor && anchor.nextElementSibling!==w) anchor.after(w);
    const p=$("#secPrices"), nx=p.nextElementSibling, out=(nx && nx.matches("section.sec") && nx.id!=="secEvents") ? nx : null;
    const list=[["ind",p],["out",out],["ev",$("#secEvents")],["world",main.querySelector(":scope > .chain")],["cal",main.querySelector(":scope > .lower")]];
    const W=Math.max(280, Math.round(main.clientWidth)||358);
    for (const [k,el] of list){
      if (!el || el.closest(".fold")) continue;
      const h=el.querySelector("h2"), name=h ? h.textContent.trim() : k, open=foldOpen.has(k);
      const f=document.createElement("section"); f.className="fold f-"+k; f.dataset.fold=k;
      f.innerHTML=`<button type="button" class="fbar" aria-expanded="${open}">${FRAME[k](W)}<span class="fn">${esc(name)}</span><span class="far">${FARROW}</span></button><div class="fbody"${open?"":" hidden"}></div>`;
      el.before(f); f.querySelector(".fbody").appendChild(el); if (h) h.classList.add("fold-h");
    }
  }
  document.addEventListener("click", e=>{
    if (e.target.closest("[data-pick]")) foldShow("ev");
    const fb=e.target.closest(".fbar"); if (!fb) return;
    const f=fb.parentElement, k=f.dataset.fold, open=!foldOpen.has(k);
    if (open) foldOpen.add(k); else foldOpen.delete(k);
    fb.setAttribute("aria-expanded", String(open)); f.querySelector(".fbody").hidden=!open;
  }, true);

  /* v1.1: "Lebanon at a glance" as one vibrant fact card in the sea header; a different fact each time the app opens */
  const LEBK={en:"Lebanon at a glance", ar:"لبنان في لمحة", fr:"Le Liban en bref"};
  const LEBMORE={en:"Tap for all the numbers and My wallet", ar:"اضغط لكل الأرقام ومحفظتي", fr:"Touchez pour tous les chiffres et Mon portefeuille"};
  let lebIdx = -1, lebShown = false;
  function lebCard(){
    const today=document.querySelector("#main > section.today"), w=$("#secWallet"); if (!today || !w) return;
    if (!lebShown) w.classList.add("leb-hidden");
    const facts=[...w.querySelectorAll(".efact")].map(f=>({ic:(f.querySelector(".ic")||{}).textContent||"🇱🇧", tx:(f.querySelector("span:not(.ic)")||f).textContent.trim()})).filter(f=>f.tx);
    if (!facts.length) return;
    if (lebIdx<0){ let n=0; try{ n=Number(localStorage.getItem("rb-fact")||0)+1; localStorage.setItem("rb-fact", String(n)); }catch(e){} lebIdx=n; }
    const f=facts[lebIdx % facts.length], L=curLang();
    const msg=f.tx.split(/(\$?\d[\d,.]*%?)/).map((x,i)=>i%2?`<b>${esc(x)}</b>`:esc(x)).join("");
    const dots=facts.map((_,i)=>`<i${i===lebIdx%facts.length?' class="on"':""}></i>`).join("");
    const old=document.querySelector("#main > .lebwrap"); if (old) old.remove();
    today.insertAdjacentHTML("afterend", `<div class="lebwrap"><button type="button" class="lebc" aria-expanded="${lebShown}"><span class="lemo" aria-hidden="true">${esc(f.ic)}</span><span class="lft"><span class="lk">${esc(LEBK[L]||LEBK.en)}</span><span class="lmsg">${msg}</span><span class="lmore">${esc(LEBMORE[L]||LEBMORE.en)} ›</span></span></button><span class="ldots" aria-hidden="true">${dots}</span></div>`);
  }
  document.addEventListener("click", e=>{
    const c=e.target.closest(".lebc"); if (!c) return;
    lebShown=!lebShown; const w=$("#secWallet"); if (!w) return;
    w.classList.toggle("leb-hidden", !lebShown); c.setAttribute("aria-expanded", String(lebShown));
    if (lebShown) w.scrollIntoView({behavior: motionOK()?"smooth":"auto", block:"start"});
  });

  /* v1.1: page-by-page scrolling (snap to each part) with a slight elastic settle */
  let snapIO=null, snapReady=false;
  function snapWire(){
    if (snapIO) snapIO.disconnect();
    const els=[...document.querySelectorAll(".wrap > .top, #main > .rbpg")];
    els.forEach(el=>el.classList.add("rb-page"));
    if (!("IntersectionObserver" in window)) return;
    snapReady=false; setTimeout(()=>{ snapReady=true; }, 800);
    snapIO=new IntersectionObserver(es=>{ es.forEach(e=>{
      if (!e.isIntersecting || !snapReady || !motionOK() || e.target.classList.contains("top")) return;
      const t=e.target; t.classList.remove("rb-settle"); void t.offsetWidth; t.classList.add("rb-settle");
      setTimeout(()=>t.classList.remove("rb-settle"), 700);
    }); }, {threshold:0.35});
    els.forEach(el=>snapIO.observe(el));
  }

  /* v1.1: group the home screen into full-screen pages, one per swipe */
  function pgSize(){
    const tb=$("#tabbar"), tbh=(tb && getComputedStyle(tb).display!=="none") ? tb.offsetHeight : 0;
    const h=window.innerHeight - tbh; document.documentElement.style.setProperty("--pgh", h+"px");
    const top=document.querySelector(".wrap > .top"), hero=document.querySelector("#main .hero");
    if (top && hero) hero.style.minHeight=Math.max(0, h - top.offsetHeight)+"px";
  }
  window.addEventListener("resize", ()=>pgSize());
  function pageWire(){
    const main=$("#main"); if (!main || !main.querySelector(":scope > .hero, :scope > section.today")) return;
    const kids=[...main.children].filter(el=>!el.classList.contains("rbpg"));
    const groups=[[],[],[],[]]; // 0 bottom line, 1 Lebanon + prices, 2 articles + events, 3 sections
    let g=0;
    for (const el of kids){
      if (el.classList.contains("hero")) continue;
      if (el.id==="secWallet"){ groups[1].push(el); continue; }
      if (el.classList.contains("lebwrap") || el.classList.contains("pushcard") || el.classList.contains("dayp") || el.id==="secWallet") g=Math.max(g,1);
      if (el.classList.contains("arts") || el.classList.contains("more")) g=Math.max(g,2);
      if (el.classList.contains("fold") || el.classList.contains("sec") || el.classList.contains("chain") || el.classList.contains("lower")) g=3;
      groups[g].push(el);
    }
    groups.forEach((list,i)=>{ if (!list.length) return; const pg=document.createElement("div"); pg.className="rbpg rbpg"+(i+2); list[0].before(pg); list.forEach(el=>pg.appendChild(el)); });
        pgSize();
  }
