import sys
src,dst=sys.argv[1],sys.argv[2]; s=open(src,encoding='utf-8').read()
def rep(a,b,n=1):
    global s
    c=s.count(a); assert c==n,(a[:80],c); s=s.replace(a,b)
rep('family=Archivo:wdth,wght@100..125,400..800&','family=Archivo:wdth,wght@100..125,400..800&family=Instrument+Sans:wght@400;500;600;700&')
rep('''      ${trbar}
      ${alert}
      ${palerts}
      <nav class="days" aria-label="Briefings">${days}</nav>
      ${offlineHtml(raw)}${heroHtml(b, raw, pol)}''','''      ${heroHtml(b, raw, pol)}
      ${trbar}
      ${alert}
      ${palerts}
      ${offlineHtml(raw)}<nav class="days" aria-label="Briefings">${days}</nav>''')
rep('''aria-pressed="${quick}">⚡ ${esc(TU.qOn)}</button>''','''aria-pressed="${quick}">${esc(TU.qOn)}</button>''')
rep('${pushHtml()}${pricesHtml(raw)}${artsHtml(b, raw, pol)}','${pushHtml()}${pricesHtml(raw)}${artsHtml(b, raw, pol)}${moreHtml(pol)}')
open(dst,'w',encoding='utf-8').write(s); print('ok')
s=open(dst,encoding='utf-8').read()
a='const last=briefs[0]?briefs[0].generatedAt:""; setStatus(last?tx.last(last):""); return; }'
assert s.count(a)==1
s=s.replace(a,'setStatus(briefs[0]?researchedLine(briefs[0]):""); return; }')
open(dst,'w',encoding='utf-8').write(s); print('ok2')
