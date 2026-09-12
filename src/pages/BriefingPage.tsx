import { useCallback, useEffect, useState } from "react";
import { localityProfiles } from "../data/localities";

type BriefAction = {
  title: string;
  owner: string;
  priority: "now" | "today" | "watch";
};

type MorningBrief = {
  locality: string;
  title: string;
  generatedAt: string;
  pressure: {
    illegalDumps: number;
    collectionCompliance: number;
    shortLetRisk: number;
  };
  headline: string;
  bullets: string[];
  actions: BriefAction[];
  collectionToday: string[];
};

export function BriefingPage() {
  const [locality, setLocality] = useState("St Paul's Bay");
  const [brief, setBrief] = useState<MorningBrief | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadBrief = useCallback(async (loc: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/brief?locality=${encodeURIComponent(loc)}`);
      const data = (await res.json()) as MorningBrief;
      setBrief(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrief(locality);
  }, [locality, loadBrief]);

  async function copyBrief() {
    if (!brief) return;
    const text = [
      brief.title,
      brief.headline,
      "",
      "Pressure — illegal / compliance / short-let:",
      `${brief.pressure.illegalDumps} / ${brief.pressure.collectionCompliance} / ${brief.pressure.shortLetRisk}`,
      "",
      ...brief.bullets.map((b) => `• ${b}`),
      "",
      "Actions:",
      ...brief.actions.map((a) => `• [${a.priority}] ${a.title} (${a.owner})`),
    ].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex flex-wrap items-end gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Morning brief</h2>
          <p className="text-slate-400 text-sm mt-1">
            AI ops desk summary — regenerates when locality changes.
          </p>
        </div>
        <label className="text-sm text-slate-400">
          Locality
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="ml-2 rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-line)] px-3 py-1.5 text-white"
          >
            {localityProfiles.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && !brief && (
        <p className="text-slate-500 text-sm">Generating brief…</p>
      )}

      {brief && (
        <article className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-5 space-y-4">
          <div className="flex flex-wrap gap-3 justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-white">{brief.title}</h3>
              <p className="text-sm text-slate-500 font-mono mt-1">
                {new Date(brief.generatedAt).toLocaleString()}
              </p>
            </div>
            <button
              type="button"
              onClick={copyBrief}
              className="text-sm rounded-full px-3 py-1.5 bg-white/10 hover:bg-white/15"
            >
              {copied ? "Copied" : "Copy brief"}
            </button>
          </div>

          <p className="text-slate-200">{brief.headline}</p>

          <div className="grid grid-cols-3 gap-2">
            <Pressure label="Illegal dumps" value={brief.pressure.illegalDumps} />
            <Pressure label="Compliance" value={brief.pressure.collectionCompliance} />
            <Pressure label="Short-let risk" value={brief.pressure.shortLetRisk} />
          </div>

          <div>
            <p className="text-xs uppercase text-slate-500 mb-1">Collection today</p>
            <p className="text-sm text-slate-300">{brief.collectionToday.join(" · ")}</p>
          </div>

          <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1">
            {brief.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <div>
            <p className="text-xs uppercase text-slate-500 mb-2">Actions</p>
            <ul className="space-y-2">
              {brief.actions.map((a) => (
                <li
                  key={a.title}
                  className="rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-line)] px-3 py-2 text-sm"
                >
                  <span className="font-mono text-amber-300 text-xs uppercase mr-2">
                    {a.priority}
                  </span>
                  <span className="text-white">{a.title}</span>
                  <span className="text-slate-500"> — {a.owner}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </div>
  );
}

function Pressure({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[var(--color-panel-2)] p-3 text-center">
      <p className="text-[10px] uppercase text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-white tabular-nums">{value}</p>
    </div>
  );
}
