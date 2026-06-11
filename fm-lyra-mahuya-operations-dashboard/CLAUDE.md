# Feedback Intelligence — Operations Dashboard

> **Owner:** Advait Patil (advait.patil@nice.com)  
> **Product:** NiCE CXone · Feedback Intelligence  
> **Initiative:** CXFM-2 — MVP target v2.1.0, August 2026

Full project spec → `docs/INSTRUCTIONS.md`

---

## This project

React 19 + TypeScript + Vite + Tailwind v4. **Active codebase** for the Operations Dashboard.

```bash
npm install
npm run dev   # starts at localhost:5173
```

## Key files

```
src/pages/SurveyCampaignMonitoringPage.tsx   ← Operations Dashboard (main work)
src/components/layout/AppShell.tsx           ← Shell, sidebar, topbar
src/components/layout/SidebarPanel.tsx       ← Collapsible left nav
design-system/css/                           ← Lyra CSS tokens
docs/INSTRUCTIONS.md                         ← Full spec + Lyra rules
```

## What's been built

- **AppShell** — Topbar + collapsible sidebar + white pane on grey canvas (`rgb(243, 245, 246)`)
- **KPI row** — 4 cards: Active Campaigns · Avg Response Rate · Total Responses · Avg CSAT
  - Each card: 3px accent bar + large metric + sparkline (cubic bezier, gradient fill, glow dot) + delta badge
  - KPI accent colours: `['#185ba4', '#0e7490', '#7c3aed', '#0f766e']`
- **Filter bar** — Status · Channel · Date range · Search
- **Campaign table** — Status pills · Response rate progress bar · Row click → detail panel
- **Campaign detail panel** — Slides in from right with per-campaign metrics

### Critical shell fix
`AppShell.tsx` `<main>` must be `flex flex-col` + `background: rgb(243, 245, 246)`.  
Without `flex-col`, children's `flex-1` doesn't fill height → white gap below table.

---

## Design system — Lyra Foundations V1

**Never use hardcoded hex/rgba.** Use CSS custom properties only.

| Token | Value | Use |
|---|---|---|
| `--color-bg-surface-canvas` | `rgb(243, 245, 246)` | App shell background |
| `--color-bg-surface-base` | `#ffffff` | Cards / panes |
| `--color-bg-primary` | `--lyra-brand-600` | Primary button |
| `--color-fg-default` | `rgba(0,0,0,0.80)` | Primary text |
| `--color-fg-secondary` | `rgba(0,0,0,0.64)` | Muted text |
| `--color-fg-disabled` | `rgba(0,0,0,0.36)` | Disabled |
| `--color-border-subtle` | `rgba(0,0,0,0.10)` | Dividers |
| `--color-border-soft` | `rgba(0,0,0,0.16)` | Card borders |

**Typography:** Inter only · 400 / 500 / 600 · Default body: `14px/24px/400`  
**Spacing:** 4px base unit (`--space-1`=4px … `--space-16`=64px)  
**Radius:** `--radius-sm`=6px · `--radius-md`=8px · `--radius-lg`=12px · `--radius-xl`=16px

### VU Score colours
- 76–100 High → `--lyra-green-500`
- 50–75 Medium → `--lyra-orange-500`
- 0–49 Low → `--lyra-red-500`

---

## Figma files

| File | Key |
|---|---|
| Lyra Foundations V1 | `qyCq4jUOrpYcpHhpNCdgA5` |
| FI Understanding / UX designs | `QEkgewFhKC66vlF8uwzNPT` |
| Concepts (Operations Dashboard) | `pH9UhI6hH8goWwoE8Fes3C` |

Lyra library key: `lk-0e299d4975a9508371724884ae85eed14bfe69a7c4a32debe25165f76d97b8d19044fa7c016e811edfc48253e9fcdabc443bf29c00434d4f8b5f292b4da09db3`

---

## External links

| Resource | URL |
|---|---|
| Confluence | https://nice-ce-cxone-prod.atlassian.net/wiki/spaces/CXFI/overview |
| Jira | https://nice-ce-cxone-prod.atlassian.net/jira/software/c/projects/CXFI/issues |
| GitHub | https://github.com/Advait-UX/MVP-Feedback-Intelligence--30th-May.git |
