"""Turn an ArtifactData export (one folder per collection, one <doc id>.json per document)
into the app's data files in ./data/.  Usage: python3 tools/assemble_data.py <export dir> <repo dir>
Keeps the newest 14 briefings (with their Arabic/French translations), every trend series and forecast,
the exchange rates (meta/fx) and the latest high-impact alert. Prints a one-line summary."""
import sys, os, json, glob
src, repo = sys.argv[1], sys.argv[2]
def docs(coll):
    out = {}
    for f in sorted(glob.glob(os.path.join(src, coll, "*.json"))):
        d = json.load(open(f, encoding="utf-8"))
        if isinstance(d, dict) and "data" in d and isinstance(d["data"], dict): d = d["data"]
        out[os.path.basename(f)[:-5]] = d
    return out
data = {
  "briefings": dict(sorted(docs("briefings").items(), key=lambda kv: kv[1].get("date", kv[0]), reverse=True)[:14]),
  "series": docs("series"),
  "forecasts": docs("forecasts"),
  "meta": {k: v for k, v in docs("meta").items() if k == "fx"},
  "alerts": {k: v for k, v in docs("alerts").items() if k == "latest"},
}
if not data["briefings"]:
    sys.exit("No briefings found in the export; nothing written.")
os.makedirs(os.path.join(repo, "data"), exist_ok=True)
changed = []
for name, obj in data.items():
    path = os.path.join(repo, "data", name + ".json")
    new = json.dumps(obj, ensure_ascii=False, separators=(",", ":"))
    old = open(path, encoding="utf-8").read() if os.path.exists(path) else None
    if new != old:
        open(path, "w", encoding="utf-8").write(new); changed.append(name)
latest = next(iter(data["briefings"]))
print(f"latest briefing {latest}; {len(data['briefings'])} briefings, {len(data['series'])} series, {len(data['forecasts'])} forecasts; changed: {', '.join(changed) or 'nothing'}")
