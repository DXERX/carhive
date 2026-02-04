import { db } from "@/db"
import {
  heroSectionsTable,
  featuresTable,
  testimonialsTable,
  ctaSectionsTable,
  settingsTable,
} from "@/db/schema"
import { logger } from "@/lib/logger"

export async function seedContentTables() {
  try {
    if (!db) {
      logger.error("Database not available for seeding", "seed-content")
      return
    }

    logger.info("Starting content tables seeding", "seed-content")

    // Seed Hero Sections
    await db.insert(heroSectionsTable).values([
      {
        title: "Experience Luxury Car Rentals",
        subtitle: "Rent premium vehicles for unforgettable journeys",
        ctaText: "Book Now",
        ctaUrl: "/reservation",
        order: 0,
        active: true,
      },
    ])

    // Seed Features
    await db.insert(featuresTable).values([
      {
        title: "Premium Fleet",
        description: "Choose from a carefully curated selection of luxury vehicles",
        icon: "car",
        order: 0,
        active: true,
      },
      {
        title: "Professional Service",
        description: "Expert drivers and 24/7 customer support",
        icon: "users",
        order: 1,
        active: true,
      },
      {
        title: "Flexible Pricing",
        description: "Competitive rates with transparent pricing",
        icon: "wallet",
        order: 2,
        active: true,
      },
      {
        title: "Convenient Booking",
        description: "Easy online booking with instant confirmation",
        icon: "calendar",
        order: 3,
        active: true,
      },
    ])

    // Seed Testimonials
    await db.insert(testimonialsTable).values([
      {
        name: "John Smith",
        role: "Business Executive",
        content: "Outstanding service! The cars are immaculate and the staff is professional.",
        rating: 5,
        order: 0,
        active: true,
      },
      {
        name: "Sarah Johnson",
        role: "Travel Blogger",
        content: "Best car rental experience I've had. Highly recommended!",
        rating: 5,
        order: 1,
        active: true,
      },
      {
        name: "Ahmed Hassan",
        role: "Corporate Manager",
        content: "Reliable, efficient, and professional. Perfect for business travel.",
        rating: 5,
        order: 2,
        active: true,
      },
    ])

    // Seed CTA Sections
    await db.insert(ctaSectionsTable).values([
      {
        title: "Ready to Experience Luxury?",
        description: "Browse our fleet and book your perfect ride today",
        ctaText: "View Fleet",
        ctaUrl: "/cars",
        order: 0,
        active: true,
      },
    ])

    // Seed Settings
    await db.insert(settingsTable).values([
      {
        key: "site_name",
        value: "AVIS Luxury Rentals",
        type: "string",
        description: "Main site name",
      },
      {
        key: "maintenance_mode",
        value: "false",
        type: "boolean",
        description: "Is the site in maintenance mode?",
      },
      {
        key: "default_currency",
        value: "USD",
        type: "string",
        description: "Default currency for pricing",
      },
    ])

    logger.info("Content tables seeding completed successfully", "seed-content")
  } catch (error) {
    logger.error("Failed to seed content tables", "seed-content", error)
    throw error
  }
}
