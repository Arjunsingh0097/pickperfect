"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X, FileText } from "lucide-react";
import HeroQuoteForm from "@/components/HeroQuoteForm";

type QuoteModalContextValue = {
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
};

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openQuoteModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeQuoteModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      const input = document.getElementById("moving-from");
      if (input instanceof HTMLInputElement) {
        input.focus({ preventScroll: true });
      }
    }, 80);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(timer);
    };
  }, [isOpen, closeQuoteModal]);

  const value = useMemo(
    () => ({
      openQuoteModal,
      closeQuoteModal,
    }),
    [openQuoteModal, closeQuoteModal]
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      {/* Sticky quote form button - bottom left */}
      <button
        type="button"
        onClick={openQuoteModal}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-white shadow-lg transition hover:bg-teal-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 focus:ring-offset-white"
        aria-label="Get a quote"
      >
        <FileText className="h-7 w-7" strokeWidth={2} aria-hidden />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-999 flex items-center justify-center px-4 py-10 sm:px-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden
            onClick={closeQuoteModal}
          />
          <div className="relative z-1000 w-full max-w-xl">
            <div className="relative">
              <HeroQuoteForm />
              <button
                type="button"
                onClick={closeQuoteModal}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-deep shadow-lg transition hover:bg-mint focus:outline-none focus:ring-2 focus:ring-mint/40 focus:ring-offset-1 focus:ring-offset-transparent"
                aria-label="Close quote form"
              >
                <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      )}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}

