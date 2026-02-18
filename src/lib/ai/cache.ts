import { db } from "@/lib/db";
import { aiCache } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function getCachedResponse(
  cacheKey: string
): Promise<string | null> {
  const now = new Date();
  const rows = await db
    .select()
    .from(aiCache)
    .where(and(eq(aiCache.cacheKey, cacheKey), gt(aiCache.expiresAt, now)))
    .limit(1);

  return rows[0]?.response ?? null;
}

export async function setCachedResponse(
  cacheKey: string,
  response: string,
  ttlHours: number = 24
): Promise<void> {
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);

  await db
    .insert(aiCache)
    .values({ cacheKey, response, expiresAt })
    .onConflictDoUpdate({
      target: aiCache.cacheKey,
      set: { response, expiresAt },
    });
}
