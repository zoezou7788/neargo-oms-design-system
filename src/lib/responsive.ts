/**
 * NearGo OMS — Responsive Strategy
 *
 * OMS targets desktop-first (1440px base). Minimum supported: 1024px.
 * Mobile is NOT required for internal back-office systems.
 */

// ── Breakpoints ──────────────────────────────────────────────
export const BREAKPOINTS = {
  /** Icon-only sidebar (64px). Content area expands. */
  md: 1024,
  /** Compact sidebar (200px). Nav labels visible. */
  lg: 1280,
  /** Full design baseline (232px sidebar, 1100px content max-width). */
  xl: 1440,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// ── Sidebar behavior at each breakpoint ─────────────────────
/**
 * Sidebar Collapse Behavior
 *
 * ≥ 1440px  — Full sidebar (232px): all labels, groups, search, footer
 * 1280–1439 — Compact sidebar (200px): all labels, smaller padding
 * 1024–1279 — Icon-only sidebar (64px): only icons + tooltip on hover
 * < 1024px  — Static warning banner; layout does NOT adapt
 *
 * RULE: Never use media queries to hide content that is critical for
 *       workflow — icon-only mode must show item tooltips on hover.
 */
export const SIDEBAR_WIDTHS: Record<string, string> = {
  full:    "232px",  // xl+
  compact: "200px",  // lg
  icon:    "64px",   // md
} as const;

// ── Content area behavior ────────────────────────────────────
/**
 * Content Area Rules:
 *
 * - Default padding: 24px (space-5)
 * - Dashboard mode padding: 28–32px (space-5 to space-6)
 * - Max inner content width: 1100px (centered with margin: 0 auto)
 * - Right panel (detail/context): 320–400px fixed
 *
 * At lg (1280px):
 *   Content area = 1280 - 200 (sidebar) = 1080px available
 *   With 24px padding each side: ~1032px usable
 *
 * At md (1024px):
 *   Content area = 1024 - 64 (icon sidebar) = 960px available
 *   Right context panel may need to close by default at this size
 */
export const CONTENT_CONFIG = {
  paddingDefault:   24,   // px
  paddingDashboard: 32,   // px
  maxWidth:         1100, // px
  rightPanelWidth:  360,  // px (default)
  rightPanelMin:    320,  // px (minimum)
} as const;

// ── Media query helpers ──────────────────────────────────────
/** Returns a CSS min-width media query string */
export const minWidth = (bp: Breakpoint) =>
  `@media (min-width: ${BREAKPOINTS[bp]}px)` as const;

/** Returns a CSS max-width media query string */
export const maxWidth = (bp: Breakpoint) =>
  `@media (max-width: ${BREAKPOINTS[bp] - 1}px)` as const;

/** Returns a CSS between media query string */
export const between = (min: Breakpoint, max: Breakpoint) =>
  `@media (min-width: ${BREAKPOINTS[min]}px) and (max-width: ${BREAKPOINTS[max] - 1}px)` as const;

// ── Column grid recommendations ──────────────────────────────
/**
 * Grid column counts by breakpoint and page type:
 *
 * KPI Cards row:
 *   xl (1440+): 4 columns
 *   lg (1280+): 4 columns (slightly narrower cards)
 *   md (1024+): 2 columns
 *
 * Secondary card row:
 *   xl: 3–4 columns
 *   lg: 3 columns
 *   md: 2 columns
 *
 * Two-column bottom section (main | activity):
 *   xl+lg: 1.5fr : 1fr (≈60% / 40%)
 *   md:    100% stacked (activity section below main)
 */
export const GRID_COLS = {
  kpi: {
    xl: 4,
    lg: 4,
    md: 2,
  },
  cards: {
    xl: 4,
    lg: 3,
    md: 2,
  },
} as const;
