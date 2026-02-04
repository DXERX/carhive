import { auth, currentUser } from "@clerk/nextjs/server"
import { isAdminByEmail as isAdminByEmailDB } from "@/db/queries/admin-repository"

// Re-export for convenience in server actions
export { isAdminByEmailDB as isAdminByEmail }

/**
 * Check if the current user is an admin
 * Also supports fallback to ADMIN_EMAILS env variable for initial setup
 */
export async function checkIsAdmin(): Promise<boolean> {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    console.log("[Admin Check] No user authenticated")
    return false
  }

  const userEmail = user.emailAddresses[0]?.emailAddress
  if (!userEmail) {
    console.log("[Admin Check] User has no email addresses")
    return false
  }

  console.log("[Admin Check] Checking email:", userEmail)

  // Check database first
  const isAdminDB = await isAdminByEmailDB(userEmail)
  if (isAdminDB) {
    console.log("[Admin Check] ✓ User is admin (from database)")
    return true
  }

  // Fallback to env variable for initial setup
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
  console.log("[Admin Check] Admin emails from env:", adminEmails)
  const isAdmin = adminEmails.includes(userEmail)
  console.log("[Admin Check] ✓ User is admin (from env):", isAdmin)
  return isAdmin
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
