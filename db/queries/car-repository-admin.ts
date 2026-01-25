import { db } from "@/db"
import { carsTable, SelectCar, InsertCar } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function updateCar(id: number, data: Partial<InsertCar>): Promise<SelectCar | null> {
  if (!db) return null

  try {
    const [car] = await db
      .update(carsTable)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(carsTable.id, id))
      .returning()
    return car
  } catch (error) {
    console.error("Error updating car:", error)
    return null
  }
}

export async function deleteCar(id: number): Promise<boolean> {
  if (!db) return false

  try {
    await db.delete(carsTable).where(eq(carsTable.id, id))
    return true
  } catch (error) {
    console.error("Error deleting car:", error)
    return false
  }
}

export async function createCar(data: InsertCar): Promise<SelectCar | null> {
  if (!db) return null

  try {
    const [car] = await db.insert(carsTable).values(data).returning()
    return car
  } catch (error) {
    console.error("Error creating car:", error)
    return null
  }
}
