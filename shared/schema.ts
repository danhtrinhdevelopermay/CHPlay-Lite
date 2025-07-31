import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for user authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User table for storing user information
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const apps = pgTable("apps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  developer: text("developer").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  totalReviews: integer("total_reviews").notNull(),
  downloads: text("downloads").notNull(),
  contentRating: text("content_rating").notNull(),
  description: text("description").notNull(),
  lastUpdated: text("last_updated").notNull(),
  version: text("version").notNull(),
  screenshots: text("screenshots").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  appId: varchar("app_id").references(() => apps.id).notNull(),
  userName: text("user_name").notNull(),
  userAvatar: text("user_avatar").notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const developerApps = pgTable("developer_apps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  developer: text("developer").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
});

export const similarApps = pgTable("similar_apps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  developer: text("developer").notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
});

export const insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export const insertDeveloperAppSchema = createInsertSchema(developerApps).omit({
  id: true,
});

export const insertSimilarAppSchema = createInsertSchema(similarApps).omit({
  id: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertApp = z.infer<typeof insertAppSchema>;
export type App = typeof apps.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertDeveloperApp = z.infer<typeof insertDeveloperAppSchema>;
export type DeveloperApp = typeof developerApps.$inferSelect;
export type InsertSimilarApp = z.infer<typeof insertSimilarAppSchema>;
export type SimilarApp = typeof similarApps.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
