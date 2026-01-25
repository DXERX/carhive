"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { createCar, updateCar, deleteCar } from "@/db/queries/car-repository-admin"
import { InsertCar } from "@/db/schema"
import { isAdminByEmail } from "@/db/queries/admin-repository"

async function checkAdmin() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return { isAdmin: false, error: "Unauthorized" }
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress
  const isAdmin = userEmail ? await isAdminByEmail(userEmail) : false

  if (!isAdmin) {
    return { isAdmin: false, error: "Unauthorized - Admin only" }
  }

  return { isAdmin: true }
}

export async function createCarAction(data: InsertCar) {
  const { isAdmin, error } = await checkAdmin()
  if (!isAdmin) return { success: false, error }

  try {
    const car = await createCar(data)
    if (!car) {
      return { success: false, error: "Failed to create car" }
    }

    revalidatePath("/admin/cars")
    revalidatePath("/cars")
    return { success: true, car }
  } catch (error) {
    console.error("Error in createCarAction:", error)
    return { success: false, error: "Something went wrong" }
  }
}

export async function updateCarAction(id: number, data: Partial<InsertCar>) {
  const { isAdmin, error } = await checkAdmin()
  if (!isAdmin) return { success: false, error }

  try {
    const car = await updateCar(id, data)
    if (!car) {
      return { success: false, error: "Failed to update car" }
    }

    revalidatePath("/admin/cars")
    revalidatePath("/cars")
    return { success: true, car }
  } catch (error) {
    console.error("Error in updateCarAction:", error)
    return { success: false, error: "Something went wrong" }
  }
}

export async function deleteCarAction(id: number) {
  const { isAdmin, error } = await checkAdmin()
  if (!isAdmin) return { success: false, error }

  try {
    const result = await deleteCar(id)
    if (!result) {
      return { success: false, error: "Failed to delete car" }
    }

    revalidatePath("/admin/cars")
    revalidatePath("/cars")
    return { success: true }
  } catch (error) {
    console.error("Error in deleteCarAction:", error)
    return { success: false, error: "Something went wrong" }
  }
}
