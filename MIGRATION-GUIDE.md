# Migration Guide - Transforming CarHive to Luxury VIP Service

## Overview
This guide documents the transformation of CarHive from a standard car rental platform to a luxury VIP car rental service inspired by Vip Car Istanbul and Avis Turkey.

## Changes Made

### 1. Multi-Language Support (i18n)

**Added Languages:**
- English (EN) - Default
- Turkish (TR) - Full localization
- Arabic (AR) - RTL support

**Files Created:**
- `/messages/en.json` - English translations
- `/messages/tr.json` - Turkish translations
- `/messages/ar.json` - Arabic translations
- `/i18n.ts` - i18n configuration
- `/components/language-switcher.tsx` - Language selector component

**Files Modified:**
- `middleware.ts` - Added i18n middleware
- `next.config.js` - Integrated next-intl plugin
- `app/layout.tsx` - Added NextIntlClientProvider and RTL support

### 2. Database Schema Enhancements

**New Columns Added to `cars` Table:**

```sql
ALTER TABLE cars ADD COLUMN chauffeur_available BOOLEAN DEFAULT FALSE;
ALTER TABLE cars ADD COLUMN chauffeur_price_per_day DECIMAL(10,2);
ALTER TABLE cars ADD COLUMN vip_service BOOLEAN DEFAULT FALSE;
ALTER TABLE cars ADD COLUMN luxury_class TEXT DEFAULT 'standard';
```

**Files Modified:**
- [`db/schema.ts`](db/schema.ts) - Updated carsTable with new luxury fields
- [`lib/types.ts`](lib/types.ts) - Added ServiceType and LuxuryClass enums

### 3. Car Types & Categories Update

**Files Modified:**
- [`data/car-types.js`](data/car-types.js)

**Changes:**
- Reordered to prioritize luxury vehicles
- Added multi-language names (nameAr, nameTr)
- Added `featured` flag
- New categories: "Luxury Sedan", "Premium SUV", "VIP Minivan", "Executive Class"
- Added `luxuryClasses` export for tier classification

### 4. New VIP Service Components

**Files Created:**
- [`app/(app)/(home)/components/vip-services.tsx`](app/(app)/(home)/components/vip-services.tsx) - Displays premium services
- [`app/(app)/(home)/components/hero-new.tsx`](app/(app)/(home)/components/hero-new.tsx) - Luxury-focused hero
- [`components/availability-badge.tsx`](components/availability-badge.tsx) - 24/7 availability indicator
- [`components/language-switcher.tsx`](components/language-switcher.tsx) - Language selection dropdown

### 5. Homepage Updates

**File Modified:**
- [`app/(app)/(home)/page.tsx`](app/(app)/(home)/page.tsx)

**Changes:**
- Added VipServices section after Hero
- Reordered sections for better luxury service flow

### 6. Site Configuration

**File Modified:**
- [`config/site.ts`](config/site.ts)

**Changes:**
- Updated site name to "CarHive - Premium Luxury Car Rental"
- Enhanced description with luxury focus
- Added features array
- Added serviceAreas array
- Added contact information structure

### 7. Header Enhancement

**File Modified:**
- [`components/site-header.tsx`](components/site-header.tsx)

**Changes:**
- Added LanguageSwitcher component
- Updated layout to accommodate language selector

## Database Migration Steps

### Step 1: Update Schema
The schema has been updated in [`db/schema.ts`](db/schema.ts). You need to apply these changes to your Supabase database.

### Step 2: Apply Migration (Two Options)

**Option A: Using Drizzle Push (Recommended for Supabase)**
```bash
pnpm db:push
```

**Option B: Manual SQL in Supabase Dashboard**

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the following SQL:

```sql
-- Add new columns to cars table
ALTER TABLE cars 
ADD COLUMN IF NOT EXISTS chauffeur_available BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS chauffeur_price_per_day DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS vip_service BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS luxury_class TEXT DEFAULT 'standard';

-- Add check constraint for luxury_class
ALTER TABLE cars 
ADD CONSTRAINT luxury_class_check 
CHECK (luxury_class IN ('standard', 'premium', 'luxury', 'executive'));
```

### Step 3: Update Existing Data (Optional)

```sql
-- Mark premium vehicles as VIP service
UPDATE cars 
SET vip_service = TRUE, 
    luxury_class = 'luxury' 
WHERE body_style IN ('Sports Car', 'Executive');

-- Enable chauffeur service for luxury vehicles
UPDATE cars 
SET chauffeur_available = TRUE,
    chauffeur_price_per_day = price_per_day * 0.5
WHERE luxury_class IN ('luxury', 'executive');
```

## Environment Setup

### Supabase Connection

Update your `.env` file:

```env
POSTGRES_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

Replace:
- `[PASSWORD]` with your actual database password
- `[PROJECT-REF]` with your Supabase project reference

## Testing the Changes

### 1. Test Multi-Language Support
- Navigate to homepage
- Click language switcher in header
- Verify content changes for EN/TR/AR
- Check RTL layout for Arabic

### 2. Test New Components
- Verify VIP Services section displays on homepage
- Check 24/7 availability badge appears
- Confirm language switcher works correctly

### 3. Test Database Schema
```typescript
// Example: Query cars with chauffeur service
const chauffeurCars = await db
  .select()
  .from(carsTable)
  .where(eq(carsTable.chauffeurAvailable, true));
```

## Next Steps

1. **Seed Database**: Add luxury vehicles with new fields
   ```bash
   pnpm db:seed
   ```

2. **Update Car Listings**: Modify existing cars to include:
   - Chauffeur availability
   - VIP service flags
   - Luxury class designation

3. **Add Search Filters**: Implement filtering by:
   - Service type (self-drive vs chauffeur)
   - Luxury class
   - VIP service availability

4. **Enhance Booking Flow**: Update booking to support:
   - Chauffeur service selection
   - Price calculation with chauffeur add-on
   - VIP service premium features

5. **Content Updates**: Add:
   - Professional driver profiles
   - VIP service testimonials
   - Airport transfer information
   - Corporate account features

## Rollback Instructions

If you need to rollback the database changes:

```sql
-- Remove new columns
ALTER TABLE cars 
DROP COLUMN IF EXISTS chauffeur_available,
DROP COLUMN IF EXISTS chauffeur_price_per_day,
DROP COLUMN IF EXISTS vip_service,
DROP COLUMN IF EXISTS luxury_class;
```

## Support

For issues or questions:
1. Check the main README-LUXURY.md
2. Review Supabase dashboard for database issues
3. Verify all environment variables are set correctly

---

**Important Notes:**
- Always backup your database before running migrations
- Test thoroughly in development before deploying to production
- Update any existing seed data to include new fields
- Monitor Supabase logs for connection issues
