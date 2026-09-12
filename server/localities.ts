import type { BriefAction } from "./brief.js";

type Profile = {
  name: string;
  headline: string;
  pressure: {
    illegalDumps: number;
    collectionCompliance: number;
    shortLetRisk: number;
  };
  bullets: string[];
  actions: BriefAction[];
  collectionToday: string[];
  map: { x: number; y: number };
  dispatchRank: number;
  tonnesPerDay: number;
};

export const localityProfiles: Profile[] = [
  {
    name: "St Paul's Bay",
    headline: "Qawra strand frontage needs a pre-weekend sweep before white-bag day.",
    pressure: { illegalDumps: 72, collectionCompliance: 58, shortLetRisk: 81 },
    bullets: [
      "~7 t/day cleansing corridor with Qawra.",
      "Short-let turnovers cluster Wed/Fri — watch black bags on organic days.",
      "ERA linked two skip IDs to pavement piles last week.",
    ],
    actions: [
      {
        title: "Priority sweep Triq il-Korp tal-Pijunieri",
        owner: "Cleansing dispatch",
        priority: "now",
      },
      {
        title: "SMS block to licensed short-let agents",
        owner: "Local council",
        priority: "today",
      },
    ],
    collectionToday: ["White bag (organic)", "Grey/green (recyclables bring-in)"],
    map: { x: 62, y: 28 },
    dispatchRank: 2,
    tonnesPerDay: 7.2,
  },
  {
    name: "Sliema",
    headline: "Strand black-bag presentations after short-let changeovers — not a truck problem.",
    pressure: { illegalDumps: 65, collectionCompliance: 52, shortLetRisk: 88 },
    bullets: [
      "~7 t/day with Swieqi; dense frontage on Triq ix-Xatt.",
      "Wednesday changeovers drive torn sacks on non-black days.",
      "Underground-bin pilot site flagged at Swieqi hotspot.",
    ],
    actions: [
      {
        title: "Door-card push to seafront short-lets",
        owner: "Sort desk",
        priority: "now",
      },
      {
        title: "Camera pass on recycling bring-in window",
        owner: "Regional council",
        priority: "watch",
      },
    ],
    collectionToday: ["Black bag (residual)", "No organic collection"],
    map: { x: 48, y: 52 },
    dispatchRank: 1,
    tonnesPerDay: 7.4,
  },
  {
    name: "Swieqi",
    headline: "Hotspot pressure where PAYT identity is weakest.",
    pressure: { illegalDumps: 68, collectionCompliance: 61, shortLetRisk: 76 },
    bullets: [
      "Feeds Sliema cleansing corridor.",
      "Ten underground-bin sites in planning — one local hotspot identified.",
      "Saturday exceptions on national timetable — confirm wastecollection.mt.",
    ],
    actions: [
      {
        title: "Fob/QR pilot outreach to managed blocks",
        owner: "Wasteserv liaison",
        priority: "today",
      },
    ],
    collectionToday: ["White bag (organic)"],
    map: { x: 52, y: 44 },
    dispatchRank: 3,
    tonnesPerDay: 4.1,
  },
  {
    name: "Valletta",
    headline: "Narrow streets — cleansing SLA sensitive to evening restaurant waste.",
    pressure: { illegalDumps: 54, collectionCompliance: 71, shortLetRisk: 42 },
    bullets: [
      "Regional council round; contractor on fixed national day pattern.",
      "ERA inspections focus on commercial presentation hours.",
    ],
    actions: [
      {
        title: "Evening trade-waste spot check",
        owner: "ERA",
        priority: "watch",
      },
    ],
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
