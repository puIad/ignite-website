# AGENTS.md

Vite + React SPA with TanStack Router (file-based, `src/routes`) and a Convex backend (`convex/`). See `README.md`.

- Package manager: pnpm. `pnpm install`, `pnpm dev` (port 3000), `pnpm build`, `pnpm test` (Vitest), `pnpm deploy` (build, then `wrangler deploy`).
- Pages: `buy-ticket`, `scan-barcode`, `vote`, `speakers-scoreboard`, `visitor-signin.$magicToken`, `admin`.
- `VOTING.md` lists the voting phases (not started, soon, on, ended).
- Configuration comes from `VITE_API_URL`, `VITE_WEBSITE_URL` and `VITE_CONVEX_URL`. Do not commit real values or any key material.
