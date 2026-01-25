import { auth, currentUser } from "@clerk/nextjs/server"
import { isAdminByEmail } from "@/db/queries/admin-repository"

/**
 * Check if the current user is an admin
 * Also supports fallback to ADMIN_EMAILS env variable for initial setup
 */
export async function checkIsAdmin(): Promise<boolean> {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    return false
  }

  const userEmail = user.emailAddresses[0]?.emailAddress
  if (!userEmail) {
    return false
  }

  // Check database first
  const isAdminDB = await isAdminByEmail(userEmail)
  if (isAdminDB) {
    return true
  }

  // Fallback to env variable for initial setup
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return adminEmails.includes(userEmail)
}

/**
 * Get current admin user or null
 */
export async function getCurrentAdmin() {
  const user = await currentUser()
  if (!user) return null

  const isAdmin = await checkIsAdmin()
  if (!isAdmin) return null

  return user
}
