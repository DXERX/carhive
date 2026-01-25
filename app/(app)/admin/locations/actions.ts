"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { locationsTable } from "@/db/schema"
import { eq } from "drizzle-orm"
import { isAdminByEmail } from "@/db/queries/admin-repository"

export async function toggleLocationStatus(locationId: number) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress
  const isAdmin = userEmail ? await isAdminByEmail(userEmail) : false

  if (!isAdmin) {
    return { success: false, error: "Only admins can manage locations" }
  }

  try {
    const location = await db.select().from(locationsTable).where(eq(locationsTable.id, locationId)).limit(1)
    
    if (!location || location.length === 0) {
      return { success: false, error: "Location not found" }
    }

    const currentStatus = location[0].status
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'

    await db.update(locationsTable)
      .set({ status: newStatus })
      .where(eq(locationsTable.id, locationId))

    revalidatePath("/admin/locations")
    return { success: true, newStatus }
  } catch (error) {
    console.error("Error toggling location status:", error)
    return { success: false, error: "Failed to update location" }
  }
}
