import { db } from "@/lib/db";
import { skills } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getAllSkills() {
  return db.query.skills.findMany({
    orderBy: (s, { asc }) => [asc(s.sortOrder)],
  });
}

export async function getSkillBySlug(slug: string) {
  return db.query.skills.findFirst({
    where: eq(skills.slug, slug),
  });
}

export async function createSkill(data: typeof skills.$inferInsert) {
  const [skill] = await db.insert(skills).values(data).returning();
  return skill;
}

export async function updateSkill(slug: string, data: Partial<typeof skills.$inferInsert>) {
  const [skill] = await db
    .update(skills)
    .set(data)
    .where(eq(skills.slug, slug))
    .returning();
  return skill ?? null;
}

export async function deleteSkill(slug: string) {
  const [deleted] = await db.delete(skills).where(eq(skills.slug, slug)).returning();
  return deleted ?? null;
}
