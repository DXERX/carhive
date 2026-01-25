import { db } from ".."
import { locations as fallbackLocations } from "@/data/locations"

export async function getLocations() {
  if (!db) {
    console.log('Database not available, using fallback locations data')
    return fallbackLocations
  }
  try {
    return db.query.locationsTable.findMany()
  } catch (error) {
    console.warn('Database query failed, using fallback locations data:', error)
    return fallbackLocations
  }
}
