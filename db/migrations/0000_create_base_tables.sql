-- Base Tables Creation for CarHive
-- This creates the initial locations and cars tables

-- ==================================================
-- Create locations table
-- ==================================================
CREATE TABLE IF NOT EXISTS locations (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ==================================================
-- Create cars table
-- ==================================================
CREATE TABLE IF NOT EXISTS cars (
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
);

-- ==================================================
-- Create indexes
-- ==================================================
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_featured ON locations(featured) WHERE featured = TRUE;

CREATE INDEX IF NOT EXISTS idx_cars_slug ON cars(slug);
CREATE INDEX IF NOT EXISTS idx_cars_body_style ON cars(body_style);
CREATE INDEX IF NOT EXISTS idx_cars_powertrain ON cars(powertrain);
CREATE INDEX IF NOT EXISTS idx_cars_location ON cars(location_id);
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(available) WHERE available = TRUE;
