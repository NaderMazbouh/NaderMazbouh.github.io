# Draws the Ripple Brief icon: a drop with three ripple rings on cedar green.
import sys
from PIL import Image, ImageDraw
def icon(size, maskable=False, out="icon.png"):
    S=size*4
    bg=(31,106,74,255); fg=(255,255,255,255)
    im=Image.new("RGBA",(S,S),(0,0,0,0)); d=ImageDraw.Draw(im)
    if maskable: d.rectangle([0,0,S,S],fill=bg); scale=0.62
    else: d.rounded_rectangle([0,0,S-1,S-1],radius=int(S*0.22),fill=bg); scale=0.78
    c=S/2; R=S*scale/2
    for i,f in enumerate([1.0,0.72,0.44]):
        r=R*f; w=max(2,int(S*0.045))
        d.ellipse([c-r,c-r*0.62+S*0.05,c+r,c+r*0.62+S*0.05],outline=fg if i<2 else (226,239,232,255),width=w)
    r=R*0.16; d.ellipse([c-r,c-r+S*0.05-R*0.05,c+r,c+r+S*0.05-R*0.05],fill=(240,165,74,255))
    im.resize((size,size),Image.LANCZOS).save(out)
base=sys.argv[1]
for s in (192,512): icon(s,False,f"{base}/icon-{s}.png")
icon(512,True,f"{base}/icon-maskable-512.png")
icon(180,True,f"{base}/apple-touch-icon.png")
icon(48,False,f"{base}/favicon-48.png")
