import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/responsive";

/**
 * useMediaQuery — returns true when the viewport matches.
 *
 * @example
 *   const isIconOnly = useMediaQuery("(max-width: 1279px)");
 *   const isMd = useBreakpoint("md"); // < 1024px
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/** Returns true if viewport is BELOW the given breakpoint */
export function useBreakpoint(bp: keyof typeof BREAKPOINTS): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS[bp] - 1}px)`);
}

/** Returns true if viewport is AT OR ABOVE the given breakpoint */
export function useMinBreakpoint(bp: keyof typeof BREAKPOINTS): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[bp]}px)`);
}

/** Returns current sidebar mode */
export function useSidebarMode(): "full" | "compact" | "icon" {
  const isIconOnly = useMediaQuery(`(max-width: ${BREAKPOINTS.lg - 1}px)`);
  const isCompact  = useMediaQuery(`(max-width: ${BREAKPOINTS.xl - 1}px)`);
  if (isIconOnly) return "icon";
  if (isCompact)  return "compact";
  return "full";
}
