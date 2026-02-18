import { db } from "@/lib/db";
import { projects, projectSkills, skills } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getAllProjects(published?: boolean) {
  const result = await db.query.projects.findMany({
    where: published !== undefined ? eq(projects.published, published) : undefined,
    with: { projectSkills: { with: { skill: true } } },
    orderBy: (p, { asc }) => [asc(p.sortOrder)],
  });
  return result;
}

export async function getProjectBySlug(slug: string) {
  return db.query.projects.findFirst({
    where: eq(projects.slug, slug),
    with: { projectSkills: { with: { skill: true } } },
  });
}

export async function createProject(data: typeof projects.$inferInsert & { skillIds?: number[] }) {
  const { skillIds, ...projectData } = data;
  const [project] = await db.insert(projects).values(projectData).returning();
  if (skillIds?.length) {
    await db.insert(projectSkills).values(
      skillIds.map((skillId) => ({ projectId: project.id, skillId }))
    );
  }
  return project;
}

export async function updateProject(slug: string, data: Partial<typeof projects.$inferInsert> & { skillIds?: number[] }) {
  const { skillIds, ...projectData } = data;
  const [project] = await db
    .update(projects)
    .set({ ...projectData, updatedAt: new Date() })
    .where(eq(projects.slug, slug))
    .returning();
  if (!project) return null;
  if (skillIds !== undefined) {
    await db.delete(projectSkills).where(eq(projectSkills.projectId, project.id));
    if (skillIds.length) {
      await db.insert(projectSkills).values(
        skillIds.map((skillId) => ({ projectId: project.id, skillId }))
      );
    }
  }
  return project;
}

export async function deleteProject(slug: string) {
  const [deleted] = await db.delete(projects).where(eq(projects.slug, slug)).returning();
  return deleted ?? null;
}
