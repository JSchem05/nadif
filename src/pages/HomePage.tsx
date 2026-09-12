import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MaltaMap } from "../components/MaltaMap";
import { localityProfiles, nationalStats } from "../data/localities";

export function HomePage() {
  const featured = localityProfiles[1];
  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <p className="text-sky-300/90 text-sm font-mono uppercase tracking-widest">
            National picture
          </p>
          <h2 className="text-3xl font-semibold text-white leading-tight">
            Malta generates too much waste for landfill — operations need a shared
            desk, not another PDF timetable.
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Municipal waste" value={nationalStats.totalTonnes.toLocaleString()} unit="tonnes/yr" />
            <Stat label="Still landfilled" value={`${nationalStats.landfilledPct}%`} unit="national" />
            <Stat label="Cleansing" value={String(nationalStats.cleansingTonnesPerDay)} unit="t/day" />
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <PillLink to="/streets">Streets dispatch</PillLink>
            <PillLink to="/report">Report & classify</PillLink>
            <PillLink to="/sort">Resident sort guide</PillLink>
            <PillLink to="/briefing">Morning brief</PillLink>
          </div>
        </div>
        <MaltaMap selected={featured.name} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {localityProfiles.map((loc) => (
          <article
            key={loc.name}
            className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white">{loc.name}</h3>
              <span className="text-xs font-mono text-amber-300">
                pressure {loc.pressure.illegalDumps}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1">{loc.headline}</p>
            <p className="text-xs text-slate-500 mt-3 font-mono">
              Today: {loc.collectionToday.join(" · ")}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl bg-[var(--color-panel)] border border-[var(--color-line)] p-3">
      <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-xl font-semibold text-white tabular-nums">{value}</p>
      <p className="text-xs text-slate-500">{unit}</p>
    </div>
  );
}

function PillLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-sm px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/10"
    >
      {children}
    </Link>
  );
}
