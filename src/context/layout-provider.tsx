"use client";

import * as React from "react";
import type { CollapsibleMode, SidebarVariant, LayoutSettings } from "@/components/layout/types";

const STORAGE_KEY = "neargo-oms-layout";

const DEFAULTS = {
  collapsible: "icon" as CollapsibleMode,
  variant:     "sidebar" as SidebarVariant,
};

const LayoutContext = React.createContext<LayoutSettings | null>(null);

function readStorage(): { collapsible: CollapsibleMode; variant: SidebarVariant } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      collapsible: parsed.collapsible ?? DEFAULTS.collapsible,
      variant:     parsed.variant     ?? DEFAULTS.variant,
    };
  } catch {
    return DEFAULTS;
  }
}

function writeStorage(settings: { collapsible: CollapsibleMode; variant: SidebarVariant }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch { /* SSR / private browsing */ }
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [collapsible, setCollapsibleState] = React.useState<CollapsibleMode>(DEFAULTS.collapsible);
  const [variant, setVariantState]         = React.useState<SidebarVariant>(DEFAULTS.variant);
  const [hydrated, setHydrated]            = React.useState(false);

  // Hydrate from localStorage on mount (avoids SSR mismatch)
  React.useEffect(() => {
    const saved = readStorage();
    setCollapsibleState(saved.collapsible);
    setVariantState(saved.variant);
    setHydrated(true);
  }, []);

  const setCollapsible = React.useCallback((mode: CollapsibleMode) => {
    setCollapsibleState(mode);
    writeStorage({ collapsible: mode, variant });
  }, [variant]);

  const setVariant = React.useCallback((v: SidebarVariant) => {
    setVariantState(v);
    writeStorage({ collapsible, variant: v });
  }, [collapsible]);

  const resetLayout = React.useCallback(() => {
    setCollapsibleState(DEFAULTS.collapsible);
    setVariantState(DEFAULTS.variant);
    writeStorage(DEFAULTS);
  }, []);

  const value: LayoutSettings = React.useMemo(() => ({
    collapsible,
    variant,
    defaultCollapsible: DEFAULTS.collapsible,
    defaultVariant:     DEFAULTS.variant,
    setCollapsible,
    setVariant,
    resetLayout,
  }), [collapsible, variant, setCollapsible, setVariant, resetLayout]);

  // Don't render children until hydration to avoid flash
  if (!hydrated) return null;

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayout(): LayoutSettings {
  const ctx = React.useContext(LayoutContext);
  if (!ctx) throw new Error("useLayout must be used inside <LayoutProvider>");
  return ctx;
}
