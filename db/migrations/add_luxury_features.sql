-- CarHive Luxury Platform Migration
-- Run this SQL in your Supabase SQL Editor

-- ==================================================
-- STEP 1: Add new columns to cars table
-- ==================================================

-- Add chauffeur service availability
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS chauffeur_available BOOLEAN DEFAULT FALSE;

-- Add chauffeur pricing
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS chauffeur_price_per_day DECIMAL(10,2);

-- Add VIP service flag
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS vip_service BOOLEAN DEFAULT FALSE;

-- Add luxury class categorization
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS luxury_class TEXT DEFAULT 'standard';

-- ==================================================
-- STEP 2: Add constraints
-- ==================================================

-- Ensure luxury_class only accepts valid values
ALTER TABLE cars 
ADD CONSTRAINT IF NOT EXISTS luxury_class_check 
CHECK (luxury_class IN ('standard', 'premium', 'luxury', 'executive'));

-- ==================================================
-- STEP 3: Add indexes for better query performance
-- ==================================================

CREATE INDEX IF NOT EXISTS idx_cars_chauffeur_available 
ON cars(chauffeur_available) 
WHERE chauffeur_available = TRUE;

CREATE INDEX IF NOT EXISTS idx_cars_vip_service 
ON cars(vip_service) 
WHERE vip_service = TRUE;

CREATE INDEX IF NOT EXISTS idx_cars_luxury_class 
ON cars(luxury_class);

-- ==================================================
-- STEP 4: Update existing data (Optional)
-- ==================================================

-- Mark luxury vehicles as VIP service
-- Uncomment and customize based on your existing data

/*
UPDATE cars 
SET 
    vip_service = TRUE, 
    luxury_class = 'luxury',
    chauffeur_available = TRUE
WHERE body_style IN ('Sports Car', 'Sedan') 
  AND price_per_day > 150;

-- Set chauffeur pricing (e.g., 50% of base price)
UPDATE cars 
SET chauffeur_price_per_day = price_per_day * 0.5
WHERE chauffeur_available = TRUE;

-- Update minivans for VIP transport
UPDATE cars 
SET 
    vip_service = TRUE,
    luxury_class = 'premium',
    chauffeur_available = TRUE,
    chauffeur_price_per_day = price_per_day * 0.4
WHERE body_style = 'Minivan';

-- Mark executive class vehicles
UPDATE cars 
SET luxury_class = 'executive'
WHERE price_per_day > 200 
  AND body_style IN ('Sedan', 'SUV');
*/

-- ==================================================
-- STEP 5: Verify changes
-- ==================================================

-- Check the schema
SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM information_schema.columns
WHERE table_name = 'cars'
  AND column_name IN (
    'chauffeur_available',
    'chauffeur_price_per_day',
    'vip_service',
    'luxury_class'
  )
ORDER BY ordinal_position;

-- Count vehicles by luxury class
SELECT 
    luxury_class,
    COUNT(*) as vehicle_count,
    COUNT(CASE WHEN chauffeur_available THEN 1 END) as with_chauffeur,
    COUNT(CASE WHEN vip_service THEN 1 END) as vip_count
FROM cars
GROUP BY luxury_class
ORDER BY 
    CASE luxury_class
        WHEN 'executive' THEN 1
        WHEN 'luxury' THEN 2
        WHEN 'premium' THEN 3
        WHEN 'standard' THEN 4
    END;

-- ==================================================
-- ROLLBACK (Run only if you need to undo changes)
-- ==================================================

/*
-- Drop indexes
DROP INDEX IF EXISTS idx_cars_chauffeur_available;
DROP INDEX IF EXISTS idx_cars_vip_service;
DROP INDEX IF EXISTS idx_cars_luxury_class;

-- Remove constraints
ALTER TABLE cars DROP CONSTRAINT IF EXISTS luxury_class_check;

-- Drop columns
ALTER TABLE cars 
DROP COLUMN IF EXISTS chauffeur_available,
DROP COLUMN IF EXISTS chauffeur_price_per_day,
DROP COLUMN IF EXISTS vip_service,
DROP COLUMN IF EXISTS luxury_class;
*/
