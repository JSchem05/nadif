export type Classification = {
  id: string;
  stream: string;
  cause: string;
  severity: "low" | "medium" | "high";
  route: string;
  summary: string;
  loggedAt: string;
};

export function classifyReport(input: {
  locality: string;
  street: string;
  notes: string;
}): Classification {
  const text = `${input.street} ${input.notes}`.toLowerCase();
  const wednesday = /wednesday|wed\b/.test(text);
  const shortLet = /short-let|changeover|airbnb|rental/.test(text);
  const blackBag = /black bag|nappy|nappies|wipe|takeaway/.test(text);
  const organic = /food|peel|leftover|white bag/.test(text);
  const illegal = /illegal|dump|pile|torn/.test(text);
  const recycling = /paper|plastic|grey|green bag|bring-in/.test(text);

  let stream = "Mixed residual";
  let cause = "Unclear presentation on street";
  let severity: Classification["severity"] = "medium";
  let route = "Cleansing desk → contractor round";

  if (shortLet && wednesday) {
    stream = "Residual (black bag)";
    cause = "Short-let changeover on wrong collection day";
    severity = "high";
    route = "Local council liaison → cleansing priority sweep";
  } else if (illegal || /twelve|12/.test(text)) {
    stream = "Illegal dumping";
    cause = "Unauthorised pile / torn sacks";
    severity = "high";
    route = "ERA case + cleansing dispatch within 24h";
  } else if (organic) {
    stream = "Organic (white bag)";
    cause = "Food waste presented outside white-bag window";
    severity = "medium";
    route = "Resident education → next white-bag day";
  } else if (blackBag) {
    stream = "Residual (black bag)";
    cause = "Residual stream contamination risk";
    severity = "medium";
    route = "Sort desk follow-up";
  } else if (recycling) {
    stream = "Recyclables (grey/green)";
    cause = "Bring-in or bag-day mismatch";
    severity = "low";
    route = "Regional bring-in centre guidance";
  }

  const summary = `${input.locality} — ${input.street}: ${cause}. Route as ${stream}.`;

  return {
    id: `RPT-${Date.now().toString(36).toUpperCase()}`,
    stream,
    cause,
    severity,
    route,
    summary,
    loggedAt: new Date().toISOString(),
  };
}
