import { pgTable, integer, text, timestamp, boolean } from "drizzle-orm/pg-core"

export const settingsTable = pgTable("settings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  category: text("category").notNull(), // general, notifications, database, security, api, email, advanced
  description: text("description"),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export type InsertSetting = typeof settingsTable.$inferInsert
export type SelectSetting = typeof settingsTable.$inferSelect
