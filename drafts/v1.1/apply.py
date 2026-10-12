import sys
f=sys.argv[1]; s=open(f,encoding='utf-8').read()
css=open('v10/rd.css',encoding='utf-8').read(); js=open('v10/rd.js',encoding='utf-8').read()
LOGO='<svg class="logo" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="3.5" fill="#F2A541"/><circle cx="15" cy="15" r="8" fill="none" stroke="#7FC8C4" stroke-width="2"/><circle cx="15" cy="15" r="13" fill="none" stroke="#7FC8C4" stroke-width="1.5" opacity="0.55"/></svg>'
def rep(a,b,n=1):
    global s
    c=s.count(a); assert c==n,(a[:70],c); s=s.replace(a,b)
rep('family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&','family=Archivo:wdth,wght@100..125,400..800&family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&')
rep('</style>\n\n<div class="wrap">','</style>\n<style>\n'+css+'</style>\n\n<div class="wrap">')
rep('<h1>Ripple Brief</h1>','<h1>'+LOGO+'Ripple Brief</h1>')
rep('<div class="menuwrap">','<button type="button" class="aa" id="aaBtn" dir="ltr" aria-haspopup="dialog" aria-expanded="false" aria-controls="aaPanel"><span class="s">A</span><span>a</span></button>\n      <div class="menuwrap">')
rep('<div class="toast" id="toast" role="status" hidden></div>','<div class="aascrim" id="aaScrim" hidden></div><div class="aapanel" id="aaPanel" role="dialog" aria-labelledby="aaTitle" hidden></div>\n<nav class="tabbar" id="tabbar" aria-label="Sections"></nav>\n<div class="toast" id="toast" role="status" hidden></div>')
rep('`"Bricolage Grotesque", ${arS}, system-ui, sans-serif`','`"Archivo", ${arS}, system-ui, sans-serif`')
rep('r.setProperty("--zoom", ZOOM[prefs.size]||1);','r.setProperty("--zoom", ZOOM[prefs.size]||1); applyComfort();')
rep('const STOPS=[[0,[47,111,214]],[25,[42,163,184]],[50,[217,164,0]],[75,[232,104,26]],[100,[208,38,29]]];','const STOPS=[[0,[127,168,176]],[49,[95,169,181]],[50,[242,165,65]],[74,[224,132,40]],[75,[226,87,76]],[100,[190,40,30]]];')
rep('  const t = () => T[curLang()];\n','  const t = () => T[curLang()];\n'+js+'\n')
rep('${days}</nav>\n      <section class="today">\n','${days}</nav>\n      ${offlineHtml(raw)}${heroHtml(b, raw, pol)}\n      <section class="today">\n')
rep('      <section class="sec"><div class="sec-h"><h2>${esc(tx.indicators)}</h2>','      ${pushHtml()}${pricesHtml(raw)}${artsHtml(b, raw, pol)}\n      <section class="sec" id="secPrices"><div class="sec-h"><h2>${esc(tx.indicators)}</h2>')
rep('      <section class="sec">\n        <div class="sec-h"><h2>${esc(tx.events)}</h2>','      <section class="sec" id="secEvents">\n        <div class="sec-h"><h2>${esc(tx.events)}</h2>')
rep('${withUI(()=>econBox(raw))}','<div id="secWallet">${withUI(()=>econBox(raw))}</div>')
rep('    updateWalletCalcs();\n    if (actId)','    updateWalletCalcs(); rdAfter();\n    if (actId)')
rep('    applyPrefs();\n    if (!$("#modal").hidden','    applyPrefs(); tabbarRender();\n    if (!$("#modal").hidden')
open(sys.argv[2],'w',encoding='utf-8').write(s); print('ok', len(s))
