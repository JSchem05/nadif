# Nadif — Malta waste desk

Situation room and AI operations desk for Malta waste management: national stats, locality map, streets dispatch ranking, resident sort guide, field report classification, and locality morning briefs.

Built for councils, cleansing, ERA, and Wasteserv coordination — demo data only.

## Run locally

```bash
npm install
npm run dev
```

- App: http://127.0.0.1:43141
- API: http://127.0.0.1:43142

## Routes

| Path | Purpose |
|------|---------|
| `/` | National situation + locality cards |
| `/streets` | Map + dispatch ranking |
| `/report` | Classify field reports (stream / cause / severity) |
| `/sort` | Door-card sorting guide |
| `/briefing` | Morning brief per locality |

## Stack

React, Vite, Tailwind CSS v4, Express API (classification + brief generation).
