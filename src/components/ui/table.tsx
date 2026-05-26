import * as React from "react";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// Table — data table primitives following NearGo OMS tokens.
//
// Design System Rules:
//   - Container: border border-[var(--border-subtle)], rounded-r4 (no shadow)
//   - Header bg: var(--gray-2), text: 12px uppercase tracking-[0.04em] var(--text-mid)
//   - Row dividers: border-b border-[var(--border-subtle)] (#F3F4F6)
//   - Row hover: hover:bg-[var(--gray-2)]
//   - Cell text: 13px var(--text-hi)
//   - overflow-x-auto wrapper for horizontal scroll
// ─────────────────────────────────────────────────────────────

// ── Table root ───────────────────────────────────────────────
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remove the outer border+shadow container (e.g. when nested inside a Card) */
  unstyled?: boolean;
}

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className, children, unstyled = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        !unstyled && [
          "rounded-r4 border border-[var(--border-subtle)]",
          "bg-[var(--surface)] overflow-hidden",
        ],
        className
      )}
      {...props}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {children}
        </table>
      </div>
    </div>
  )
);
Table.displayName = "Table";

// ── TableHeader ──────────────────────────────────────────────
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-[var(--gray-2)]", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

// ── TableBody ────────────────────────────────────────────────
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-[var(--border-subtle)]", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

// ── TableFooter ──────────────────────────────────────────────
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "bg-[var(--gray-2)] border-t border-[var(--border-subtle)]",
      "text-[var(--text-mid)] text-[13px]",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

// ── TableRow ─────────────────────────────────────────────────
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Highlight the row (e.g. selected state) */
  selected?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, ...props }, ref) => (
    <tr
      ref={ref}
      aria-selected={selected || undefined}
      className={cn(
        "border-b border-[var(--border-subtle)] last:border-0",
        "transition-colors duration-fast",
        "hover:bg-[var(--gray-2)]",
        selected && "bg-[var(--blue-bg)]",
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = "TableRow";

// ── TableHead ────────────────────────────────────────────────
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Make the column sortable — pass current sort direction or undefined */
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | undefined;
  onSort?: () => void;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-3 align-middle",
        "text-[12px] font-medium uppercase tracking-[0.04em] text-[var(--text-mid)]",
        "whitespace-nowrap",
        sortable && "cursor-pointer select-none hover:text-[var(--text-hi)]",
        className
      )}
      onClick={sortable ? onSort : undefined}
      aria-sort={
        sortable
          ? sortDirection === "asc"
            ? "ascending"
            : sortDirection === "desc"
            ? "descending"
            : "none"
          : undefined
      }
      {...props}
    >
      {sortable ? (
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="text-[var(--text-low)]" aria-hidden="true">
            {sortDirection === "asc"
              ? "↑"
              : sortDirection === "desc"
              ? "↓"
              : "↕"}
          </span>
        </span>
      ) : (
        children
      )}
    </th>
  )
);
TableHead.displayName = "TableHead";

// ── TableCell ────────────────────────────────────────────────
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Visually muted secondary text */
  muted?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, muted, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        "px-3 py-2.5 align-middle text-[13px]",
        muted ? "text-[var(--text-low)]" : "text-[var(--text-hi)]",
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

// ── TableCaption ─────────────────────────────────────────────
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-3 px-3 pb-3 text-[12px] text-[var(--text-low)] text-left",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// ── TableEmpty ───────────────────────────────────────────────
/** Full-width empty state row — drop inside <TableBody> when data is empty. */
export interface TableEmptyProps {
  colSpan: number;
  message?: string;
  className?: string;
}

const TableEmpty: React.FC<TableEmptyProps> = ({
  colSpan,
  message = "暂无数据",
  className,
}) => (
  <tr>
    <td
      colSpan={colSpan}
      className={cn(
        "py-10 text-center text-[13px] text-[var(--text-low)]",
        className
      )}
    >
      {message}
    </td>
  </tr>
);
TableEmpty.displayName = "TableEmpty";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
};
