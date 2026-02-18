import type { InferSelectModel } from "drizzle-orm";
import type { projects, projectSkills, projectPosts } from "@/lib/db/schema";

export type Project = InferSelectModel<typeof projects>;
export type ProjectSkill = InferSelectModel<typeof projectSkills>;
export type ProjectPost = InferSelectModel<typeof projectPosts>;

export type ProjectWithSkills = Project & {
  projectSkills: { skill: { id: number; slug: string; name: string } }[];
};
