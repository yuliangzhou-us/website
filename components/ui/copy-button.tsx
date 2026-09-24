"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/ui/icons";

type CopyButtonProps = {
  value: string;
  label: string;
  className?: string;
  showLabel?: boolean;
};

export function CopyButton({ value, label, className = "", showLabel = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (insecure context, permissions); fail quietly.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className={`inline-flex items-center gap-1.5 rounded-full font-sans text-xs font-medium transition ${
        copied ? "text-accent-ink" : "text-muted hover:text-brand"
      } ${className}`}
    >
      {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      {showLabel ? <span>{copied ? "Copied" : "Copy"}</span> : null}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
