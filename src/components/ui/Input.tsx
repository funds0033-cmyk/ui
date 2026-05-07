import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-medium text-text-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-8 w-full rounded-md border bg-surface-2 px-3",
            "text-[12px] text-text placeholder:text-text-3",
            "outline-none transition-colors",
            error
              ? "border-red/50 focus:border-red focus:ring-1 focus:ring-red/30"
              : "border-border focus:border-border-2 focus:ring-1 focus:ring-primary/30",
            "disabled:opacity-40 disabled:cursor-not-allowed",
            className,
          )}
          {...props}
        />
        {error && <p className="text-[10px] text-red">{error}</p>}
        {hint && !error && <p className="text-[10px] text-text-3">{hint}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
