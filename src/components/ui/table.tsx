/**
 * @component Table / TableHeader / TableBody / TableRow / TableHead / TableCell / TableEmpty
 * @description 数据表格原语 — 提供 Table 结构的基础 HTML 语义组件，通常与 DataTable 配合使用。
 *
 * @when-to-use
 *   ✅ 搭配 DataTable（index.tsx）使用 — DataTable 已将这些原语组合好
 *   ✅ 需要自定义特殊表格布局时直接使用原语
 *   ❌ 有排序/多选/分页需求 → 直接用 DataTable，不要手动组合
 *
 * @composition
 *   Table         — 外层容器（border + rounded，overflow-hidden）
 *   ├── TableHeader  — <thead>
 *   │   └── TableRow → TableHead（列标题，uppercase 12px，gray-2 背景）
 *   ├── TableBody    — <tbody>
 *   │   └── TableRow → TableCell（数据行，hover:bg-gray-2）
 *   └── TableEmpty   — 空状态占位（colspan 撑满）
 *
 * @props（Table）
 *   unstyled  boolean  移除外层 border+shadow（嵌套在 Card 内时使用，默认 false）
 *
 * @example 直接使用原语（简单静态表格）
 * ```tsx
 * import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
 *
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>订单号</TableHead>
 *       <TableHead>金额</TableHead>
 *       <TableHead>状态</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     {orders.map(order => (
 *       <TableRow key={order.id}>
 *         <TableCell className="font-mono">{order.id}</TableCell>
 *         <TableCell>¥{order.amount}</TableCell>
 *         <TableCell><StatusIndicator status={order.status} /></TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 *
 * @example 嵌套在 Card 内（去除双重边框）
 * ```tsx
 * <Card padding="none">
 *   <Table unstyled>
 *     ...
 *   </Table>
 * </Card>
 * ```
 */
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
