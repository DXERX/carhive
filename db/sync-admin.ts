import { clerkClient } from "@clerk/nextjs/server"
import { db } from "./index"
import { adminRolesTable } from "./schema"
import { eq } from "drizzle-orm"

async function syncAdminFromEnv() {
  console.log("Syncing admin from ADMIN_EMAILS...")

  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
  
  if (adminEmails.length === 0) {
    console.log("No ADMIN_EMAILS found in environment")
    process.exit(0)
  }

  const client = await clerkClient()

  for (const email of adminEmails) {
    try {
      // Find user by email in Clerk
      const users = await client.users.getUserList({ emailAddress: [email] })
      
      if (users.data.length === 0) {
        console.log(`⚠️  User not found in Clerk: ${email}`)
        continue
      }

      const user = users.data[0]
      
      // Check if already exists
      const existing = await db
        .select()
        .from(adminRolesTable)
        .where(eq(adminRolesTable.email, email))
        .limit(1)

      if (existing.length > 0) {
        // Update user_id if it was a placeholder
        if (existing[0].userId.startsWith('env_')) {
          await db
            .update(adminRolesTable)
            .set({ userId: user.id })
            .where(eq(adminRolesTable.email, email))
          
          console.log(`✅ Updated ${email} with real user ID`)
        } else {
          console.log(`✅ ${email} already synced`)
        }
      } else {
        // Insert new admin
        await db.insert(adminRolesTable).values({
          userId: user.id,
          email: email,
          addedBy: 'system',
          role: 'admin',
        })
        
        console.log(`✅ Added ${email} as admin`)
      }
    } catch (error) {
      console.error(`❌ Error syncing ${email}:`, error)
    }
  }

  console.log("\n✅ Admin sync completed!")
  process.exit(0)
}

syncAdminFromEnv()
