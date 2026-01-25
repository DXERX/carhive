import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

config({ path: ".env" })

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL

// Only create connection if we have a valid connection string
let db: any

if (connectionString && (connectionString.startsWith('postgresql://') || connectionString.startsWith('postgres://'))) {
  try {
    const client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      max_lifetime: 60 * 30,
      onnotice: () => {},
      connection: {
        application_name: 'carhive',
      },
    })
    db = drizzle(client, { schema })
  } catch (error) {
    console.warn('Database connection failed, using mock:', error)
    db = null
  }
} else {
  // No database configured - this is fine, features will use static data
  db = null
}

export { db }
