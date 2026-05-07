import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "primary"
  | "teal"
  | "purple";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-surface-2 text-text-2 border border-border-2",
  success: "bg-green-dim text-green border border-green/20",
  warning: "bg-orange-dim text-orange border border-orange/20",
  error: "bg-red-dim text-red border border-red/20",
  primary: "bg-primary/20 text-primary border border-primary/30",
  teal: "bg-teal-dim text-teal border border-teal/20",
  purple: "bg-purple-dim text-purple border border-purple/20",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-text-3",
  success: "bg-green",
  warning: "bg-orange",
  error: "bg-red",
  primary: "bg-primary",
  teal: "bg-teal",
  purple: "bg-purple",
};

export function Badge({
  variant = "default",
  dot,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            dotColors[variant],
          )}
        />
      )}
      {children}
    </span>
  );
}
