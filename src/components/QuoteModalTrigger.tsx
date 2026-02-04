"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useQuoteModal } from "./QuoteModalProvider";

type QuoteModalTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function QuoteModalTrigger({
  className,
  children,
  onClick,
  type,
  ...props
}: QuoteModalTriggerProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <button
      type={type ?? "button"}
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openQuoteModal();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

