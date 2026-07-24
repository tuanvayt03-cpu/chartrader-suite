# SignalOps MT5 — UI/UX Consolidation Plan

This is a large, single-pass frontend consolidation. I will keep the current SignalOps visual identity (blue accent, clean white cards, typography, spacing) and extend it. No backend behavior, no fake success states.

## Approach

Build in layers so every route stays coherent as I go. Reuse existing shadcn components, Recharts, and Embla (already in the stack). All strings via `src/lib/i18n.tsx`. All persistence via `localStorage` under a `signalops:*` namespace.

## Global shell (foundation)

- **Collapsible sidebar** (`src/components/sidebar.tsx`, `app-shell.tsx`): expanded 264–280px / collapsed 68–76px rail. Persist `signalops:sidebar`. Tooltips in collapsed mode. Mobile stays as overlay drawer. Reduced-motion respected.
- **Navigation IA rewrite** — Primary: Dashboard, Accounts, Signals, Open Positions, Order History. Operations: Signal Sources, Risk Management, Telegram. Intelligence: Hermes. System: Runtime, Processing Inbox, Trace. Remove standalone Analytics & Settings.
- **Account scope switcher** (new `account-scope.tsx`) replacing the fake account card. All / pinned / per-account with search. Compact popover in collapsed rail. State in URL `?account=` + localStorage. Never auto-switches.
- **Header** (`dashboard-header.tsx` refactor): title, description, runtime health chip (Healthy/Degraded/Input required/Blocked/Stale/Unavailable → default `Unavailable — not connected`), last-updated, language switch, notifications button, **Privacy Mode toggle**, Export menu, Share Report menu. Remove withdrawal, avatar, fake latency, fake MT5-linked, fake user email.
- **Privacy Mode** (`src/lib/privacy.tsx` context + `<Sensitive>` wrapper): masks balances, P&L, volumes, logins, tickets, chat IDs, endpoints. Persisted. Export/Share inherit + explicit "Hide sensitive info" toggle; unmasked export requires confirm dialog.
- **i18n cleanup**: add all new keys (VI + EN), sweep hard-coded strings from every touched component.

## Dashboard

- Top controls: account scope, time range (Today/Yesterday/7d/30d/90d/MTD/YTD/Custom, URL-synced), refresh, last-updated, Export, Share.
- **KPI row** (4 cards): Trading P&L, Total Income (with breakdown popover: Trading, Backcom, Cashback, Rebate, Partner, Other — deposits excluded), Active Exposure (open/pending/floating/margin), Signal Execution Rate (eligible/executed/blocked/failed/rate). No "Conversion Rate".
- **Analytics carousel** (Embla, replace current impl): 3 slides — Balance & Equity, P&L Over Time, Trade Activity Heatmap. Draggable via mouse/touch/pad. Scrubber with click + draggable indicator + keyboard. Auto-slide 10s with Play/Pause, pauses on hover/drag/focus/tab hidden, 20s cooldown after manual, respects reduced motion. Persist auto-slide pref and current slide.
- **Trade Activity Heatmap**: X=dates, Y=hours. Colors green/red/gray only, dot size = order count. Rich tooltip. Click → Order History with filters.
- **Risk Today** card: replaces the two oversized cards. Only shows configured limits with progress bars. Click → Risk Management.
- **Source Performance top-5** table on dashboard: Source, Win Rate, Net P&L, Today, Net Pips, Total Orders. Sort + View all + status badges. Archived excluded.

## Signal Sources (`/sources`)

Tabs: **Active / Performance / Archive**.
- Active: current table, plus lifecycle badges (Active/Disabled/Draining/Archived), Verify, Archive actions. Disable is visual-only state change with "requires backend" note on the action confirmation — no fake success toast for runtime operations.
- Performance: full metrics table with filters (date, account, source state, symbol, include disabled/archived).
- Archive: view history / Restore / Export / Permanently delete (strong confirm dialog explaining what remains).
- Remove fake enable/import/delete success — replace toasts with neutral "Saved locally — backend not connected" language OR remove toast where operation is runtime-only.

## Accounts (`/accounts`) — replace ComingSoon

Tabs Active/Archived. Table + card view. Add Account wizard (Terminal → Read-only identity check → Preview → Alias → Native currency review → Confirm) with clear "Not connected" states. Pin default, Archive/Restore/Permanent delete flows.

## Signals (`/signals`) — replace ComingSoon

Filters + table with drawer detail (source, received, symbol, direction, entry/SL/TP, pip distances, parser result, normalized, dedupe, risk decision, execution gate, destination accounts, reason, correlation ID). Actions: view original, open trace, copy correlation ID, view related orders.

## Open Positions (`/positions`) — replace ComingSoon

Table with account/source/symbol/side/entry/current/SL/TP/volume/floating P&L USD/pips/open time/ticket/correlation. Filters + refresh + open signal/trace + export snapshot. No close buttons.

## Order History (`/orders`) — replace ComingSoon

Bounded date filters (default 7d), page size 25/50/100, pagination. Full filter set + column set as spec. Export CSV/JSON. Immutable.

## Risk Management (`/risk`) — replace ComingSoon

Effective policy view, sizing inputs, usage/drawdown/margin, active limits. Edit draft → Preview impact → Compare → Apply (confirm w/ "requires backend adapter"). Version history + restore-as-new-version.

## Telegram (new `/telegram`)

State machine UI for all listed states. API ID/Hash local save (never re-echo). Send code / OTP / 2FA flow UI. Reconnect / Revoke / Read-only test. No send-message test.

## Runtime (new `/runtime`) with Providers embedded

Tabs: Overview / Components / Providers / Versions & Updates / Logs. Components show Panel API, Core, Bridge, Worker, Telegram clients, MT5 terminals, DB — all as "Not connected / Data unavailable" placeholders. Providers list + Add Provider wizard + safe cutover switch dialog + Archive lifecycle.

## Hermes (new `/hermes`) — top-level

Tabs: Overview / Accounts & Activation / Source Performance / Decisions & Recommendations / Learning Data / Policies & Versions / Trace.

## Processing Inbox (new `/inbox`)

Item type list with filters, detail view, provide-input flows, re-run read-only check, open trace, export evidence. No fake "Mark resolved" for machine blockers.

## Trace (new `/trace`)

Read-only timeline: Telegram → Parser → Normalized → Dedupe → Risk → Sizing → Execution gate → Broker result → Position → Final P&L. Search by correlation ID / account / source / signal / order / component / date. Export JSON/CSV.

## Cross-cutting

- Remove ComingSoonPage from all production routes.
- Remove withdrawal button, Daniel Sullivan, ops@signalops.io, $50k Evl., account 9999042, fake status/latency/MT5-linked, hard-coded healthy runtime.
- Every button either navigates, opens a real dialog/drawer/popover, changes a filter/pref, OR shows a "backend not connected" state. No dead handlers.
- Pip helpers: XAUUSD family = ×10; other symbols pass through via metadata hook stub.
- Monetary display: USD as-is, USC ÷ 100 for aggregate USD reporting; native shown in details.

## Technical notes

- New: `src/lib/privacy.tsx`, `src/lib/account-scope.tsx`, `src/lib/prefs.ts` (localStorage helpers), `src/lib/pip.ts`, `src/lib/money.ts`.
- Refactor: `sidebar.tsx`, `app-shell.tsx`, `dashboard-header.tsx`, `analytics-carousel.tsx` (Embla + scrubber + autoplay), `revenue-over-time-slide.tsx` → `trade-activity-heatmap.tsx`, dashboard route, all previously-ComingSoon routes replaced with real pages.
- New components under `src/components/{accounts,signals,positions,orders,risk,telegram,runtime,hermes,inbox,trace}/`.
- i18n dictionary expanded with all new keys, VI + EN.
- No new deps; use existing Embla, Recharts, shadcn.

## Out of scope

Backend adapters, broker/MT5/Telegram runtime, order sending, real health polling, real auth. Any operational action shows "requires backend" affordance instead of fake success.

## Deliverable

One coherent Panel UI across every listed route. At the end: files changed, routes completed, components added/removed, remaining UI-only limitations, and build/typecheck results.
