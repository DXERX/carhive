import { db } from "../db/index"
import { sql } from "drizzle-orm"

async function checkAdmin() {
  try {
    const adminRoles = await db.execute(sql`SELECT id, user_id, email, role, added_by, created_at FROM admin_roles ORDER BY created_at`)
    console.log("Admin Roles count:", adminRoles.length || (adminRoles as any).rowCount || 0)
    console.log("Admin Roles data:", adminRoles)
    
    const locations = await db.execute(sql`SELECT id, name, status FROM locations LIMIT 5`)
    console.log("\nLocations count:", locations.length || (locations as any).rowCount || 0)
    console.log("Locations data:", locations)
    
    process.exit(0)
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

checkAdmin()
