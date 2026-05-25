import * as React from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterChip {
  key: string;
  label: string;
  value: string;
  onRemove?: () => void;
}

export interface FilterBarProps {
  filters: FilterChip[];
  onClearAll?: () => void;
  onOpenFilters?: () => void;
  activeCount?: number;
  className?: string;
  children?: React.ReactNode;
}

export function FilterBar({
  filters,
  onClearAll,
  onOpenFilters,
  activeCount,
  className,
  children,
}: FilterBarProps) {
  if (filters.length === 0 && !children) return null;

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {onOpenFilters && (
        <button
          onClick={onOpenFilters}
          className={cn(
            "inline-flex items-center gap-1.5 h-7 px-3 rounded-[9999px] text-[12px] font-medium",
            "border transition-colors shrink-0",
            activeCount
              ? "border-[#1F1D1C] bg-[var(--gray-12)] text-white"
              : "border-[var(--border)] text-[var(--gray-11)] hover:border-[var(--gray-7)] hover:text-[var(--gray-12)]",
          )}
        >
          <SlidersHorizontal size={12} />
          筛选
          {activeCount != null && activeCount > 0 && (
            <span className={cn(
              "ml-0.5 w-4 h-4 rounded-[9999px] flex items-center justify-center text-[10px] font-bold",
              "bg-white text-[#1F1D1C]",
            )}>
              {activeCount}
            </span>
          )}
        </button>
      )}

      {filters.map(chip => (
        <FilterChipBadge key={chip.key} chip={chip} />
      ))}

      {children}

      {filters.length > 1 && onClearAll && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1 h-7 px-3 rounded-[9999px] text-[12px] text-[var(--gray-10)] hover:text-[var(--gray-12)] border border-transparent hover:border-[var(--border)] transition-colors shrink-0"
        >
          <X size={11} />
          清除全部
        </button>
      )}
    </div>
  );
}

function FilterChipBadge({ chip }: { chip: FilterChip }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-7 pl-3 pr-2 rounded-[9999px] bg-[var(--gray-2)] border border-[var(--border)] text-[12px] font-medium text-[var(--gray-12)]">
      <span className="text-[var(--gray-9)]">{chip.label}:</span>
      {chip.value}
      {chip.onRemove && (
        <button
          onClick={chip.onRemove}
          className="flex items-center justify-center w-4 h-4 rounded-[9999px] hover:bg-[var(--gray-4)] text-[var(--gray-9)] hover:text-[var(--gray-12)] transition-colors"
          aria-label={`移除 ${chip.label} 筛选`}
        >
          <X size={10} />
        </button>
      )}
    </span>
  );
}

// Toolbar that combines filter bar + right-side slot (e.g., export button)
export interface ListToolbarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  filters?: FilterChip[];
  onClearAll?: () => void;
  className?: string;
}
export function ListToolbar({ left, right, filters = [], onClearAll, className }: ListToolbarProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 min-w-0">{left}</div>
        {right && <div className="flex items-center gap-2 shrink-0">{right}</div>}
      </div>
      {filters.length > 0 && (
        <FilterBar filters={filters} onClearAll={onClearAll} />
      )}
    </div>
  );
}
