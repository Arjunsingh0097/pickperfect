import { NextRequest, NextResponse } from "next/server";

const PLACES_AUTOCOMPLETE_URL = "https://places.googleapis.com/v1/places:autocomplete";

const DEBUG = process.env.PLACES_API_DEBUG === "true" || process.env.NODE_ENV === "development";
function debug(msg: string, data?: unknown) {
  if (DEBUG) {
    const payload = data !== undefined ? ` ${JSON.stringify(data)}` : "";
    console.log("[Places API]", msg + payload);
  }
}

export type PlacesAutocompleteSuggestion = {
  placeId: string;
  displayText: string;
  mainText?: string;
  secondaryText?: string;
};

type GoogleAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      place?: string;
      placeId?: string;
      text?: { text?: string };
      structuredFormat?: {
        mainText?: { text?: string };
        secondaryText?: { text?: string };
      };
    };
  }>;
};

// Uses server-side key: ensure the key is NOT restricted to "HTTP referrers" only
// (use "None" or "IP addresses" for this key), or Google returns 403 referer blocked.
export async function POST(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY ?? "";
  if (!apiKey) {
    return NextResponse.json(
      { error: "Places API not configured" },
      { status: 503 }
    );
  }

  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const query = typeof body.query === "string" ? body.query.trim() : "";
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl?.protocol?.replace(":", "") ?? "unknown";
  debug("request", { query, proto, url: request.nextUrl?.href ?? request.url });

  if (query.length < 2) {
    debug("skip: query too short");
    return NextResponse.json({ suggestions: [] });
  }

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

    const raw = await res.text();
    if (!res.ok) {
      debug("Google error", { status: res.status, body: raw.slice(0, 300) });
      console.error("[Places API] Google error:", res.status, raw.slice(0, 200));
      return NextResponse.json(
        { error: "Places service error", detail: raw.slice(0, 200) },
        { status: 502 }
      );
    }

    let data: GoogleAutocompleteResponse;
    try {
      data = JSON.parse(raw) as GoogleAutocompleteResponse;
    } catch {
      console.error("Places autocomplete: invalid JSON", raw.slice(0, 200));
      return NextResponse.json({ suggestions: [] });
    }

    const suggestions: PlacesAutocompleteSuggestion[] = [];
    for (const s of data.suggestions ?? []) {
      const pred = s.placePrediction;
      if (!pred?.placeId) continue;
      const fallback =
        [pred.structuredFormat?.mainText?.text, pred.structuredFormat?.secondaryText?.text]
          .filter(Boolean)
          .join(", ") || pred.place?.replace(/^places\//, "") || pred.placeId;
      const displayText = pred.text?.text ?? fallback;
      suggestions.push({
        placeId: pred.placeId,
        displayText,
        mainText: pred.structuredFormat?.mainText?.text,
        secondaryText: pred.structuredFormat?.secondaryText?.text,
      });
    }

    debug("success", { suggestionCount: suggestions.length, first: suggestions[0]?.displayText?.slice(0, 40) });
    return NextResponse.json({ suggestions });
  } catch (e) {
    debug("exception", { error: e instanceof Error ? e.message : String(e) });
    console.error("[Places API] exception:", e);
    return NextResponse.json(
      { error: "Places request failed" },
      { status: 502 }
    );
  }
}
