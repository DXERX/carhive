"use server"

import { revalidatePath } from "next/cache"
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server"
import { 
  addAdminRole as addAdminRoleDB, 
  removeAdminRole as removeAdminRoleDB,
  isAdminByEmail 
} from "@/db/queries/admin-repository"

export async function addAdminRole(email: string) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  // Check if current user is admin
  const userEmail = user?.emailAddresses[0]?.emailAddress
  if (!userEmail || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Only admins can add other admins" }
  }

  // Get the target user by email
  const client = await clerkClient()
  const users = await client.users.getUserList({ emailAddress: [email] })
  
  if (users.data.length === 0) {
    return { success: false, error: "User not found" }
  }

  const targetUser = users.data[0]
  const result = await addAdminRoleDB(targetUser.id, email, userId)

  if (result.success) {
    revalidatePath("/admin/users")
    return { 
      success: true, 
      message: `Admin role granted to ${email}` 
    }
  }

  return result
}

export async function removeAdminRole(email: string) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    return { success: false, error: "Unauthorized" }
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress
  if (!userEmail || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Only admins can remove other admins" }
  }

  // Don't allow removing yourself
  if (email === userEmail) {
    return { success: false, error: "You cannot remove your own admin role" }
  }

  // Get the target user by email
  const client = await clerkClient()
  const users = await client.users.getUserList({ emailAddress: [email] })
  
  if (users.data.length === 0) {
    return { success: false, error: "User not found" }
  }

  const targetUser = users.data[0]
  const result = await removeAdminRoleDB(targetUser.id)

  if (result.success) {
    revalidatePath("/admin/users")
    return { 
      success: true, 
      message: `Admin role removed from ${email}` 
    }
  }

  return result
}

export async function banUser(userId: string) {
  const { userId: currentUserId } = await auth()
  const user = await currentUser()

  if (!currentUserId) {
    return { success: false, error: "Unauthorized" }
  }

  const userEmail = user?.emailAddresses[0]?.emailAddress
  if (!userEmail || !(await isAdminByEmail(userEmail))) {
    return { success: false, error: "Only admins can ban users" }
  }

  try {
    // Ban user using Clerk API
    const { clerkClient } = await import('@clerk/nextjs/server')
    await clerkClient().users.banUser(userId)
    
    revalidatePath("/admin/users")
    return { success: true, message: "User banned successfully" }
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to ban user" }
  }
}
