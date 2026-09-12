export type LocalityProfile = {
  name: string;
  headline: string;
  pressure: {
    illegalDumps: number;
    collectionCompliance: number;
    shortLetRisk: number;
  };
  bullets: string[];
  collectionToday: string[];
  map: { x: number; y: number };
  dispatchRank: number;
  tonnesPerDay: number;
};

export const localityProfiles: LocalityProfile[] = [
  {
    name: "St Paul's Bay",
    headline: "Qawra strand frontage needs a pre-weekend sweep before white-bag day.",
    pressure: { illegalDumps: 72, collectionCompliance: 58, shortLetRisk: 81 },
    bullets: [
      "~7 t/day cleansing corridor with Qawra.",
      "Short-let turnovers cluster Wed/Fri — watch black bags on organic days.",
    ],
    collectionToday: ["White bag (organic)", "Grey/green (recyclables bring-in)"],
    map: { x: 62, y: 28 },
    dispatchRank: 2,
    tonnesPerDay: 7.2,
  },
  {
    name: "Sliema",
    headline: "Strand black-bag presentations after short-let changeovers.",
    pressure: { illegalDumps: 65, collectionCompliance: 52, shortLetRisk: 88 },
    bullets: [
      "~7 t/day with Swieqi; Triq ix-Xatt is the pressure line.",
      "Wednesday changeovers drive torn sacks on non-black days.",
    ],
    collectionToday: ["Black bag (residual)"],
    map: { x: 48, y: 52 },
    dispatchRank: 1,
    tonnesPerDay: 7.4,
  },
  {
    name: "Swieqi",
    headline: "Hotspot where PAYT identity is weakest.",
    pressure: { illegalDumps: 68, collectionCompliance: 61, shortLetRisk: 76 },
    bullets: ["Underground-bin pilot site flagged.", "Confirm Saturday exceptions on wastecollection.mt."],
    collectionToday: ["White bag (organic)"],
    map: { x: 52, y: 44 },
    dispatchRank: 3,
    tonnesPerDay: 4.1,
  },
  {
    name: "Valletta",
    headline: "Narrow streets — evening restaurant waste drives SLA risk.",
    pressure: { illegalDumps: 54, collectionCompliance: 71, shortLetRisk: 42 },
    bullets: ["Fixed national day pattern via regional contractor."],
    collectionToday: ["Black bag (residual)"],
    map: { x: 55, y: 58 },
    dispatchRank: 4,
    tonnesPerDay: 5.8,
  },
];

export const nationalStats = {
  totalTonnes: 353_525,
  landfilledPct: 79,
  cleansingTonnesPerDay: 45,
};

export function streetsRanking() {
  return [...localityProfiles]
    .sort((a, b) => a.dispatchRank - b.dispatchRank)
    .map((p, i) => ({
      rank: i + 1,
      locality: p.name,
      tonnesPerDay: p.tonnesPerDay,
      pressure: p.pressure.illegalDumps,
    }));
}
