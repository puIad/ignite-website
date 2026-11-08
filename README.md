# Ignite Algiers 2025 website

Event website for **Ignite Algiers 2025**.

## What it does

- Ticket purchase, with payment and transaction result pages
- Visitor sign-in through a magic link
- Barcode scanning for check-in (`/scan-barcode`)
- Speaker voting (`/vote`) with a live scoreboard (`/speakers-scoreboard`); the voting phases are in [VOTING.md](VOTING.md)
- Admin area under `/admin`

## Stack

React, Vite, TypeScript, [TanStack Router](https://tanstack.com/router) (file-based), [Convex](https://convex.dev) backend, Tailwind CSS, Zustand, Valibot, ZXing and Quagga2 for scanning. Deployable as a single-page app on Vercel or Cloudflare (`vercel.json`, `wrangler.json`).

## Run it

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm test       # Vitest
pnpm deploy     # build, then wrangler deploy
```

Configuration comes from `VITE_API_URL`, `VITE_WEBSITE_URL` and `VITE_CONVEX_URL`.

## Layout

| Path | What |
|---|---|
| `src/routes` | pages: `buy-ticket`, `scan-barcode`, `vote`, `speakers-scoreboard`, `admin`, payment results |
| `convex` | backend: `schema.ts`, `speakers.ts`, `visitors.ts`, `voting.ts` |
