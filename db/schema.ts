import {
  boolean,
  decimal,
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const locationsTable = pgTable("locations", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export const carsTable = pgTable("cars", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  bodyStyle: text("body_style").notNull(),
  powertrain: text("powertrain").notNull(),
  transmission: text("transmission").notNull(),
  seats: smallint("seats").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: decimal("review_count", { precision: 10, scale: 0 }).notNull(),
  unlimitedMileage: boolean("unlimited_mileage").default(false),
  chauffeurAvailable: boolean("chauffeur_available").default(false),
  chauffeurPricePerDay: decimal("chauffeur_price_per_day", {
    precision: 10,
    scale: 2,
  }),
  vipService: boolean("vip_service").default(false),
  luxuryClass: text("luxury_class").default("standard"), // standard, premium, luxury, executive
  imageUrl: text("image_url").notNull(),
  pricePerDay: decimal("price_per_day", {
    precision: 10,
    scale: 2,
  }).notNull(),
  currency: text("currency").notNull().default("usd"),
  priceId: text("price_id").default(""),
  status: text("status").default("active"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type InsertLocation = typeof locationsTable.$inferInsert
export type SelectLocation = typeof locationsTable.$inferSelect

export type InsertCar = typeof carsTable.$inferInsert
export type SelectCar = typeof carsTable.$inferSelect

export const bookingsTable = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(), // Clerk user ID
  carId: integer("car_id").notNull().references(() => carsTable.id),
  carName: text("car_name").notNull(),
  carImageUrl: text("car_image_url"),
  
  // Customer info
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp"),
  
  // Booking details
  pickupLocation: text("pickup_location").notNull(),
  checkinDate: timestamp("checkin_date").notNull(),
  checkoutDate: timestamp("checkout_date").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").notNull().default("usd"),
  
  // Additional info
  notes: text("notes"),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, completed
  
  // IP and location tracking
  ipAddress: text("ip_address"),
  country: text("country"),
  city: text("city"),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type InsertBooking = typeof bookingsTable.$inferInsert
export type SelectBooking = typeof bookingsTable.$inferSelect

export const adminRolesTable = pgTable("admin_roles", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull().unique(), // Clerk user ID
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"), // admin, super_admin
  addedBy: text("added_by").notNull(), // User ID who granted admin access
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type InsertAdminRole = typeof adminRolesTable.$inferInsert
export type SelectAdminRole = typeof adminRolesTable.$inferSelect
