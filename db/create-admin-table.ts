import { db } from "./index"
import { sql } from "drizzle-orm"

async function createAdminRolesTable() {
  console.log("Creating admin_roles table...")

  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_roles (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        role TEXT NOT NULL DEFAULT 'admin',
        added_by TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `)

    console.log("✅ admin_roles table created successfully")

    // Add index for faster lookups
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_admin_roles_user_id ON admin_roles(user_id);
    `)

    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS idx_admin_roles_email ON admin_roles(email);
    `)

    console.log("✅ Indexes created successfully")

    // Migrate from env variable if exists
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || []
    if (adminEmails.length > 0) {
      console.log(`\nMigrating ${adminEmails.length} admin(s) from ADMIN_EMAILS...`)
      
      for (const email of adminEmails) {
        try {
          // Insert if not exists (using a dummy user_id for env-based admins)
          await db.execute(sql`
            INSERT INTO admin_roles (user_id, email, added_by, role)
            VALUES (${'env_' + email}, ${email}, 'system', 'admin')
            ON CONFLICT (email) DO NOTHING;
          `)
          console.log(`  ✅ Added ${email}`)
        } catch (error) {
          console.log(`  ⚠️  Skipped ${email} (may already exist)`)
        }
      }
    }

    console.log("\n✅ Migration completed successfully!")
    console.log("\nNext steps:")
    console.log("1. Visit /admin/users to manage admin roles")
    console.log("2. Remove ADMIN_EMAILS from .env once you've set up admins in the database")
    
  } catch (error) {
    console.error("❌ Error creating admin_roles table:", error)
    throw error
  }

  process.exit(0)
}

createAdminRolesTable()
