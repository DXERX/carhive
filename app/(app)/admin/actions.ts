"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { updateBookingStatus } from "@/db/queries/booking-repository"
import { revalidatePath } from "next/cache"
import { isAdminByEmail } from "@/db/queries/admin-repository"

export async function updateBookingStatusAction(bookingId: number, status: string) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId) {
      return {
        success: false,
        error: "Unauthorized",
      }
    }

    // Check if user is admin
    const userEmail = user?.emailAddresses[0]?.emailAddress
    const isAdmin = userEmail ? await isAdminByEmail(userEmail) : false

    if (!isAdmin) {
      return {
        success: false,
        error: "Unauthorized - Admin only",
      }
    }

    const booking = await updateBookingStatus(bookingId, status)

    if (!booking) {
      return {
        success: false,
        error: "Failed to update booking status",
      }
    }

    revalidatePath("/admin")

    return {
      success: true,
      booking,
    }
  } catch (error) {
    console.error("Error updating booking status:", error)
    return {
      success: false,
      error: "Something went wrong",
    }
  }
}
