# Ripple Brief v1.1 design draft (on hold, not live)

Build: `python3 apply.py index.v21.html index.v22.html` (run from a folder with v10/rd.css + v10/rd.js, as in the session) then
`python3 apply2.py index.v22.html index.v23.html` → index.v23.html is the Claude-version page; `tools/build_pwa.py` turns it into the website index.html.

What it changes: flat full-width sea header (matches the approved preview), "More events today" list, Lebanon at a glance as a sunset fact card
under the bottom line (new fact each app open, tap opens full section), sections from Key indicators down as framed fold-out bars
(ruler, horizon, radar, globe, calendar), warm accent, and the home screen split into 5 full-screen pages with snap scrolling and an elastic settle.
