import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function submitMessage(data: typeof messages.$inferInsert) {
  const [msg] = await db.insert(messages).values(data).returning();
  return msg;
}

export async function getAllMessages() {
  return db.query.messages.findMany({
    orderBy: (m, { desc }) => [desc(m.createdAt)],
  });
}

export async function markAsRead(id: number) {
  const [msg] = await db
    .update(messages)
    .set({ isRead: true })
    .where(eq(messages.id, id))
    .returning();
  return msg ?? null;
}

export async function replyToMessage(id: number, reply: string) {
  const [msg] = await db
    .update(messages)
    .set({ reply, isRead: true })
    .where(eq(messages.id, id))
    .returning();
  return msg ?? null;
}

export async function deleteMessage(id: number) {
  const [deleted] = await db.delete(messages).where(eq(messages.id, id)).returning();
  return deleted ?? null;
}
