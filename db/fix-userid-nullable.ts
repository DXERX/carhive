import postgres from "postgres"
import { config } from "dotenv"

config({ path: ".env" })

const sql = postgres(process.env.POSTGRES_URL || process.env.DATABASE_URL || "")

async function fixUserIdColumn() {
  try {
    console.log("Making user_id column nullable...")
    
    await sql`
      ALTER TABLE bookings 
      ALTER COLUMN user_id DROP NOT NULL;
    `
    
    console.log("✅ Successfully made user_id nullable")
    console.log("Guest reservations are now enabled!")
    
    await sql.end()
    process.exit(0)
  } catch (error) {
    console.error("Error:", error)
    await sql.end()
    process.exit(1)
  }
}

fixUserIdColumn()
