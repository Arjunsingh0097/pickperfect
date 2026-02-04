"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How does Pick Perfect work?",
    answer:
      "We make moving easier by connecting you with multiple removalists. Submit details about your move and receive quotes from moving companies so you can compare and choose with confidence.",
  },
  {
    question: "Is it free to compare movers?",
    answer:
      "Yes, requesting and comparing movers is completely free with no obligation to book.",
  },
  {
    question: "Can I compare interstate removalists?",
    answer:
      "Yes, interstate moves are one of the move types you can select on the form. Submit your details, and our network of interstate removal companies will contact you with quotes.",
  },
  {
    question: "Do you cover business and commercial moves?",
    answer:
      "Yes, we include options for business removalists and commercial removal companies.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="rounded-xl transition">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-4 rounded-xl bg-[#e8edef] px-6 py-5 text-left transition hover:bg-white/90"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-deep">{item.question}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-teal-dark transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ease-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="rounded-b-xl bg-[#e8edef] px-6 pb-5 pt-1">
                <p className="text-sm leading-relaxed text-teal-dark">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
