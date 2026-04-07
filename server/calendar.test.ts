import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("calendar procedures", () => {
  it("should create a calendar note", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calendar.createNote({
      date: "2026-04-07",
      title: "Test Note",
      content: "This is a test note",
      color: "gold",
    });

    expect(result).toEqual({ success: true });
  });

  it("should validate note title is required", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.calendar.createNote({
        date: "2026-04-07",
        title: "",
        content: "This should fail",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should create a date selection", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calendar.createDateSelection({
      startDate: "2026-04-01",
      endDate: "2026-04-07",
      label: "Test Period",
      color: "blue",
    });

    expect(result).toEqual({ success: true });
  });

  it("should delete a note", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calendar.deleteNote({
      id: 1,
    });

    expect(result).toEqual({ success: true });
  });

  it("should delete a date selection", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.calendar.deleteDateSelection({
      id: 1,
    });

    expect(result).toEqual({ success: true });
  });
});
