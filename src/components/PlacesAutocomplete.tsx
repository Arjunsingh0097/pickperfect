"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";

const PLACES_AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";

// Frontend key: restrict to your site's HTTP referrers in Google Cloud Console
const getApiKey = () =>
  process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || "AIzaSyDmPXr5nm1A2PAuCEdwiFLvy161PL26tD0";

type Suggestion = {
  placeId: string;
  displayText: string;
};

type PlacePrediction = {
  placeId?: string;
  text?: { text?: string };
  structuredFormat?: {
    mainText?: { text?: string };
    secondaryText?: { text?: string };
  };
};

type AutocompleteResponse = {
  suggestions?: Array<{ placePrediction?: PlacePrediction }>;
};

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "aria-label"?: string;
};

const DEBOUNCE_MS = 300;

export default function PlacesAutocomplete({
  id,
  value,
  onChange,
  placeholder = "Enter a post code or suburb...",
  className,
  "aria-label": ariaLabel,
}: Props) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    const apiKey = getApiKey();
    if (!apiKey || query.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(PLACES_AUTOCOMPLETE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
        },
        body: JSON.stringify({
          input: query,
          includedRegionCodes: ["AU"],
          languageCode: "en-AU",
          regionCode: "au",
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.warn("[Places Autocomplete]", res.status, err.slice(0, 200));
        setSuggestions([]);
        return;
      }
      const data = (await res.json()) as AutocompleteResponse;
      const list: Suggestion[] = [];
      for (const s of data.suggestions ?? []) {
        const p = s.placePrediction;
        if (!p?.placeId) continue;
        const main = p.structuredFormat?.mainText?.text ?? "";
        const secondary = p.structuredFormat?.secondaryText?.text ?? "";
        const displayText =
          p.text?.text ?? ([main, secondary].filter(Boolean).join(", ") || p.placeId);
        list.push({ placeId: p.placeId, displayText });
      }
      setSuggestions(list);
      setIsOpen(list.length > 0);
    } catch (e) {
      console.warn("[Places Autocomplete]", e);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setInputValue(v);
    onChange(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (v.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(v.trim()), DEBOUNCE_MS);
  };

  const handleSelect = (displayText: string) => {
    setInputValue(displayText);
    onChange(displayText);
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;
    const list = suggestions;
    const current = list.findIndex((s) => s.displayText === inputValue);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = current < list.length - 1 ? current + 1 : 0;
      setInputValue(list[next].displayText);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = current <= 0 ? list.length - 1 : current - 1;
      setInputValue(list[prev].displayText);
    } else if (e.key === "Enter" && current >= 0) {
      e.preventDefault();
      handleSelect(list[current].displayText);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-teal-dark z-10"
          aria-hidden
        />
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
          aria-label={ariaLabel}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${id}-listbox` : undefined}
          role="combobox"
          autoComplete="off"
        />
      </div>
      {isOpen && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-60 overflow-auto rounded-xl border border-white/20 bg-white py-1 shadow-xl ring-1 ring-black/5"
        >
          {loading && suggestions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-[#8A9DA3]">Loading...</li>
          ) : (
            suggestions.map((s) => (
              <li
                key={s.placeId}
                role="option"
                aria-selected={inputValue === s.displayText}
                onClick={() => handleSelect(s.displayText)}
                onMouseDown={(e) => e.preventDefault()}
                className="cursor-pointer px-4 py-3 text-sm text-deep hover:bg-teal/10 focus:bg-teal/10"
              >
                {s.displayText}
              </li>
            ))
          )}
        </ul>
      )}
      {/* Google attribution required when showing predictions */}
      {isOpen && suggestions.length > 0 && (
        <div className="mt-1 flex items-center gap-1 text-[10px] text-white/70">
          <span>Powered by Google</span>
        </div>
      )}
    </div>
  );
}
