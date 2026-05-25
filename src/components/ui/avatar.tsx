import * as React from "react";
import { cn } from "@/lib/utils";
import type { AvatarSize } from "@/lib/tokens";

const sizeMap: Record<AvatarSize, { wrapper: string; text: string }> = {
  xs: { wrapper: "h-5 w-5",  text: "text-[8px]" },
  sm: { wrapper: "h-7 w-7",  text: "text-[11px]" },
  md: { wrapper: "h-9 w-9",  text: "text-sm" },
  lg: { wrapper: "h-12 w-12", text: "text-[18px]" },
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt: string;
  size?: AvatarSize;
  shape?: "circle" | "square";
  fallback?: string;  // initials
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { src, alt, size = "md", shape = "circle", fallback, className, ...props },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const { wrapper, text } = sizeMap[size];
    const initials = fallback ??
      alt.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center overflow-hidden shrink-0",
          "bg-[var(--gray-4)] text-[var(--text-mid)] font-semibold select-none",
          shape === "circle" ? "rounded-full" : "rounded-r3",
          wrapper,
          className
        )}
        aria-label={alt}
        {...props}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={text} aria-hidden="true">{initials}</span>
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
