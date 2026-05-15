/**
 * NearGo OMS — Accessibility Guidelines
 *
 * All interactive components MUST follow these patterns.
 * Based on WAI-ARIA 1.2 + WCAG 2.1 AA.
 */

// ── Focus Ring ───────────────────────────────────────────────
/**
 * Focus Ring Rules:
 *   - Never remove focus outline without replacement
 *   - Use CSS variable --focus-ring (0 0 0 2px var(--gray-4))
 *   - Error state: --focus-ring-error (0 0 0 2px var(--red-border))
 *   - Brand context: --focus-ring-brand (0 0 0 2px var(--amber-3))
 *   - Always use :focus-visible (not :focus) to avoid mouse click rings
 */
export const FOCUS_STYLES = {
  default: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)]",
  error:   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red-border)]",
  brand:   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amber-3)]",
} as const;

// ── ARIA Patterns by Component ───────────────────────────────
export const ARIA_PATTERNS = {
  /**
   * Button
   * - icon-only: must have aria-label
   * - loading: aria-disabled="true" + aria-busy="true"
   * - destructive: no extra aria needed, but must require confirmation
   */
  button: {
    iconOnly:    { "aria-label": "描述操作，如：关闭" },
    loading:     { "aria-disabled": "true", "aria-busy": "true" },
    disabled:    { "aria-disabled": "true" },
  },

  /**
   * Dialog / Modal
   * - Must trap focus inside while open
   * - First focusable element receives focus on open
   * - Esc key must close
   */
  dialog: {
    overlay:  { role: "dialog", "aria-modal": "true", "aria-labelledby": "dialog-title" },
    title:    { id: "dialog-title" },
    desc:     { id: "dialog-desc", "aria-describedby": "dialog-desc" },
  },

  /**
   * Alert / Toast
   * - alert role announces immediately
   * - status role for non-urgent updates
   */
  alert: {
    urgent:   { role: "alert" },          // announces immediately (errors)
    polite:   { role: "status" },         // waits for idle (success, info)
    liveArea: { "aria-live": "polite", "aria-atomic": "true" },  // toast container
  },

  /**
   * Table
   * - Always provide caption or aria-label
   * - Sortable headers: aria-sort
   * - Row selection: aria-selected on <tr>
   */
  table: {
    wrapper:      { role: "region", "aria-label": "表格名称" },
    sortAsc:      { "aria-sort": "ascending" },
    sortDesc:     { "aria-sort": "descending" },
    sortNone:     { "aria-sort": "none" },
    selectedRow:  { "aria-selected": "true" },
  },

  /**
   * Select / Combobox
   */
  select: {
    trigger:  { role: "combobox", "aria-haspopup": "listbox", "aria-expanded": "false" },
    listbox:  { role: "listbox" },
    option:   { role: "option" },
  },

  /**
   * Tabs
   */
  tabs: {
    list:  { role: "tablist" },
    tab:   { role: "tab", "aria-selected": "false", "aria-controls": "panel-id" },
    panel: { role: "tabpanel", id: "panel-id", "aria-labelledby": "tab-id" },
  },

  /**
   * Navigation
   */
  nav: {
    sidebar: { role: "navigation", "aria-label": "主导航" },
    breadcrumb: { "aria-label": "面包屑导航" },
  },

  /**
   * KPI Card
   * When the card value is a meaningful metric, provide full context.
   * Screen readers announce only text content — large numbers without
   * labels are meaningless.
   */
  kpiCard: {
    /** Use aria-label on the card root to provide full context */
    example: {
      "aria-label": "待审批工单：2 个，较昨日新增 1 个",
    },
    /** Or use visually-hidden text next to the number */
    visuallyHiddenLabel: "使用 sr-only class 提供屏幕阅读器描述",
  },

  /**
   * Status Indicator
   * Never use color alone — always include text label.
   * Use aria-label to provide full status context.
   */
  status: {
    example: { "aria-label": "状态：待 L1 初审" },
  },

  /**
   * Charts / Data Visualization
   * Provide a data table alternative or aria-label summary.
   */
  chart: {
    wrapper: { role: "img", "aria-label": "折线图：过去 30 天订单量趋势，峰值 1,234 单（6 月 15 日）" },
    table:   "同时提供一个 visually-hidden 的数据表格作为备选",
  },
} as const;

// ── Keyboard Interaction Map ─────────────────────────────────
export const KEYBOARD_MAP = {
  button:    ["Enter / Space — 触发操作"],
  input:     ["Tab — 进入，Enter — 提交最近表单"],
  select:    ["↑↓ — 导航选项", "Enter — 选中", "Esc — 关闭"],
  dialog:    ["Esc — 关闭", "Tab/Shift+Tab — 在弹层内循环焦点"],
  tabs:      ["← → — 切换 tab", "Enter/Space — 选中"],
  table:     ["Tab — 跳至下一单元格", "Enter — 打开行详情"],
  dropdown:  ["↑↓ — 导航", "Enter — 执行", "Esc — 关闭"],
  combobox:  ["↑↓ — 导航选项", "Enter — 选中", "Esc — 关闭", "字符 — 过滤"],
  dateInput: ["↑↓ — 日期增减", "Enter — 确认", "Esc — 取消"],
} as const;

// ── Screen reader (sr-only) utility ─────────────────────────
/**
 * Tailwind class for visually-hidden but screen-reader accessible text.
 * Use this instead of aria-label when label text is long.
 *
 * @example
 * <span>2</span>
 * <span className={SR_ONLY}>个待审批工单</span>
 */
export const SR_ONLY =
  "absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 whitespace-nowrap border-0" as const;

// ── Color contrast requirements (WCAG AA) ───────────────────
/**
 * Contrast ratios — all token combinations below are pre-verified:
 *
 * ✅  gray-12 on white     ≈ 16.0:1  (Lc 93)
 * ✅  gray-11 on white     ≈  7.8:1  (Lc 72)
 * ✅  gray-9  on white     ≈  4.6:1  (Lc 55) — minimum for large text
 * ✅  amber-11 on white    ≈  4.7:1  (Lc 56) — promotional text
 * ✅  green-text on white  ≈  5.2:1  (Lc 61)
 * ✅  red-text on white    ≈  5.8:1  (Lc 65)
 * ✅  blue-text on white   ≈  5.4:1  (Lc 62)
 * ✅  orange-text on white ≈  4.8:1  (Lc 57)
 * ✅  purple-text on white ≈  5.0:1  (Lc 59)
 *
 * ⚠️  gray-8 on white      ≈  2.9:1  — do NOT use for regular text
 *     (only for decorative borders, disabled state icons)
 *
 * WCAG AA requires: 4.5:1 for normal text, 3:1 for large text (18px+/bold 14px+)
 */
export const CONTRAST_NOTES = {
  minNormalText:  4.5,
  minLargeText:   3.0,
  minUIComponent: 3.0,
} as const;
