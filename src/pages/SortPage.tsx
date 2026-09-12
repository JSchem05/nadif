import { useState } from "react";

const bags = [
  {
    id: "white",
    name: "White bag",
    days: "Mon / Wed / Fri",
    items: "Food, peels, leftovers, flowers",
    color: "bg-slate-100 text-slate-900",
  },
  {
    id: "black",
    name: "Black bag",
    days: "Tue / Sat",
    items: "Nappies, wipes, dirty takeaway, twigs, the rest",
    color: "bg-zinc-800 text-white",
  },
  {
    id: "grey",
    name: "Grey or green",
    days: "Thursday (+ bring-in centres)",
    items: "Clean paper, plastic, metal — not pizza grease",
    color: "bg-emerald-900/80 text-emerald-50",
  },
];

const examples = [
  {
    id: "pizza",
    title: "Pizza box",
    detail: "Grease-stained cardboard → black bag. Clean lid only → grey/green if dry.",
  },
  {
    id: "fridge",
    title: "Old fridge",
    detail: "Not a bag item — Wasteserv bring-in / bulky collection. Never street-side.",
  },
];

export function SortPage() {
  const [activeExample, setActiveExample] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <h2 className="text-2xl font-semibold text-white">Sort — door card</h2>
        <p className="text-slate-400 text-sm mt-1">
          Resident-facing guidance tied to the national six-day pattern (wastecollection.mt).
        </p>
        <div className="mt-4 space-y-3">
          {bags.map((bag) => (
            <div
              key={bag.id}
              className={`rounded-2xl p-4 border border-[var(--color-line)] ${bag.color}`}
            >
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-semibold">{bag.name}</h3>
                <span className="text-xs font-mono opacity-80">{bag.days}</span>
              </div>
              <p className="text-sm mt-2 opacity-90">{bag.items}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-dashed border-amber-400/40 bg-[var(--color-panel)] p-6 shadow-xl">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-300">Door card</p>
        <h3 className="text-xl font-semibold text-white mt-2">What goes out today?</h3>
        <p className="text-sm text-slate-400 mt-2">
          Tap a tricky item — short-lets on the strand get this wrong most often.
        </p>
        <div className="mt-4 grid gap-2">
          {examples.map((ex) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActiveExample(ex.id)}
              className={`text-left rounded-xl px-3 py-2 border transition-colors ${
                activeExample === ex.id
                  ? "border-sky-400 bg-sky-500/10"
                  : "border-[var(--color-line)] hover:bg-white/5"
              }`}
            >
              <span className="font-medium text-white">{ex.title}</span>
            </button>
          ))}
        </div>
        {activeExample && (
          <p className="mt-4 text-sm text-slate-200 bg-black/20 rounded-lg p-3">
            {examples.find((e) => e.id === activeExample)?.detail}
          </p>
        )}
      </div>
    </div>
  );
}
