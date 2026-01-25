import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL not found');
}

const sql = postgres(connectionString, { max: 1 });

async function dropAndRecreateTables() {
  try {
    console.log('Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS cars CASCADE`;
    await sql`DROP TABLE IF EXISTS locations CASCADE`;
    
    console.log('Creating locations table...');
    await sql`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        image_url TEXT,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Creating cars table...');
    await sql`
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        body_style TEXT NOT NULL,
        powertrain TEXT NOT NULL,
        transmission TEXT NOT NULL,
        seats SMALLINT NOT NULL,
        description TEXT NOT NULL,
        features TEXT[] NOT NULL,
        rating DECIMAL(2,1) NOT NULL,
        review_count DECIMAL(10,0) NOT NULL,
        unlimited_mileage BOOLEAN DEFAULT FALSE,
        chauffeur_available BOOLEAN DEFAULT FALSE,
        chauffeur_price_per_day DECIMAL(10,2),
        vip_service BOOLEAN DEFAULT FALSE,
        luxury_class TEXT DEFAULT 'standard',
        image_url TEXT NOT NULL,
        price_per_day DECIMAL(10,2) NOT NULL,
        currency TEXT NOT NULL DEFAULT 'usd',
        price_id TEXT DEFAULT '',
        status TEXT DEFAULT 'active',
        metadata JSONB,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Creating indexes...');
    await sql`CREATE INDEX idx_locations_slug ON locations(slug)`;
    await sql`CREATE INDEX idx_locations_featured ON locations(featured) WHERE featured = TRUE`;
    await sql`CREATE INDEX idx_cars_slug ON cars(slug)`;
    await sql`CREATE INDEX idx_cars_body_style ON cars(body_style)`;
    await sql`CREATE INDEX idx_cars_powertrain ON cars(powertrain)`;
    
    console.log('✅ Tables recreated successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

dropAndRecreateTables();
