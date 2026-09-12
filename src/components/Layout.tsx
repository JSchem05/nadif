import { NavLink, Outlet } from "react-router-dom";

const links: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Situation", end: true },
  { to: "/streets", label: "Streets" },
  { to: "/report", label: "Report" },
  { to: "/sort", label: "Sort" },
  { to: "/briefing", label: "Brief" },
];

export function Layout() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-[var(--color-line)] bg-[var(--color-panel)]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex flex-wrap items-center gap-4 justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300/80 font-mono">
              Nadif
            </p>
            <h1 className="text-lg font-semibold text-white">
              Malta waste desk
            </h1>
            <p className="text-sm text-slate-400">
              Situation room + AI operations desk
            </p>
          </div>
          <nav className="flex flex-wrap gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm transition-colors ${
                    isActive
                      ? "bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/40"
                      : "text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
