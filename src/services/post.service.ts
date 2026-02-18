import { db } from "@/lib/db";
import { posts, postSkills } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getAllPosts(published?: boolean) {
  return db.query.posts.findMany({
    where: published !== undefined ? eq(posts.published, published) : undefined,
    with: { postSkills: { with: { skill: true } } },
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  });
}

export async function getPostBySlug(slug: string) {
  return db.query.posts.findFirst({
    where: eq(posts.slug, slug),
    with: { postSkills: { with: { skill: true } } },
  });
}

export async function createPost(data: typeof posts.$inferInsert & { skillIds?: number[] }) {
  const { skillIds, ...postData } = data;
  const [post] = await db.insert(posts).values(postData).returning();
  if (skillIds?.length) {
    await db.insert(postSkills).values(
      skillIds.map((skillId) => ({ postId: post.id, skillId }))
    );
  }
  return post;
}

export async function updatePost(slug: string, data: Partial<typeof posts.$inferInsert> & { skillIds?: number[] }) {
  const { skillIds, ...postData } = data;
  const [post] = await db
    .update(posts)
    .set({ ...postData, updatedAt: new Date() })
    .where(eq(posts.slug, slug))
    .returning();
  if (!post) return null;
  if (skillIds !== undefined) {
    await db.delete(postSkills).where(eq(postSkills.postId, post.id));
    if (skillIds.length) {
      await db.insert(postSkills).values(
        skillIds.map((skillId) => ({ postId: post.id, skillId }))
      );
    }
  }
  return post;
}

export async function deletePost(slug: string) {
  const [deleted] = await db.delete(posts).where(eq(posts.slug, slug)).returning();
  return deleted ?? null;
}
