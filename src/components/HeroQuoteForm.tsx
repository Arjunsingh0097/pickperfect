"use client";

import { useState, useRef, useEffect } from "react";
import { Home, MapPin, ChevronDown, FileText, Check, Calendar, User, Mail, Phone, ArrowRight, ArrowLeft } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const moveTypes = [
  { value: "local", label: "Local Move" },
  { value: "interstate", label: "Interstate Move" },
];

const jobTypes = [
  { value: "1-5-bedrooms", label: "1–5+ bedrooms" },
  { value: "office", label: "Office" },
  { value: "others", label: "Others" },
];

const additionalServiceOptions = [
  "Moving Home",
  "Moving Office",
  "Furniture Removals",
  "Commercial Removals",
  "Corporate Relocations",
  "Packing",
  "Interstate Removalists",
  "Local Removalists",
];

const inputBase =
  "w-full rounded-xl border-2 border-white/40 bg-white py-3.5 pl-10 pr-4 text-deep shadow-md placeholder:text-[#8A9DA3] transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg focus:border-teal-dark focus:outline-none focus:ring-2 focus:ring-teal-dark/30 focus:ring-offset-2 focus:ring-offset-transparent";

const STEP_COUNT = 3;

export default function HeroQuoteForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [moveType, setMoveType] = useState("local");
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");

  const [jobType, setJobType] = useState("1-5-bedrooms");
  const [jobTypeDetails, setJobTypeDetails] = useState("");
  const [movingDate, setMovingDate] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jobDropdownOpen, setJobDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const jobDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) setDropdownOpen(false);
      if (jobDropdownRef.current && !jobDropdownRef.current.contains(target)) setJobDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleNext() {
    setErrorMessage("");
    if (step === 1) {
      if (!movingFrom.trim() || !movingTo.trim()) {
        setErrorMessage("Please enter move from and move to.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, STEP_COUNT));
  }

  function handleBack() {
    setErrorMessage("");
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Please enter your full name, email and phone number.");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch(`${BASE}/api/submit-quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moveType,
          movingFrom: movingFrom.trim(),
          movingTo: movingTo.trim(),
          jobType: jobTypes.find((j) => j.value === jobType)?.label ?? jobType,
          jobTypeDetails: jobTypeDetails.trim(),
          movingDate: movingDate.trim(),
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          additionalServices: selectedServices.join(", "),
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
      setStep(1);
      setMoveType("local");
      setMovingFrom("");
      setMovingTo("");
      setJobType("1-5-bedrooms");
      setJobTypeDetails("");
      setMovingDate("");
      setFullName("");
      setEmail("");
      setPhone("");
      setSelectedServices([]);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  const formContainerStyle = {
    background: "linear-gradient(180deg, #145561 0%, #1F7A8C 50%)",
    borderRadius: 24,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    minHeight: 520,
    maxWidth: 636,
  };

  if (status === "success") {
    return (
      <div
        className="w-full p-6 sm:p-8"
        style={formContainerStyle}
      >
        <p className="rounded-xl bg-white/90 px-4 py-4 text-center font-medium text-teal-dark" role="status">
          Thanks! We&apos;ll be in touch with quotes soon.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full p-6 sm:p-8"
      style={formContainerStyle}
    >
      {/* Step indicator */}
      <div className="mb-6 flex gap-2">
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "bg-white" : "bg-white/30"}`}
            aria-hidden
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Step 1: Moving type, Move from, Move to */}
        {step === 1 && (
          <>
            <div>
              <label id="move-type-label" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Move type
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  aria-labelledby="move-type-label"
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-white/40 bg-white py-3.5 pl-4 pr-4 text-left text-deep shadow-md transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg focus:border-teal-dark focus:outline-none focus:ring-2 focus:ring-teal-dark/30 focus:ring-offset-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal-dark">
                    <Home className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="flex-1 font-medium">
                    {moveTypes.find((o) => o.value === moveType)?.label ?? "Local Move"}
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-teal-dark transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                {dropdownOpen && (
                  <div role="listbox" aria-labelledby="move-type-label" className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/20 bg-white py-1 shadow-xl ring-1 ring-black/5">
                    {moveTypes.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={moveType === opt.value}
                        onClick={() => { setMoveType(opt.value); setDropdownOpen(false); }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors ${moveType === opt.value ? "bg-teal/10 font-semibold text-teal-dark" : "text-deep hover:bg-[#e8edef]"}`}
                      >
                        <span>{opt.label}</span>
                        {moveType === opt.value && <Check className="h-5 w-5 shrink-0 text-teal" strokeWidth={2.5} aria-hidden />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="moving-from" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Move from
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10" aria-hidden />
                <input
                  id="moving-from"
                  type="text"
                  value={movingFrom}
                  onChange={(e) => setMovingFrom(e.target.value)}
                  placeholder="Enter a post code or suburb..."
                  className={inputBase}
                />
              </div>
            </div>
            <div>
              <label htmlFor="moving-to" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Move to
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10" aria-hidden />
                <input
                  id="moving-to"
                  type="text"
                  value={movingTo}
                  onChange={(e) => setMovingTo(e.target.value)}
                  placeholder="Enter a post code or suburb..."
                  className={inputBase}
                />
              </div>
            </div>
          </>
        )}

        {/* Step 2: Job type, Job type details, Moving date */}
        {step === 2 && (
          <>
            <div>
              <label id="job-type-label" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Job type
              </label>
              <div className="relative" ref={jobDropdownRef}>
                <button
                  type="button"
                  onClick={() => setJobDropdownOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={jobDropdownOpen}
                  aria-labelledby="job-type-label"
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-white/40 bg-white py-3.5 pl-4 pr-4 text-left text-deep shadow-md transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg focus:border-teal-dark focus:outline-none focus:ring-2 focus:ring-teal-dark/30 focus:ring-offset-2"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal-dark">
                    <FileText className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="flex-1 font-medium">
                    {jobTypes.find((o) => o.value === jobType)?.label ?? "1–5+ bedrooms"}
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-teal-dark transition-transform duration-200 ${jobDropdownOpen ? "rotate-180" : ""}`} aria-hidden />
                </button>
                {jobDropdownOpen && (
                  <div role="listbox" aria-labelledby="job-type-label" className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/20 bg-white py-1 shadow-xl ring-1 ring-black/5">
                    {jobTypes.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        role="option"
                        aria-selected={jobType === opt.value}
                        onClick={() => { setJobType(opt.value); setJobDropdownOpen(false); }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors ${jobType === opt.value ? "bg-teal/10 font-semibold text-teal-dark" : "text-deep hover:bg-[#e8edef]"}`}
                      >
                        <span>{opt.label}</span>
                        {jobType === opt.value && <Check className="h-5 w-5 shrink-0 text-teal" strokeWidth={2.5} aria-hidden />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {jobType === "others" && (
              <div>
                <label htmlFor="job-type-details" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                  Job type details
                </label>
                <input
                  id="job-type-details"
                  type="text"
                  value={jobTypeDetails}
                  onChange={(e) => setJobTypeDetails(e.target.value)}
                  placeholder="Describe your move (e.g. studio, 6+ bedrooms, storage...)"
                  className={inputBase}
                />
              </div>
            )}
            <div>
              <label htmlFor="moving-date" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Moving date
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10" aria-hidden />
                <input
                  id="moving-date"
                  type="date"
                  value={movingDate}
                  onChange={(e) => setMovingDate(e.target.value)}
                  className={inputBase}
                />
              </div>
            </div>
          </>
        )}

        {/* Step 3: Full name, Email, Phone, Additional services */}
        {step === 3 && (
          <>
            <div>
              <label htmlFor="full-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Full name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10" aria-hidden />
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className={inputBase}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10" aria-hidden />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputBase}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Phone number
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10" aria-hidden />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="04XX XXX XXX"
                  className={inputBase}
                  required
                />
              </div>
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#BECBD1]">
                Additional services
              </span>
              <div className="mt-2 flex flex-col gap-2 rounded-xl border-2 border-white/40 bg-white p-3 shadow-md">
                {additionalServiceOptions.map((service) => (
                  <label
                    key={service}
                    className="flex cursor-pointer items-center gap-3 rounded-lg py-2 px-2 transition-colors hover:bg-teal/5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices((prev) => [...prev, service]);
                        } else {
                          setSelectedServices((prev) => prev.filter((s) => s !== service));
                        }
                      }}
                      className="h-4 w-4 rounded border-2 border-teal-dark/40 text-teal-dark focus:ring-2 focus:ring-teal-dark/30"
                    />
                    <span className="text-sm font-medium text-deep">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}

        {errorMessage && (
          <p className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-800" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="mt-2 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-white/60 bg-white/80 py-4 font-medium text-teal-dark transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/50 whitespace-nowrap"
            >
              <ArrowLeft className="h-5 w-5 shrink-0" aria-hidden />
              Back
            </button>
          )}
          {step < STEP_COUNT ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-dark py-4 font-medium text-white shadow-lg ring-1 ring-white/20 transition hover:bg-deep focus:outline-none focus:ring-2 focus:ring-white/50 whitespace-nowrap"
            >
              Next
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-dark py-4 font-medium text-white shadow-lg ring-1 ring-white/20 transition hover:bg-deep focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "Sending…" : (
                <>
                  <FileText className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="whitespace-nowrap">Get quote</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
