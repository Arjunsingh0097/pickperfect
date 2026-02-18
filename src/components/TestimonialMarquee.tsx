"use client";

import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    name: "James T.",
    initial: "J",
    stars: 5,
    text: "Pick Perfect made it easy to compare movers and choose without stress. Everything was clear and simple.",
    date: "02 May 2025",
  },
  {
    name: "Olivia R.",
    initial: "O",
    stars: 5,
    text: "Being able to compare removalists and quotes in one place saved me a lot of time.",
    date: "02 May 2025",
  },
  {
    name: "John R.",
    initial: "J",
    stars: 5,
    text: "Got three quotes within a day. Chose the best value and the move went smoothly. Highly recommend.",
    date: "02 May 2025",
  },
  {
    name: "Sarah M.",
    initial: "S",
    stars: 5,
    text: "No more chasing different companies. One form, multiple quotes, and I could compare everything side by side.",
    date: "28 Apr 2025",
  },
  {
    name: "David L.",
    initial: "D",
    stars: 5,
    text: "The removalist I found through Pick Perfect was professional and on time. Made my interstate move stress-free.",
    date: "20 Apr 2025",
  },
];

const DURATION_MS = 45000; // 45 seconds for one full cycle

function Card({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <article className="min-w-[280px] max-w-[320px] shrink-0 rounded-2xl bg-white p-6 shadow-sm lg:min-w-[300px]">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-dark text-lg font-semibold text-white">
          {review.initial}
        </span>
        <span className="font-semibold text-deep">{review.name}</span>
      </div>
      <div
        className="mt-3 flex gap-0.5"
        aria-label={`${review.stars} out of 5 stars`}
      >
        {Array.from({ length: review.stars }).map((_, i) => (
          <svg
            key={i}
            className="h-5 w-5 text-amber-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
          </svg>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-teal-dark">
        {review.text}
      </p>
    </article>
  );
}

export default function TestimonialMarquee() {
  const [offsetPx, setOffsetPx] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const setWidthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setEl = setWidthRef.current;
    if (!setEl) return;

    let setWidth = 0;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      if (setWidth > 0) {
        const elapsed = (timestamp - startRef.current) % DURATION_MS;
        const progress = elapsed / DURATION_MS;
        setOffsetPx(progress * setWidth);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const updateWidth = () => {
      const w = setEl.offsetWidth;
      if (w > 0) setWidth = w;
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(setEl);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="mt-10 overflow-hidden">
      <div
        className="flex w-max gap-6 pr-6 lg:gap-8 lg:pr-8"
        style={{
          transform: `translateX(-${offsetPx}px)`,
          willChange: "transform",
        }}
      >
        <div
          ref={setWidthRef}
          className="flex shrink-0 gap-6 lg:gap-8"
        >
          {REVIEWS.map((review) => (
            <Card key={`a-${review.name}-${review.date}`} review={review} />
          ))}
        </div>
        <div className="flex shrink-0 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <Card key={`b-${review.name}-${review.date}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
