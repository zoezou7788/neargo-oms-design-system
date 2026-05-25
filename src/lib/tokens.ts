/**
 * NearGo OMS — Design Tokens (TypeScript)
 *
 * Single source of truth for all allowed type values.
 * Import these types in components to get compile-time
 * enforcement of the design system.
 *
 * @example
 *   import type { ButtonVariant } from "@/lib/tokens"
 */

// ── Color scale steps (read-only tuple) ─────────────────────
export const AMBER_STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export const GRAY_STEPS  = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type AmberStep = (typeof AMBER_STEPS)[number];
export type GrayStep  = (typeof GRAY_STEPS)[number];

/** Returns the CSS variable string for an amber step */
export const amber = (step: AmberStep) => `var(--amber-${step})` as const;
/** Returns the CSS variable string for a gray step */
export const gray  = (step: GrayStep)  => `var(--gray-${step})`  as const;

// ── Semantic color roles ─────────────────────────────────────
export const SEMANTIC_SCALES = ["green", "red", "blue", "orange", "purple"] as const;
export type SemanticScale = (typeof SEMANTIC_SCALES)[number];
export type SemanticVariant = "bg" | "border" | "solid" | "text";

// ── Component variant types ──────────────────────────────────

/** Primary/Secondary/Positive/Danger/Ghost/Brand */
export const BUTTON_VARIANTS = [
  "primary",    // gray-12 — all key workflow actions
  "secondary",  // white + border — cancel, back
  "positive",   // green-solid — approve, confirm
  "danger",     // red-solid — reject, delete (requires confirmation)
  "ghost",      // transparent blue — detail links, view-all
  "brand",      // amber-9 — promotional CTAs only (≤1 per screen)
] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

/** Badge entity types — registered variants only */
export const BADGE_VARIANTS = [
  "kyc",     // KYC individual — cyan
  "kyb",     // KYB enterprise — blue
  "store",   // store / channel — purple
  "urgent",  // priority urgent — red
  "normal",  // priority normal — gray
  "low",     // priority low   — amber (tint, not solid)
  "brand",   // promotional    — amber-9 solid (≤1 per screen)
] as const;
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

/** Approval / workflow statuses — dot + text */
export const STATUS_TYPES = [
  "approved",    // green
  "rejected",    // red
  "pending-l1",  // orange  — awaiting first review
  "pending-l2",  // blue    — awaiting second review
  "returned",    // purple  — returned for revision
  "in-progress", // orange  — generic in-progress
  "cancelled",   // gray    — cancelled
] as const;
export type StatusType = (typeof STATUS_TYPES)[number];

/** Alert / Toast variants */
export const ALERT_VARIANTS = ["info", "success", "warning", "danger"] as const;
export type AlertVariant = (typeof ALERT_VARIANTS)[number];

/** Avatar sizes */
export const AVATAR_SIZES = ["xs", "sm", "md", "lg"] as const;
export type AvatarSize = (typeof AVATAR_SIZES)[number];

// ── Status color map ─────────────────────────────────────────
export const STATUS_COLORS: Record<StatusType, { dot: string; text: string }> = {
  "approved":    { dot: "var(--green-solid)",  text: "var(--green-text)" },
  "rejected":    { dot: "var(--red-solid)",    text: "var(--red-text)" },
  "pending-l1":  { dot: "var(--orange-solid)", text: "var(--orange-text)" },
  "pending-l2":  { dot: "var(--blue-solid)",   text: "var(--blue-text)" },
  "returned":    { dot: "var(--purple-solid)", text: "var(--purple-text)" },
  "in-progress": { dot: "var(--orange-solid)", text: "var(--orange-text)" },
  "cancelled":   { dot: "var(--gray-8)",       text: "var(--text-low)" },
};

// ── Status labels (Chinese default) ─────────────────────────
export const STATUS_LABELS: Record<StatusType, string> = {
  "approved":    "已通过",
  "rejected":    "已拒绝",
  "pending-l1":  "待 L1 初审",
  "pending-l2":  "待 L2 复审",
  "returned":    "打回修改",
  "in-progress": "进行中",
  "cancelled":   "已取消",
};

// ── z-index scale ────────────────────────────────────────────
export const Z = {
  base:     "var(--z-base)",
  raised:   "var(--z-raised)",
  dropdown: "var(--z-dropdown)",
  sticky:   "var(--z-sticky)",
  overlay:  "var(--z-overlay)",
  modal:    "var(--z-modal)",
  popover:  "var(--z-popover)",
  toast:    "var(--z-toast)",
  tooltip:  "var(--z-tooltip)",
} as const;
