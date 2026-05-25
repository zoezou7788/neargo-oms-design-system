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
