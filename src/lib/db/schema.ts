import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  date,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ==================== 核心实体表 ====================

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 128 }).unique().notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description").notNull(),
  content: text("content"),
  coverImage: varchar("cover_image", { length: 512 }),
  repoUrl: varchar("repo_url", { length: 512 }),
  demoUrl: varchar("demo_url", { length: 512 }),
  category: varchar("category", { length: 64 }),
  featured: boolean("featured").default(false),
  published: boolean("published").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).unique().notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: varchar("cover_image", { length: 512 }),
  type: varchar("type", { length: 32 }).default("original"),
  published: boolean("published").default(false),
  aiSummary: text("ai_summary"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 64 }).unique().notNull(),
  name: varchar("name", { length: 64 }).notNull(),
  category: varchar("category", { length: 64 }),
  icon: varchar("icon", { length: 128 }),
  proficiency: integer("proficiency").default(0),
  sortOrder: integer("sort_order").default(0),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 32 }).unique().notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  title: varchar("title", { length: 256 }).notNull(),
  org: varchar("org", { length: 256 }).notNull(),
  description: text("description"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  sortOrder: integer("sort_order").default(0),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  visitorName: varchar("visitor_name", { length: 128 }).notNull(),
  visitorEmail: varchar("visitor_email", { length: 256 }).notNull(),
  category: varchar("category", { length: 32 }).default("general"),
  subject: varchar("subject", { length: 256 }),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  reply: text("reply"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== N:M 中间表 ====================

export const projectSkills = pgTable(
  "project_skills",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.skillId] })]
);

export const postSkills = pgTable(
  "post_skills",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.postId, t.skillId] })]
);

export const projectPosts = pgTable(
  "project_posts",
  {
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.projectId, t.postId] })]
);

export const experienceSkills = pgTable(
  "experience_skills",
  {
    experienceId: integer("experience_id")
      .notNull()
      .references(() => experiences.id, { onDelete: "cascade" }),
    skillId: integer("skill_id")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.experienceId, t.skillId] })]
);

// ==================== AI 缓存与限流表 ====================

export const aiCache = pgTable("ai_cache", {
  id: serial("id").primaryKey(),
  cacheKey: varchar("cache_key", { length: 256 }).unique().notNull(),
  response: text("response").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aiUsage = pgTable(
  "ai_usage",
  {
    id: serial("id").primaryKey(),
    date: date("date").notNull(),
    endpoint: varchar("endpoint", { length: 64 }).notNull(),
    count: integer("count").default(0),
  },
  (t) => [unique().on(t.date, t.endpoint)]
);

// ==================== Relations ====================

export const projectsRelations = relations(projects, ({ many }) => ({
  projectSkills: many(projectSkills),
  projectPosts: many(projectPosts),
}));

export const postsRelations = relations(posts, ({ many }) => ({
  postSkills: many(postSkills),
  projectPosts: many(projectPosts),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  projectSkills: many(projectSkills),
  postSkills: many(postSkills),
  experienceSkills: many(experienceSkills),
}));

export const experiencesRelations = relations(experiences, ({ many }) => ({
  experienceSkills: many(experienceSkills),
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));

export const postSkillsRelations = relations(postSkills, ({ one }) => ({
  post: one(posts, {
    fields: [postSkills.postId],
    references: [posts.id],
  }),
  skill: one(skills, {
    fields: [postSkills.skillId],
    references: [skills.id],
  }),
}));

export const projectPostsRelations = relations(projectPosts, ({ one }) => ({
  project: one(projects, {
    fields: [projectPosts.projectId],
    references: [projects.id],
  }),
  post: one(posts, {
    fields: [projectPosts.postId],
    references: [posts.id],
  }),
}));

export const experienceSkillsRelations = relations(
  experienceSkills,
  ({ one }) => ({
    experience: one(experiences, {
      fields: [experienceSkills.experienceId],
      references: [experiences.id],
    }),
    skill: one(skills, {
      fields: [experienceSkills.skillId],
      references: [skills.id],
    }),
  })
);
