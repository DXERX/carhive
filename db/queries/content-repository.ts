import { db } from "@/db"
import {
  heroSectionsTable,
  featuresTable,
  testimonialsTable,
  ctaSectionsTable,
  settingsTable,
} from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { logger } from "@/lib/logger"

// Hero Sections
export async function getActiveHeroSections() {
  try {
    if (!db) {
      logger.warn("Database not available for hero sections", "content-repository")
      return []
    }
    const sections = await db
      .select()
      .from(heroSectionsTable)
      .where(eq(heroSectionsTable.active, true))
      .orderBy(heroSectionsTable.order)
    return sections
  } catch (error) {
    logger.error("Failed to fetch hero sections", "content-repository", error)
    return []
  }
}

export async function getAllHeroSections() {
  try {
    if (!db) {
      logger.warn("Database not available for hero sections", "content-repository")
      return []
    }
    const sections = await db
      .select()
      .from(heroSectionsTable)
      .orderBy(heroSectionsTable.order)
    return sections
  } catch (error) {
    logger.error("Failed to fetch all hero sections", "content-repository", error)
    return []
  }
}

// Features
export async function getActiveFeatures() {
  try {
    if (!db) {
      logger.warn("Database not available for features", "content-repository")
      return []
    }
    const features = await db
      .select()
      .from(featuresTable)
      .where(eq(featuresTable.active, true))
      .orderBy(featuresTable.order)
    return features
  } catch (error) {
    logger.error("Failed to fetch features", "content-repository", error)
    return []
  }
}

export async function getAllFeatures() {
  try {
    if (!db) {
      logger.warn("Database not available for features", "content-repository")
      return []
    }
    const features = await db
      .select()
      .from(featuresTable)
      .orderBy(featuresTable.order)
    return features
  } catch (error) {
    logger.error("Failed to fetch all features", "content-repository", error)
    return []
  }
}

// Testimonials
export async function getActiveTestimonials() {
  try {
    if (!db) {
      logger.warn("Database not available for testimonials", "content-repository")
      return []
    }
    const testimonials = await db
      .select()
      .from(testimonialsTable)
      .where(eq(testimonialsTable.active, true))
      .orderBy(testimonialsTable.order)
    return testimonials
  } catch (error) {
    logger.error("Failed to fetch testimonials", "content-repository", error)
    return []
  }
}

export async function getAllTestimonials() {
  try {
    if (!db) {
      logger.warn("Database not available for testimonials", "content-repository")
      return []
    }
    const testimonials = await db
      .select()
      .from(testimonialsTable)
      .orderBy(testimonialsTable.order)
    return testimonials
  } catch (error) {
    logger.error("Failed to fetch all testimonials", "content-repository", error)
    return []
  }
}

// CTA Sections
export async function getActiveCtaSections() {
  try {
    if (!db) {
      logger.warn("Database not available for CTA sections", "content-repository")
      return []
    }
    const sections = await db
      .select()
      .from(ctaSectionsTable)
      .where(eq(ctaSectionsTable.active, true))
      .orderBy(ctaSectionsTable.order)
    return sections
  } catch (error) {
    logger.error("Failed to fetch CTA sections", "content-repository", error)
    return []
  }
}

export async function getAllCtaSections() {
  try {
    if (!db) {
      logger.warn("Database not available for CTA sections", "content-repository")
      return []
    }
    const sections = await db
      .select()
      .from(ctaSectionsTable)
      .orderBy(ctaSectionsTable.order)
    return sections
  } catch (error) {
    logger.error("Failed to fetch all CTA sections", "content-repository", error)
    return []
  }
}

// Settings
export async function getSetting(key: string) {
  try {
    if (!db) {
      logger.warn(`Database not available for setting: ${key}`, "content-repository")
      return null
    }
    const result = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.key, key))
      .limit(1)
    return result[0] || null
  } catch (error) {
    logger.error(`Failed to fetch setting: ${key}`, "content-repository", error)
    return null
  }
}

export async function getAllSettings() {
  try {
    if (!db) {
      logger.warn("Database not available for settings", "content-repository")
      return []
    }
    const settings = await db.select().from(settingsTable)
    return settings
  } catch (error) {
    logger.error("Failed to fetch all settings", "content-repository", error)
    return []
  }
}

export async function upsertSetting(key: string, value: string, type: string = "string") {
  try {
    if (!db) {
      logger.warn(`Database not available to upsert setting: ${key}`, "content-repository")
      return null
    }
    // Try to update, if no rows, insert
    const existing = await db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.key, key))
      .limit(1)

    if (existing.length > 0) {
      await db
        .update(settingsTable)
        .set({ value, type })
        .where(eq(settingsTable.key, key))
    } else {
      await db.insert(settingsTable).values({ key, value, type })
    }
    logger.info(`Setting upserted: ${key}`, "content-repository")
    return { key, value, type }
  } catch (error) {
    logger.error(`Failed to upsert setting: ${key}`, "content-repository", error)
    return null
  }
}
