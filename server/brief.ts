import { localityProfiles } from "./localities.js";

export type BriefAction = {
  title: string;
  owner: string;
  priority: "now" | "today" | "watch";
};

export type MorningBrief = {
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

export function buildBrief(locality: string): MorningBrief {
  const profile =
    localityProfiles.find(
      (p) => p.name.toLowerCase() === locality.toLowerCase(),
    ) ?? localityProfiles[0];

  return {
    locality: profile.name,
    title: `Morning brief — ${profile.name}`,
    generatedAt: new Date().toISOString(),
    pressure: profile.pressure,
    headline: profile.headline,
    bullets: profile.bullets,
    actions: profile.actions,
    collectionToday: profile.collectionToday,
  };
}
