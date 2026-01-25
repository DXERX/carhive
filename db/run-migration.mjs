import { config } from 'dotenv';
import postgres from 'postgres';
import { readFileSync } from 'fs';

config({ path: '.env' });

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('No database connection string found');
  process.exit(1);
}

const sql = postgres(connectionString, { max: 1 });

async function runMigration() {
  try {
    const migrationSQL = readFileSync('./db/migrations/0003_add_bookings_table.sql', 'utf-8');
    await sql.unsafe(migrationSQL);
    console.log('✅ Bookings table created successfully');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    await sql.end();
  }
}

runMigration();
