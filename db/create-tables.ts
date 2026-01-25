import { readFileSync } from 'fs';
import { join } from 'path';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL not found');
}

const sql = postgres(connectionString, { max: 1 });

async function createTables() {
  try {
    console.log('Creating base tables...');
    
    const sqlFile = readFileSync(
      join(process.cwd(), 'db/migrations/0000_create_base_tables.sql'),
      'utf-8'
    );
    
    await sql.unsafe(sqlFile);
    
    console.log('✅ Base tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

createTables();
