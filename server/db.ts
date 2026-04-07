import { and, eq, gte, lte, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, calendarNotes, dateSelections } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getNotesByUserAndMonth(userId: number, year: number, month: number) {
  const db = await getDb();
  if (!db) return [];

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const result = await db
    .select()
    .from(calendarNotes)
    .where(
      and(
        eq(calendarNotes.userId, userId),
        gte(calendarNotes.date, startDate),
        lte(calendarNotes.date, endDate)
      )
    );

  return result;
}

export async function createCalendarNote(
  userId: number,
  date: string,
  title: string,
  content?: string,
  color: string = "default"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(calendarNotes).values({
    userId,
    date,
    title,
    content: content || null,
    color,
  });

  return result;
}

export async function updateCalendarNote(
  id: number,
  userId: number,
  title: string,
  content?: string,
  color: string = "default"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .update(calendarNotes)
    .set({ title, content: content || null, color, updatedAt: new Date() })
    .where(and(eq(calendarNotes.id, id), eq(calendarNotes.userId, userId)));

  return result;
}

export async function deleteCalendarNote(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .delete(calendarNotes)
    .where(and(eq(calendarNotes.id, id), eq(calendarNotes.userId, userId)));

  return result;
}

export async function getDateSelectionsByUserAndMonth(
  userId: number,
  year: number,
  month: number
) {
  const db = await getDb();
  if (!db) return [];

  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const result = await db
    .select()
    .from(dateSelections)
    .where(
      and(
        eq(dateSelections.userId, userId),
        or(
          and(gte(dateSelections.startDate, startDate), lte(dateSelections.startDate, endDate)),
          and(gte(dateSelections.endDate, startDate), lte(dateSelections.endDate, endDate)),
          and(lte(dateSelections.startDate, startDate), gte(dateSelections.endDate, endDate))
        )
      )
    );

  return result;
}

export async function createDateSelection(
  userId: number,
  startDate: string,
  endDate: string,
  label?: string,
  color: string = "default"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(dateSelections).values({
    userId,
    startDate,
    endDate,
    label: label || null,
    color,
  });

  return result;
}

export async function deleteDateSelection(id: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .delete(dateSelections)
    .where(and(eq(dateSelections.id, id), eq(dateSelections.userId, userId)));

  return result;
}

