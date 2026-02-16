import { setOptions, importLibrary } from "@googlemaps/js-api-loader"

let initialized = false

function ensureInitialized() {
  if (!initialized) {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
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
