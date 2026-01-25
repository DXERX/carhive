"use server"

import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { isAdminByEmail } from "@/db/queries/admin-repository"

export async function sendNotification(data: {
  title: string
  message: string
  target: string
  type: string
}) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress
  if (!userEmail || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Only admins can send notifications" }
  }

  try {
    // In production, store in database and use WebSockets/Pusher/Firebase for real-time
    // For now, just log the notification
    // Future: Store in notifications table and send via real-time service
    
    revalidatePath("/admin/notifications")
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to send notification" }
  }
}
