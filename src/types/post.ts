import type { InferSelectModel } from "drizzle-orm";
import type { posts, postSkills } from "@/lib/db/schema";

export type Post = InferSelectModel<typeof posts>;
export type PostSkill = InferSelectModel<typeof postSkills>;

export type PostWithSkills = Post & {
  postSkills: { skill: { id: number; slug: string; name: string } }[];
};
