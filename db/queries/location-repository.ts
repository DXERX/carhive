import { cache } from "react"
import { db } from ".."
import { locations as fallbackLocations } from "@/data/locations"

let didWarnEmptyLocations = false

// Cache getLocations query results for the duration of the request
export const getLocations = cache(async () => {
  if (!db) {
    console.log('Database not available, using fallback locations data')
    return fallbackLocations
  }
  try {
    const locations = await db.query.locationsTable.findMany()
    if (!locations || locations.length === 0) {
      if (!didWarnEmptyLocations) {
        console.warn('No locations found in database, using fallback locations data')
        didWarnEmptyLocations = true
      }
      return fallbackLocations
    }
    return locations
  } catch (error) {
    console.warn('Database query failed, using fallback locations data:', error)
    return fallbackLocations
  }
})
