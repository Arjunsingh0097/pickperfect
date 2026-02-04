"use client";

import { useState } from "react";
import { Home, MapPin, ChevronDown, FileText } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const moveTypes = [
  { value: "local", label: "Local Move" },
  { value: "interstate", label: "Interstate Move" },
  { value: "international", label: "International Move" },
];

export default function HeroQuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const moveType = (formData.get("moveType") as string) ?? "local";
    const movingFrom = (formData.get("movingFrom") as string) ?? "";
    const movingTo = (formData.get("movingTo") as string) ?? "";

    try {
      const res = await fetch(`${BASE}/api/submit-quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moveType,
          movingFrom: movingFrom.trim(),
          movingTo: movingTo.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        const msg = (data.error as string) || "Something went wrong. Please try again.";
        const detail = data.detail as string | undefined;
        setErrorMessage(detail ? `${msg} (${detail})` : msg);
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-teal/85 via-teal/70 to-[#6b9cb0]/65 p-6 shadow-xl backdrop-blur-sm sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        <div>
          <label
            htmlFor="move-type"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]"
          >
            Move type
          </label>
          <div className="relative transition-shadow duration-200">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-dark z-10">
              <Home className="h-5 w-5" aria-hidden />
            </span>
            <select
              id="move-type"
              name="moveType"
              defaultValue="local"
              className="w-full cursor-pointer appearance-none rounded-xl border-2 border-white/40 bg-white py-3.5 pl-10 pr-11 text-deep shadow-md transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg focus:border-teal-dark focus:outline-none focus:ring-0"
            >
              {moveTypes.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 z-10 text-teal-dark">
              <ChevronDown className="h-5 w-5 shrink-0" aria-hidden />
            </span>
          </div>
        </div>

        <div>
          <label
            htmlFor="moving-from"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]"
          >
            Moving from
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-dark z-10">
              <MapPin className="h-5 w-5" aria-hidden />
            </span>
            <input
              id="moving-from"
              name="movingFrom"
              type="text"
              placeholder="Enter a post code or suburb..."
              className="w-full rounded-xl border-2 border-white/40 bg-white py-3.5 pl-10 pr-4 text-deep shadow-md placeholder:text-[#8A9DA3] transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg focus:border-teal-dark focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="moving-to"
            className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]"
          >
            Moving to
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-dark z-10">
              <MapPin className="h-5 w-5" aria-hidden />
            </span>
            <input
              id="moving-to"
              name="movingTo"
              type="text"
              placeholder="Enter a post code or suburb..."
              className="w-full rounded-xl border-2 border-white/40 bg-white py-3.5 pl-10 pr-4 text-deep shadow-md placeholder:text-[#8A9DA3] transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg focus:border-teal-dark focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-800" role="alert">
            {errorMessage}
          </p>
        )}
        {status === "success" && (
          <p className="rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-teal-dark" role="status">
            Thanks! We&apos;ll be in touch with quotes soon.
          </p>
        )}
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-dark py-4 font-medium text-white shadow-lg ring-1 ring-white/20 transition hover:bg-deep focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            "Sending…"
          ) : (
            <>
              <FileText className="h-5 w-5" aria-hidden />
              Get free quotes
            </>
          )}
        </button>
      </form>
    </div>
  );
}
