import { db } from "./index"
import { sql } from "drizzle-orm"

async function addLocationStatus() {
  try {
    console.log("Adding status column to locations table...")
    
    // Add status column with default value 'active'
    await db.execute(sql`
      ALTER TABLE locations 
      ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active'
    `)
    
    console.log("✅ Status column added to locations table")
    
    // Verify the change
    const result = await db.execute(sql`
      SELECT column_name, data_type, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'locations' 
      AND column_name = 'status'
    `)
    
    console.log("Column details:", result.rows)
    
    process.exit(0)
  } catch (error) {
    console.error("❌ Error adding status column:", error)
    process.exit(1)
  }
}

addLocationStatus()
