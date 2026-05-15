/**
 * NearGo OMS — Motion Tokens
 *
 * Import these constants for consistent animation values across all components.
 * Every animation MUST use values from this file — no hardcoded ms values.
 *
 * @example
 *   import { DURATION, EASE } from "@/lib/motion"
 *   style={{ transition: `opacity ${DURATION.normal} ${EASE.out}` }}
 */

// ── Durations ────────────────────────────────────────────────
export const DURATION = {
  instant:  "0ms",
  fast:     "100ms",   // hover, focus ring
  normal:   "150ms",   // ★ DEFAULT
  moderate: "200ms",   // dropdown open, tab switch
  slow:     "250ms",   // accordion, card expand
  enter:    "200ms",   // enter animations
  exit:     "150ms",   // exit animations (always < enter)
  page:     "300ms",   // page-level transitions
} as const;

export type DurationKey = keyof typeof DURATION;

// ── Easings ──────────────────────────────────────────────────
export const EASE = {
  linear:  "linear",
  out:     "cubic-bezier(0.0,  0.0,  0.2, 1.0)",  // enter viewport
  in:      "cubic-bezier(0.4,  0.0,  1.0, 1.0)",  // leave viewport
  inout:   "cubic-bezier(0.4,  0.0,  0.2, 1.0)",  // continuous movement
  spring:  "cubic-bezier(0.34, 1.56, 0.64, 1.0)", // switch, badge pop
  bounce:  "cubic-bezier(0.36, 0.07, 0.19, 0.97)",// toast notification
  gentle:  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",// dialog open
} as const;

export type EasingKey = keyof typeof EASE;

// ── Semantic shortcuts ───────────────────────────────────────
export const TRANSITION = {
  /** Hover/focus color changes */
  micro:   `color ${DURATION.fast} ${EASE.out}, background ${DURATION.fast} ${EASE.out}, border-color ${DURATION.fast} ${EASE.out}`,
  /** Default interactive element transitions */
  default: `all ${DURATION.normal} ${EASE.out}`,
  /** Layout shifts, panel open/close */
  layout:  `all ${DURATION.slow} ${EASE.inout}`,
} as const;

// ── Z-index layer system ─────────────────────────────────────
/**
 * Z-Index Scale — NEVER use arbitrary values like z-[9999]
 *
 * Stacking order (lowest → highest):
 *   base → raised → dropdown → sticky → overlay → modal → popover → toast → tooltip
 */
export const Z = {
  base:     0,    // normal document flow
  raised:   10,   // active table row, hover card elevation
  dropdown: 100,  // Select options, DropdownMenu, Combobox panel
  sticky:   200,  // sticky table header, topbar, fixed sidebar
  overlay:  300,  // modal backdrop / dimmer
  modal:    400,  // Dialog, Drawer content
  popover:  500,  // Popover, date-picker panel
  toast:    600,  // Toast notifications
  tooltip:  700,  // Tooltip (must pierce modals)
} as const;

export type ZKey = keyof typeof Z;

// ── Keyframe definitions (for CSS-in-JS use) ────────────────
export const KEYFRAMES = {
  fadeIn: {
    from: { opacity: 0, transform: "scale(0.97)" },
    to:   { opacity: 1, transform: "scale(1)" },
  },
  slideInRight: {
    from: { opacity: 0, transform: "translateX(16px)" },
    to:   { opacity: 1, transform: "translateX(0)" },
  },
  slideInBottom: {
    from: { opacity: 0, transform: "translateY(8px)" },
    to:   { opacity: 1, transform: "translateY(0)" },
  },
  shimmer: {
    "0%":   { backgroundPosition: "-400px 0" },
    "100%": { backgroundPosition:  "400px 0" },
  },
} as const;

// ── Motion preset per component ──────────────────────────────
export const MOTION_PRESET = {
  dialog:  { enter: `${DURATION.enter} ${EASE.gentle}`,   exit: `${DURATION.exit} ${EASE.in}` },
  drawer:  { enter: `${DURATION.moderate} ${EASE.out}`,   exit: `${DURATION.exit} ${EASE.in}` },
  toast:   { enter: `${DURATION.enter} ${EASE.bounce}`,   exit: `${DURATION.exit} ${EASE.in}` },
  dropdown:{ enter: `${DURATION.fast} ${EASE.out}`,       exit: `${DURATION.fast} ${EASE.in}` },
  switch:  { track: `background ${DURATION.normal} ${EASE.out}`, thumb: `transform ${DURATION.normal} ${EASE.spring}` },
  badge:   { enter: `transform ${DURATION.fast} ${EASE.spring}` },
  tab:     { indicator: `all ${DURATION.normal} ${EASE.inout}` },
} as const;
