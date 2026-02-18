import { setOptions, importLibrary } from "@googlemaps/js-api-loader"

let initialized = false

function ensureInitialized() {
  if (!initialized) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!key && typeof window !== "undefined") {
      console.warn(
        "[Google Maps] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set. Add it in Vercel → Settings → Environment Variables for production."
      )
    }
    setOptions({
      key: (key || "") as string,
      v: "weekly",
      libraries: ["places"],
    })
    initialized = true
  }
}

export async function loadPlacesLibrary() {
  ensureInitialized()
  return importLibrary("places")
}
