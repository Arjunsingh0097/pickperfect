"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { loadPlacesLibrary } from "@/lib/googleLibLoader"

type PlacePrediction = NonNullable<
  google.maps.places.AutocompleteSuggestion["placePrediction"]
>

type AddressSearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
  "aria-label"?: string
}

export default function AddressSearch({
  value,
  onChange,
  placeholder = "Search address...",
  className = "",
  id,
  "aria-label": ariaLabel,
}: AddressSearchProps) {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([])
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>()
  const [isOpen, setIsOpen] = useState(false)
  const debounceRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fetchSuggestions = useCallback(
    async (input: string) => {
      if (!input.trim()) {
        setSuggestions([])
        return
      }

      try {
        const { AutocompleteSessionToken, AutocompleteSuggestion } =
          await loadPlacesLibrary()

        let currentToken = sessionToken

        if (!currentToken) {
          currentToken = new AutocompleteSessionToken()
          setSessionToken(currentToken)
        }

        const request: google.maps.places.AutocompleteRequest = {
          input,
          sessionToken: currentToken,
          language: "en",
          includedRegionCodes: ["au"],
        }

        const { suggestions: results } =
          await AutocompleteSuggestion.fetchAutocompleteSuggestions(request)

        setSuggestions(
          results.map((s) => s.placePrediction).filter((p): p is PlacePrediction => p != null)
        )
        setIsOpen(true)
      } catch (err) {
        console.error("Address autocomplete error:", err)
        setSuggestions([])
      }
    },
    [sessionToken]
  )

  useEffect(() => {
    if (!value) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(value)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value, fetchSuggestions])

  const handleSelect = (item: PlacePrediction) => {
    const text = item.text?.text ?? ""
    onChange(text)
    setSuggestions([])
    setIsOpen(false)
    setSessionToken(undefined)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        className={className}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        role="combobox"
        autoComplete="off"
      />

      {isOpen && suggestions.length > 0 && (
        <ul
          className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-xl border-2 border-white/40 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {suggestions.map((item) => (
            <li
              key={item.placeId}
              role="option"
              className="cursor-pointer px-4 py-2.5 text-sm text-deep hover:bg-teal/5"
              onMouseDown={(e) => {
                e.preventDefault()
                handleSelect(item)
              }}
            >
              {item.text?.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
