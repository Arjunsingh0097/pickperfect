"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

type Suggestion = {
  placeId: string;
  displayText: string;
  mainText?: string;
  secondaryText?: string;
};

async function fetchSuggestions(query: string): Promise<{ suggestions: Suggestion[]; error?: string }> {
  const url = `${BASE}/api/places-autocomplete`.replace(/\/\/+/, "/");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const data = (await res.json().catch(() => ({}))) as { suggestions?: Suggestion[]; error?: string };
  if (!res.ok) {
    return { suggestions: [], error: data.error || `Request failed (${res.status})` };
  }
  return {
    suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
    error: data.error,
  };
}

type PlacesAutocompleteProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
};

export default function PlacesAutocomplete({
  id,
  value,
  onChange,
  placeholder = "Enter a post code or suburb...",
  className = "",
  "aria-label": ariaLabel,
}: PlacesAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [apiError, setApiError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const syncValueToQuery = useCallback(() => setQuery(value), [value]);
  useEffect(() => syncValueToQuery(), [syncValueToQuery]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    setApiError(null);
    debounceRef.current = setTimeout(async () => {
      try {
        const { suggestions: list, error } = await fetchSuggestions(query);
        setSuggestions(list);
        setOpen(list.length > 0);
        setHighlightIndex(-1);
        if (error) setApiError(error);
      } catch {
        setSuggestions([]);
        setOpen(false);
        setApiError("Network error");
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open || highlightIndex < 0) return;
    listRef.current?.querySelector(`[data-index="${highlightIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, highlightIndex]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setQuery(v);
    onChange(v);
  }

  function handleSelect(s: Suggestion) {
    setQuery(s.displayText);
    onChange(s.displayText);
    setOpen(false);
    setSuggestions([]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) {
      if (e.key === "Escape") setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i < suggestions.length - 1 ? i + 1 : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : suggestions.length - 1));
      return;
    }
    if (e.key === "Enter" && highlightIndex >= 0 && suggestions[highlightIndex]) {
      e.preventDefault();
      handleSelect(suggestions[highlightIndex]);
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      setHighlightIndex(-1);
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-teal-dark" aria-hidden />
        <input
          id={id}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
          autoComplete="off"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls={open ? `${id}-listbox` : undefined}
          role="combobox"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-teal-dark/70" aria-hidden>
            Searching…
          </span>
        )}
      </div>
      {apiError && (
        <p className="mt-1 text-xs text-amber-700" role="status">
          {apiError}. Check GOOGLE_PLACES_API_KEY and that Places API (New) is enabled.
        </p>
      )}
      {open && suggestions.length > 0 && (
        <ul
          id={`${id}-listbox`}
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded-xl border border-white/20 bg-white py-1 shadow-xl ring-1 ring-black/5"
        >
          {suggestions.map((s, index) => (
            <li key={s.placeId} role="option" data-index={index} aria-selected={highlightIndex === index}>
              <button
                type="button"
                className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                  highlightIndex === index ? "bg-teal/10 font-medium text-teal-dark" : "text-deep hover:bg-[#e8edef]"
                }`}
                onClick={() => handleSelect(s)}
              >
                {s.displayText}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
