import { eq } from "drizzle-orm"

import { db } from ".."
import { SelectCar } from "../schema"
import { cars as fallbackCars } from "@/data/cars"

export async function getCars() {
  if (!db) {
    console.log('Database not available, using fallback cars data')
    return fallbackCars
  }
  try {
    return db.query.carsTable.findMany()
  } catch (error) {
    console.warn('Database query failed, using fallback cars data:', error)
    return fallbackCars
  }
}

export async function getCarBySlug(slug: SelectCar["slug"]) {
  if (!db) {
    console.log('Database not available, using fallback cars data')
    return fallbackCars.find(car => car.slug === slug) || null
  }
  try {
    return db.query.carsTable.findFirst({
      where: (fields, operators) => eq(fields.slug, slug),
    })
  } catch (error) {
    console.warn('Database query failed, using fallback cars data:', error)
    return fallbackCars.find(car => car.slug === slug) || null
  }
}
