import { useState } from "react";
import { cn } from "@/lib/utils";
import { truncateAddress } from "@/lib/utils";

interface AddressDisplayProps {
  address: string;
  start?: number;
  end?: number;
  showFull?: boolean;
  className?: string;
  label?: string;
}

export function AddressDisplay({
  address,
  start = 8,
  end = 6,
  showFull = false,
  className,
  label,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select text
    }
  }

  const display = showFull ? address : truncateAddress(address, start, end);

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-4">
          {label}
        </span>
      )}
      <div className="flex items-center gap-2 group">
        <span
          data-address
          className={cn(
            "break-all leading-relaxed",
            showFull ? "text-[11px]" : "",
          )}
          title={address}
        >
          {display}
        </span>
        <button
          onClick={copy}
          className={cn(
            "shrink-0 p-1 rounded-md transition-all",
            copied
              ? "text-green bg-[rgba(34,197,94,0.1)]"
              : "text-ink-3 hover:text-ink-2 hover:bg-surface-2 opacity-0 group-hover:opacity-100",
          )}
          title={copied ? "Copied!" : "Copy address"}
        >
          {copied ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect
                x="4"
                y="4"
                width="7"
                height="7"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M3 8H2.5C1.67 8 1 7.33 1 6.5V2.5C1 1.67 1.67 1 2.5 1H6.5C7.33 1 8 1.67 8 2.5V3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
