import { auth, currentUser } from "@clerk/nextjs/server"
import { isAdminByEmail as isAdminByEmailDB } from "@/db/queries/admin-repository"
import { logger } from "@/lib/logger"

// Re-export for convenience in server actions
export { isAdminByEmailDB as isAdminByEmail }

/**
 * Check if the current user is an admin
 * Also supports fallback to ADMIN_EMAILS env variable for initial setup
 */
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      logger.debug("No user authenticated", "admin.checkIsAdmin")
      return false
    }

    const userEmail = user.emailAddresses[0]?.emailAddress
    if (!userEmail) {
      logger.debug("User has no email addresses", "admin.checkIsAdmin")
      return false
    }

    logger.debug(`Checking admin status for: ${userEmail}`, "admin.checkIsAdmin")

    // Check database first
    try {
      const isAdminDB = await isAdminByEmailDB(userEmail)
      if (isAdminDB) {
        logger.info("User is admin from database", "admin.checkIsAdmin", { email: userEmail })
        return true
      }
    } catch (dbError) {
      logger.warn("Database admin check failed", "admin.checkIsAdmin", dbError)
      // Continue to env check
    }

    // Fallback to env variable for initial setup
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || []
    const isAdmin = adminEmails.includes(userEmail)
    
    if (isAdmin) {
      logger.info("User is admin from env", "admin.checkIsAdmin", { email: userEmail })
    } else {
      logger.debug("User is not admin", "admin.checkIsAdmin", { email: userEmail })
    }
    
    return isAdmin
  } catch (error) {
    logger.error("Unexpected error checking admin status", "admin.checkIsAdmin", error)
    return false
  }
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
