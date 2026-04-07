import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  calendar: router({
    getNotes: protectedProcedure
      .input(z.object({ year: z.number(), month: z.number() }))
      .query(async ({ ctx, input }) => {
        const notes = await db.getNotesByUserAndMonth(ctx.user.id, input.year, input.month);
        return notes;
      }),

    createNote: protectedProcedure
      .input(
        z.object({
          date: z.string(),
          title: z.string().min(1),
          content: z.string().optional(),
          color: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.createCalendarNote(
          ctx.user.id,
          input.date,
          input.title,
          input.content,
          input.color
        );
        return { success: true };
      }),

    updateNote: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1),
          content: z.string().optional(),
          color: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.updateCalendarNote(
          input.id,
          ctx.user.id,
          input.title,
          input.content,
          input.color
        );
        return { success: true };
      }),

    deleteNote: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteCalendarNote(input.id, ctx.user.id);
        return { success: true };
      }),

    getDateSelections: protectedProcedure
      .input(z.object({ year: z.number(), month: z.number() }))
      .query(async ({ ctx, input }) => {
        const selections = await db.getDateSelectionsByUserAndMonth(
          ctx.user.id,
          input.year,
          input.month
        );
        return selections;
      }),

    createDateSelection: protectedProcedure
      .input(
        z.object({
          startDate: z.string(),
          endDate: z.string(),
          label: z.string().optional(),
          color: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        await db.createDateSelection(
          ctx.user.id,
          input.startDate,
          input.endDate,
          input.label,
          input.color
        );
        return { success: true };
      }),

    deleteDateSelection: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.deleteDateSelection(input.id, ctx.user.id);
        return { success: true };
      }),
  }),
});



export type AppRouter = typeof appRouter;
