import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Calendar notes table - stores notes attached to specific dates
 */
export const calendarNotes = mysqlTable("calendar_notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD format
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  color: varchar("color", { length: 20 }).default("default").notNull(), // default, gold, rose, blue, green
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CalendarNote = typeof calendarNotes.$inferSelect;
export type InsertCalendarNote = typeof calendarNotes.$inferInsert;

/**
 * Date selections table - stores selected date ranges
 */
export const dateSelections = mysqlTable("date_selections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  startDate: varchar("startDate", { length: 10 }).notNull(), // YYYY-MM-DD format
  endDate: varchar("endDate", { length: 10 }).notNull(), // YYYY-MM-DD format
  label: varchar("label", { length: 255 }),
  color: varchar("color", { length: 20 }).default("default").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DateSelection = typeof dateSelections.$inferSelect;
export type InsertDateSelection = typeof dateSelections.$inferInsert;