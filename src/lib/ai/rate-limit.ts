import { db } from "@/lib/db";
import { aiUsage } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

export async function checkRateLimit(
  endpoint: string,
  dailyLimit: number = 50
): Promise<{ allowed: boolean; remaining: number }> {
  const today = new Date().toISOString().split("T")[0];

  const rows = await db
    .select()
    .from(aiUsage)
    .where(and(eq(aiUsage.date, today), eq(aiUsage.endpoint, endpoint)))
    .limit(1);

  const currentCount = rows[0]?.count ?? 0;
  const remaining = Math.max(0, dailyLimit - currentCount);

  return {
    allowed: currentCount < dailyLimit,
    remaining,
  };
}

export async function incrementUsage(endpoint: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  await db
    .insert(aiUsage)
    .values({ date: today, endpoint, count: 1 })
    .onConflictDoUpdate({
      target: [aiUsage.date, aiUsage.endpoint],
      set: { count: sql`${aiUsage.count} + 1` },
    });
}
