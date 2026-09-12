import type { ReactNode } from "react";
import { useState } from "react";
import { localityProfiles } from "../data/localities";

type Classification = {
  id: string;
  stream: string;
  cause: string;
  severity: "low" | "medium" | "high";
  route: string;
  summary: string;
  loggedAt: string;
};

export function ReportPage() {
  const [locality, setLocality] = useState("Sliema");
  const [street, setStreet] = useState("Triq ix-Xatt");
  const [notes, setNotes] = useState(
    "Twelve torn black bags from a short-let changeover on a Wednesday",
  );
  const [result, setResult] = useState<Classification | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locality, street, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Classification failed");
        return;
      }
      setResult(data as Classification);
    } catch {
      setError("Could not reach Nadif API. Run npm run dev.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Report — classify & log</h2>
        <p className="text-slate-400 text-sm mt-1">
          Field reports land as stream, cause, and severity for the operations desk.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[var(--color-line)] bg-[var(--color-panel)] p-4">
        <Field label="Locality">
          <select
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-line)] px-3 py-2"
          >
            {localityProfiles.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Street">
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-line)] px-3 py-2"
          />
        </Field>
        <Field label="Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-[var(--color-panel-2)] border border-[var(--color-line)] px-3 py-2"
          />
        </Field>
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-medium px-4 py-2 disabled:opacity-50"
        >
          {loading ? "Classifying…" : "Classify and log"}
        </button>
      </form>

      {error && (
        <p className="text-rose-300 text-sm">{error}</p>
      )}

      {result && (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
          <p className="font-mono text-xs text-emerald-300">{result.id}</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Meta label="Stream" value={result.stream} />
            <Meta label="Cause" value={result.cause} />
            <Meta label="Severity" value={result.severity} highlight />
            <Meta label="Route" value={result.route} />
          </div>
          <p className="text-slate-300 text-sm">{result.summary}</p>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function Meta({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-slate-500 text-xs uppercase">{label}</p>
      <p className={highlight ? "text-amber-300 font-medium capitalize" : "text-white"}>{value}</p>
    </div>
  );
}
