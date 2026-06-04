/**
 * NearGo OMS Component Library — Barrel Export
 *
 * All components enforce design system constraints via TypeScript types.
 * Import from "@/components/ui" for full type safety.
 */

// Foundation
export { Button, buttonVariants }        from "./button";
export type { ButtonProps }              from "./button";

export { Badge, badgeVariants }          from "./badge";
export type { BadgeProps }               from "./badge";

export { Alert, alertVariants }          from "./alert";
export type { AlertProps }               from "./alert";

export { Input }                         from "./input";
export type { InputProps }               from "./input";

export { Textarea }                      from "./textarea";
export type { TextareaProps }            from "./textarea";

export { Label }                         from "./label";
export type { LabelProps }               from "./label";

// Layout
export { Card, CardHeader, CardTitle, CardBody, CardFooter } from "./card";
export type { CardProps }                from "./card";

// Status & Feedback
export { StatusIndicator }               from "./status-indicator";
export type { StatusIndicatorProps }     from "./status-indicator";

export { Skeleton }                      from "./skeleton";
export type { SkeletonProps }            from "./skeleton";

export { Progress }                      from "./progress";
export type { ProgressProps }            from "./progress";

export { Separator }                     from "./separator";
export type { SeparatorProps }           from "./separator";

export { Switch }                        from "./switch";
export type { SwitchProps }              from "./switch";

export { Avatar }                        from "./avatar";
export type { AvatarProps }              from "./avatar";

// States
export { EmptyState, LoadingState }        from "./empty-state";
export type { EmptyStateProps, LoadingStateProps } from "./empty-state";

// Composite
export { FormField, FormGrid, FormSection, FormActions } from "./form-field";
export type { FormFieldProps }                           from "./form-field";

// Overlays
export { Dialog, ConfirmDialog }   from "./dialog";
export type { DialogProps, ConfirmDialogProps } from "./dialog";

export { ToastProvider, useToast } from "./toast";
export type { ToastItem }          from "./toast";

// Inputs
export { Select }                  from "./select";
export type { SelectProps, SelectOption } from "./select";

// Navigation
export { Tabs }                    from "./tabs";
export type { Tab, TabsProps }     from "./tabs";

// Data Display
export {
  Table, TableHeader, TableBody, TableFooter,
  TableRow, TableHead, TableCell, TableCaption, TableEmpty,
} from "./table";

// Menus & Overlays
export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub,
  DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuItem, DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from "./dropdown-menu";

export {
  AlertDialog, AlertDialogTrigger, AlertDialogPortal, AlertDialogOverlay,
  AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction,
  AlertDialogCancel, ConfirmActionDialog,
} from "./alert-dialog";

export {
  Sheet, SheetTrigger, SheetClose, SheetContent,
  SheetHeader, SheetTitle, SheetDescription, SheetBody,
  SheetFooter, ContextPanel,
} from "./sheet";

export {
  Popover, PopoverTrigger, PopoverContent,
  PopoverAnchor, PopoverClose,
} from "./popover";

export {
  Tooltip, TooltipTrigger, TooltipContent,
  TooltipProvider, SimpleTooltip,
} from "./tooltip";

// Form Inputs
export { Checkbox, CheckboxField }    from "./checkbox";
export {
  RadioGroup, RadioGroupItem,
  RadioGroupField, DecisionGroup,
} from "./radio-group";

// Search & Command
export {
  Command, CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
  CommandSeparator, CommandShortcut,
} from "./command";

// Utility
export { ScrollArea, ScrollBar }      from "./scroll-area";
export {
  Collapsible, CollapsibleTrigger,
  CollapsibleContent, AccordionSection,
} from "./collapsible";

// App Shell & Navigation
export {
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarItem, SidebarSubGroup, SidebarSubItem,
  SidebarProvider, AppShell, useSidebar,
} from "./sidebar";
export type { SidebarProps, SidebarGroupProps, SidebarItemProps, SidebarSubGroupProps, SidebarSubItemProps, AppShellProps } from "./sidebar";

export { Breadcrumb, PageBreadcrumb } from "./breadcrumb";
export type { BreadcrumbItem, BreadcrumbProps, PageBreadcrumbProps } from "./breadcrumb";

// Form (react-hook-form integration)
export {
  Form, FormField, FormItem, FormLabel,
  FormControl, FormDescription, FormMessage,
  useFormField,
} from "./form";

// Date & Time Inputs
export { Calendar }                    from "./calendar";
export type { CalendarProps }          from "./calendar";

export { DatePicker }                  from "./date-picker";
export type { DatePickerProps }        from "./date-picker";

export {
  DateRangePicker, DateRangePickerWithPresets,
  DATE_RANGE_PRESETS,
} from "./date-range-picker";
export type { DateRangePickerProps, DateRange } from "./date-range-picker";

// Advanced Inputs
export { Combobox, GroupedCombobox }   from "./combobox";
export type { ComboboxProps, ComboboxOption, GroupedComboboxProps, ComboboxGroupOption } from "./combobox";

export { MultiSelect }                 from "./multi-select";
export type { MultiSelectProps, MultiSelectOption } from "./multi-select";

export { FileUpload }                  from "./file-upload";
export type { FileUploadProps, FileUploadItem } from "./file-upload";

// Pagination
export { Pagination, PageNav }         from "./pagination";
export type { PaginationProps, PageNavProps } from "./pagination";

// Data Display
export { Timeline }                                                 from "./timeline";
export type { TimelineProps, TimelineItem, TimelineStatus }         from "./timeline";

export { Steps }                                                    from "./steps";
export type { StepsProps, StepItem }                                from "./steps";

export { KpiCard, KpiGrid }            from "./kpi-card";
export type { KpiCardProps, KpiGridProps, KpiTrend, KpiColor } from "./kpi-card";

// List Page Utilities
export { FilterBar, ListToolbar }      from "./filter-bar";
export type { FilterBarProps, FilterChip, ListToolbarProps } from "./filter-bar";

export { LoadingOverlay, Spinner, PageLoader } from "./loading-overlay";
export type { LoadingOverlayProps, SpinnerProps } from "./loading-overlay";

// Data Table Composite
export { DataTable }                   from "./data-table";
export { DataTableColumnHeader }       from "./data-table/column-header";
export { DataTableFacetedFilter }      from "./data-table/faceted-filter";
export { DataTablePagination }         from "./data-table/pagination";
export { DataTableToolbar }            from "./data-table/toolbar";
export { DataTableBulkActions }        from "./data-table/bulk-actions";
export type { DataTableProps }         from "./data-table";
export type { DataTableColumnHeaderProps } from "./data-table/column-header";
export type { DataTableFacetedFilterProps, FacetedFilterOption } from "./data-table/faceted-filter";
export type { DataTablePaginationProps } from "./data-table/pagination";
export type { DataTableToolbarProps }  from "./data-table/toolbar";
export type { DataTableBulkActionsProps, BulkAction } from "./data-table/bulk-actions";
