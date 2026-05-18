import type { Config } from "tailwindcss";

/**
 * NearGo OMS Tailwind Config v3.0
 *
 * ⚠️  RULE: Never add raw hex values here.
 *     All colors reference CSS variables from globals.css.
 *     This ensures a single source of truth.
 */
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      // ── Colors (all reference CSS variables) ───────────────
      colors: {
        // Amber / Brand scale
        "amber-1":  "var(--amber-1)",
        "amber-2":  "var(--amber-2)",
        "amber-3":  "var(--amber-3)",
        "amber-4":  "var(--amber-4)",
        "amber-5":  "var(--amber-5)",
        "amber-6":  "var(--amber-6)",
        "amber-7":  "var(--amber-7)",
        "amber-8":  "var(--amber-8)",
        "amber-9":  "var(--amber-9)",   // ★ Brand #FFA902
        "amber-10": "var(--amber-10)",
        "amber-11": "var(--amber-11)",
        "amber-12": "var(--amber-12)",

        // Gray / Primary scale
        "gray-1":  "var(--gray-1)",
        "gray-2":  "var(--gray-2)",
        "gray-3":  "var(--gray-3)",
        "gray-4":  "var(--gray-4)",
        "gray-5":  "var(--gray-5)",
        "gray-6":  "var(--gray-6)",
        "gray-7":  "var(--gray-7)",
        "gray-8":  "var(--gray-8)",
        "gray-9":  "var(--gray-9)",
        "gray-10": "var(--gray-10)",
        "gray-11": "var(--gray-11)",
        "gray-12": "var(--gray-12)",    // ★ Primary #1F1D1C

        // Semantic
        "green-bg":     "var(--green-bg)",
        "green-border": "var(--green-border)",
        "green-solid":  "var(--green-solid)",
        "green-text":   "var(--green-text)",
        "red-bg":       "var(--red-bg)",
        "red-border":   "var(--red-border)",
        "red-solid":    "var(--red-solid)",
        "red-text":     "var(--red-text)",
        "blue-bg":      "var(--blue-bg)",
        "blue-border":  "var(--blue-border)",
        "blue-solid":   "var(--blue-solid)",
        "blue-text":    "var(--blue-text)",
        "orange-bg":    "var(--orange-bg)",
        "orange-border":"var(--orange-border)",
        "orange-solid": "var(--orange-solid)",
        "orange-text":  "var(--orange-text)",
        "purple-bg":    "var(--purple-bg)",
        "purple-border":"var(--purple-border)",
        "purple-solid": "var(--purple-solid)",
        "purple-text":  "var(--purple-text)",

        // Semantic aliases
        bg:             "var(--bg)",
        "bg-subtle":    "var(--bg-subtle)",
        surface:        "var(--surface)",
        border:         "var(--border)",
        "border-strong":"var(--border-strong)",
        "text-hi":      "var(--text-hi)",
        "text-mid":     "var(--text-mid)",
        "text-low":     "var(--text-low)",
        "text-disabled":"var(--text-disabled)",
        brand:          "var(--brand)",
        "brand-bg":     "var(--brand-bg)",
        "brand-text":   "var(--brand-text)",
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        micro:    ["12px", { lineHeight: "1",   letterSpacing: "0.04em" }],
        caption:  ["12px", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        sm:       ["13px", { lineHeight: "1.5" }],
        base:     ["14px", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        md:       ["16px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        lg:       ["20px", { lineHeight: "1.3", letterSpacing: "-0.03em" }],
        xl:       ["26px", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        display:  ["36px", { lineHeight: "1.0", letterSpacing: "-0.05em" }],
      },

      // ── 24-Column Grid System ─────────────────────────────
      gridTemplateColumns: {
        // 24-col system: repeat(24, 1fr)
        "24": "repeat(24, minmax(0, 1fr))",
        // Common inner grids
        "2":  "repeat(2, minmax(0, 1fr))",
        "3":  "repeat(3, minmax(0, 1fr))",
        "4":  "repeat(4, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-24": "span 24 / span 24",
        "span-18": "span 18 / span 18",
        "span-17": "span 17 / span 17",
        "span-16": "span 16 / span 16",
        "span-14": "span 14 / span 14",
        "span-12": "span 12 / span 12",
        "span-10": "span 10 / span 10",
        "span-8":  "span 8 / span 8",
        "span-7":  "span 7 / span 7",
        "span-6":  "span 6 / span 6",
        "span-4":  "span 4 / span 4",
        "span-3":  "span 3 / span 3",
      },
      gap: {
        gutter:    "var(--gutter)",
        "gutter-lg": "var(--gutter-lg)",
      },

      // ── Spacing (4px grid) ─────────────────────────────────
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "24px",
        "6": "32px",
        "7": "40px",
        "8": "48px",
        "9": "64px",
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        "r1":   "var(--radius-1)",   // 3px  — checkbox
        "r2":   "var(--radius-2)",   // 4px  — badge, tag
        "r3":   "var(--radius-3)",   // 6px  — button, input
        "r4":   "var(--radius-4)",   // 8px  — card (default)
        "r5":   "var(--radius-5)",   // 12px — dialog
        "full": "var(--radius-6)",   // pill
      },

      // ── Shadows ────────────────────────────────────────────
      boxShadow: {
        "sh1": "var(--shadow-1)",
        "sh2": "var(--shadow-2)",
        "sh3": "var(--shadow-3)",
        "sh4": "var(--shadow-4)",
        "sh5": "var(--shadow-5)",
        "sh6": "var(--shadow-6)",
      },

      // ── Transitions ────────────────────────────────────────
      transitionDuration: {
        fast:   "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow:   "var(--duration-slow)",
      },
      transitionTimingFunction: {
        "ease-out":    "var(--ease-out)",
        "ease-in":     "var(--ease-in)",
        "ease-inout":  "var(--ease-inout)",
        "ease-spring": "var(--ease-spring)",
      },

      // ── z-index ────────────────────────────────────────────
      zIndex: {
        base:     "0",
        raised:   "10",
        dropdown: "100",
        sticky:   "200",
        overlay:  "300",
        modal:    "400",
        popover:  "500",
        toast:    "600",
        tooltip:  "700",
      },
    },
  },
  plugins: [],
};

export default config;
