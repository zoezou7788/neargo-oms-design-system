"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Base RadioGroup
// ---------------------------------------------------------------------------

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("grid gap-2.5", className)}
    {...props}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "size-[18px] shrink-0 rounded-full border border-[var(--gray-7)]",
      "hover:border-[var(--gray-8)]",
      "data-[state=checked]:bg-[var(--gray-12)] data-[state=checked]:border-[var(--gray-12)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-colors",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <CircleIcon
        size={8}
        className="fill-current text-white stroke-none"
      />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

// ---------------------------------------------------------------------------
// RadioGroupField — vertical list with label + optional description
// ---------------------------------------------------------------------------

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioGroupFieldProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const RadioGroupField = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupFieldProps
>(({ options, value, onChange, name, disabled, className }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    value={value}
    onValueChange={onChange}
    name={name}
    disabled={disabled}
    className={cn("flex flex-col gap-2", className)}
  >
    {options.map((opt) => {
      const isSelected = opt.value === value;
      return (
        <label
          key={opt.value}
          className={cn(
            "flex items-start gap-3 rounded-r3 border px-3 py-2.5 cursor-pointer select-none transition-colors",
            isSelected
              ? "bg-[var(--gray-2)] border-[var(--gray-6)]"
              : "bg-transparent border-transparent hover:bg-[var(--gray-2)]",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <RadioGroupItem
            value={opt.value}
            disabled={disabled}
            className="mt-0.5"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] font-medium leading-[18px] text-[var(--text-hi)]">
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-[12px] leading-[16px] text-[var(--text-low)]">
                {opt.description}
              </span>
            )}
          </div>
        </label>
      );
    })}
  </RadioGroupPrimitive.Root>
));
RadioGroupField.displayName = "RadioGroupField";

// ---------------------------------------------------------------------------
// DecisionGroup — approve / reject / neutral decision variant
// ---------------------------------------------------------------------------

export interface DecisionOption {
  value: string;
  label: string;
  description?: string;
  type: "positive" | "danger" | "neutral";
  icon?: React.ReactNode;
}

export interface DecisionGroupProps {
  options: DecisionOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
}

const decisionStyles: Record<
  DecisionOption["type"],
  { selected: string; hover: string; indicator: string }
> = {
  positive: {
    selected:
      "bg-[var(--green-bg)] border-[var(--green-solid)]",
    hover: "hover:bg-[var(--green-bg)]/60",
    indicator:
      "data-[state=checked]:bg-[var(--green-solid)] data-[state=checked]:border-[var(--green-solid)]",
  },
  danger: {
    selected:
      "bg-[var(--red-bg)] border-[var(--red-solid)]",
    hover: "hover:bg-[var(--red-bg)]/60",
    indicator:
      "data-[state=checked]:bg-[var(--red-solid)] data-[state=checked]:border-[var(--red-solid)]",
  },
  neutral: {
    selected:
      "bg-[var(--gray-2)] border-[var(--gray-6)]",
    hover: "hover:bg-[var(--gray-2)]",
    indicator:
      "data-[state=checked]:bg-[var(--gray-12)] data-[state=checked]:border-[var(--gray-12)]",
  },
};

const DecisionGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  DecisionGroupProps
>(({ options, value, onChange, name, disabled, className }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    value={value}
    onValueChange={onChange}
    name={name}
    disabled={disabled}
    className={cn("flex flex-col gap-2", className)}
  >
    {options.map((opt) => {
      const isSelected = opt.value === value;
      const styles = decisionStyles[opt.type];

      return (
        <label
          key={opt.value}
          className={cn(
            "flex items-start gap-3 rounded-r3 border px-3 py-2.5 cursor-pointer select-none transition-colors",
            isSelected
              ? styles.selected
              : cn("border-transparent", styles.hover),
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {opt.icon && (
            <span className="mt-0.5 shrink-0 text-[var(--text-mid)]">
              {opt.icon}
            </span>
          )}
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[13px] font-medium leading-[18px] text-[var(--text-hi)]">
              {opt.label}
            </span>
            {opt.description && (
              <span className="text-[12px] leading-[16px] text-[var(--text-low)]">
                {opt.description}
              </span>
            )}
          </div>
          <RadioGroupPrimitive.Item
            value={opt.value}
            disabled={disabled}
            className={cn(
              "mt-0.5 size-[18px] shrink-0 rounded-full border border-[var(--gray-7)]",
              "hover:border-[var(--gray-8)]",
              styles.indicator,
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gray-4)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-colors",
            )}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <CircleIcon size={8} className="fill-current text-white stroke-none" />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
        </label>
      );
    })}
  </RadioGroupPrimitive.Root>
));
DecisionGroup.displayName = "DecisionGroup";

export { RadioGroup, RadioGroupItem, RadioGroupField, DecisionGroup };
