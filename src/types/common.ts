import type { InferSelectModel } from "drizzle-orm";
import type {
  skills,
  experiences,
  messages,
  experienceSkills,
  aiCache,
  aiUsage,
} from "@/lib/db/schema";

export type Skill = InferSelectModel<typeof skills>;
export type Experience = InferSelectModel<typeof experiences>;
export type Message = InferSelectModel<typeof messages>;
export type ExperienceSkill = InferSelectModel<typeof experienceSkills>;
export type AiCache = InferSelectModel<typeof aiCache>;
export type AiUsage = InferSelectModel<typeof aiUsage>;

export type ExperienceWithSkills = Experience & {
  experienceSkills: { skill: { id: number; slug: string; name: string } }[];
};
