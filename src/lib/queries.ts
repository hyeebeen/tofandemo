import { db } from "@/lib/db";
import { projects, posts, skills, experiences } from "@/lib/db/schema";
import { eq, desc, asc } from "drizzle-orm";

// ==================== Projects ====================

export async function getPublishedProjects() {
  try {
    return await db.query.projects.findMany({
      where: eq(projects.published, true),
      with: { projectSkills: { with: { skill: true } } },
      orderBy: [asc(projects.sortOrder)],
    });
  } catch {
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    return await db.query.projects.findMany({
      where: eq(projects.featured, true),
      with: { projectSkills: { with: { skill: true } } },
      orderBy: [asc(projects.sortOrder)],
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await db.query.projects.findFirst({
      where: eq(projects.slug, slug),
      with: {
        projectSkills: { with: { skill: true } },
        projectPosts: { with: { post: true } },
      },
    });
  } catch {
    return undefined;
  }
}

export async function getAllProjectSlugs() {
  try {
    return await db.select({ slug: projects.slug }).from(projects).where(eq(projects.published, true));
  } catch {
    return [];
  }
}

// ==================== Posts ====================

export async function getPublishedPosts() {
  try {
    return await db.query.posts.findMany({
      where: eq(posts.published, true),
      with: { postSkills: { with: { skill: true } } },
      orderBy: [desc(posts.createdAt)],
    });
  } catch {
    return [];
  }
}

export async function getRecentPosts(limit = 3) {
  try {
    return await db.query.posts.findMany({
      where: eq(posts.published, true),
      with: { postSkills: { with: { skill: true } } },
      orderBy: [desc(posts.createdAt)],
      limit,
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
      with: {
        postSkills: { with: { skill: true } },
        projectPosts: { with: { project: true } },
      },
    });
  } catch {
    return undefined;
  }
}

export async function getAllPostSlugs() {
  try {
    return await db.select({ slug: posts.slug }).from(posts).where(eq(posts.published, true));
  } catch {
    return [];
  }
}

// ==================== Skills ====================

export async function getAllSkills() {
  try {
    return await db.query.skills.findMany({
      orderBy: [asc(skills.sortOrder)],
    });
  } catch {
    return [];
  }
}

// ==================== Experiences ====================

export async function getAllExperiences() {
  try {
    return await db.query.experiences.findMany({
      with: { experienceSkills: { with: { skill: true } } },
      orderBy: [asc(experiences.sortOrder)],
    });
  } catch {
    return [];
  }
}

// ==================== Types ====================

export type ProjectWithSkills = Awaited<ReturnType<typeof getPublishedProjects>>[number];
export type ProjectDetail = Awaited<ReturnType<typeof getProjectBySlug>>;
export type PostWithSkills = Awaited<ReturnType<typeof getPublishedPosts>>[number];
export type PostDetail = Awaited<ReturnType<typeof getPostBySlug>>;
export type SkillRow = Awaited<ReturnType<typeof getAllSkills>>[number];
export type ExperienceWithSkills = Awaited<ReturnType<typeof getAllExperiences>>[number];
