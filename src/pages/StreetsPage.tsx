import { useState } from "react";
import { MaltaMap } from "../components/MaltaMap";
import { localityProfiles, streetsRanking } from "../data/localities";

export function StreetsPage() {
  const [selected, setSelected] = useState(localityProfiles[0].name);
  const profile = localityProfiles.find((p) => p.name === selected) ?? localityProfiles[0];
  const ranking = streetsRanking();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <h2 className="text-2xl font-semibold text-white">Streets — dispatch ranking</h2>
        <p className="text-slate-400 text-sm mt-1">
          Cleansing crews (~45 t/day nationally). Ranked by illegal-dump pressure and corridor load.
        </p>
        <ol className="mt-4 space-y-2">
          {ranking.map((row) => (
            <li
              key={row.locality}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2 cursor-pointer transition-colors ${
                row.locality === selected
                  ? "border-sky-400/50 bg-sky-500/10"
                  : "border-[var(--color-line)] bg-[var(--color-panel)] hover:bg-[var(--color-panel-2)]"
              }`}
              onClick={() => setSelected(row.locality)}
            >
              <span className="font-mono text-sky-300 w-6">#{row.rank}</span>
              <div className="flex-1">
                <p className="font-medium text-white">{row.locality}</p>
                <p className="text-xs text-slate-500">{row.tonnesPerDay} t/day corridor</p>
              </div>
              <span className="text-xs font-mono text-amber-300">{row.pressure}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="space-y-4">
        <MaltaMap selected={selected} onSelect={setSelected} />
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4">
          <h3 className="font-semibold text-white">{profile.name}</h3>
          <p className="text-sm text-slate-400 mt-2">{profile.headline}</p>
          <ul className="mt-3 space-y-1 text-sm text-slate-300 list-disc pl-5">
            {profile.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
