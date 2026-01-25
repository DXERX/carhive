import { db } from "@/db"
import { adminRolesTable } from "@/db/schema"
import { eq } from "drizzle-orm"

/**
 * Check if a user is an admin by email
 */
export async function isAdminByEmail(email: string): Promise<boolean> {
  try {
    const admins = await db
      .select()
      .from(adminRolesTable)
      .where(eq(adminRolesTable.email, email))
      .limit(1)

    return admins.length > 0
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

/**
 * Check if a user is an admin by user ID
 */
export async function isAdminByUserId(userId: string): Promise<boolean> {
  try {
    const admins = await db
      .select()
      .from(adminRolesTable)
      .where(eq(adminRolesTable.userId, userId))
      .limit(1)

    return admins.length > 0
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

/**
 * Get all admin users
 */
export async function getAllAdmins() {
  try {
    return await db.select().from(adminRolesTable)
  } catch (error) {
    console.error("Error fetching admins:", error)
    return []
  }
}

/**
 * Add admin role to a user
 */
export async function addAdminRole(userId: string, email: string, addedBy: string) {
  try {
    const newAdmin = await db
      .insert(adminRolesTable)
      .values({
        userId,
        email,
        addedBy,
        role: "admin",
      })
      .returning()

    return { success: true, admin: newAdmin[0] }
  } catch (error: any) {
    console.error("Error adding admin role:", error)
    
    // Check for unique constraint violation
    if (error.code === "23505") {
      return { success: false, error: "User is already an admin" }
    }
    
    return { success: false, error: "Failed to add admin role" }
  }
}

/**
 * Remove admin role from a user
 */
export async function removeAdminRole(userId: string) {
  try {
    await db.delete(adminRolesTable).where(eq(adminRolesTable.userId, userId))
    return { success: true }
  } catch (error) {
    console.error("Error removing admin role:", error)
    return { success: false, error: "Failed to remove admin role" }
  }
}

/**
 * Remove admin role by email
 */
export async function removeAdminRoleByEmail(email: string) {
  try {
    await db.delete(adminRolesTable).where(eq(adminRolesTable.email, email))
    return { success: true }
  } catch (error) {
    console.error("Error removing admin role:", error)
    return { success: false, error: "Failed to remove admin role" }
  }
}
