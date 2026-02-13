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
      "Yes, we include options for business movers and commercial removal companies.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="overflow-hidden rounded-xl bg-[#e8edef] shadow-sm transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:ring-inset ${
                isOpen ? "rounded-t-xl" : "rounded-xl"
              }`}
              aria-expanded={isOpen}
            >
              <h3 className="font-semibold text-deep m-0 text-base">{item.question}</h3>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-teal-dark transition duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
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
              className={`grid transition-all duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-teal-dark/10 px-6 pb-5 pt-3">
                  <p className="text-sm leading-relaxed text-teal-dark">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
