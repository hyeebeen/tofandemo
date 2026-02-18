import { db } from "@/lib/db";
import { experiences, experienceSkills } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getAllExperiences() {
  return db.query.experiences.findMany({
    with: { experienceSkills: { with: { skill: true } } },
    orderBy: (e, { asc }) => [asc(e.sortOrder)],
  });
}

export async function createExperience(
  data: typeof experiences.$inferInsert & { skillIds?: number[] }
) {
  const { skillIds, ...expData } = data;
  const [exp] = await db.insert(experiences).values(expData).returning();
  if (skillIds?.length) {
    await db.insert(experienceSkills).values(
      skillIds.map((skillId) => ({ experienceId: exp.id, skillId }))
    );
  }
  return exp;
}

export async function updateExperience(
  id: number,
  data: Partial<typeof experiences.$inferInsert> & { skillIds?: number[] }
) {
  const { skillIds, ...expData } = data;
  const [exp] = await db
    .update(experiences)
    .set(expData)
    .where(eq(experiences.id, id))
    .returning();
  if (!exp) return null;
  if (skillIds !== undefined) {
    await db.delete(experienceSkills).where(eq(experienceSkills.experienceId, exp.id));
    if (skillIds.length) {
      await db.insert(experienceSkills).values(
        skillIds.map((skillId) => ({ experienceId: exp.id, skillId }))
      );
    }
  }
  return exp;
}

export async function deleteExperience(id: number) {
  const [deleted] = await db.delete(experiences).where(eq(experiences.id, id)).returning();
  return deleted ?? null;
}
