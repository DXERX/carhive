-- Migration: Make userId nullable in bookings table to support guest reservations
-- This allows customers to make reservations without requiring authentication

ALTER TABLE "bookings" ALTER COLUMN "user_id" DROP NOT NULL;

-- Add comment to clarify the field is optional
COMMENT ON COLUMN "bookings"."user_id" IS 'Clerk user ID - null for guest bookings';
