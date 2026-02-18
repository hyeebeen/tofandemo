# DevForge 系统架构规格书

<meta>
  <project>DevForge</project>
  <version>1.0.0</version>
  <created>2026-02-18</created>
  <depends>real.md, cog.md</depends>
</meta>

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 包管理 | Bun |
| 数据库 | PostgreSQL (Neon Serverless) |
| ORM | Drizzle ORM |
| 认证 | Better Auth |
| AI | Vercel AI SDK + @ai-sdk/deepseek + @ai-sdk/openai-compatible (Kimi/MiniMax) + 社区 qwen provider |
| 部署 | Vercel |

---

## 架构图

```
┌──────────────────────────────────────────────────────────────────────┐
│                        客户端（浏览器）                               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ 首页     │ │ 项目展示 │ │ 博客阅读 │ │ 联系留言 │ │ 管理后台 │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘  │
└───────┼────────────┼────────────┼────────────┼────────────┼─────────┘
        │            │            │            │            │
        ▼            ▼            ▼            ▼            ▼
┌──────────────────────────────────────────────────────────────────────┐
│                      Next.js 15 App Router                           │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ Middleware (auth guard for /admin/*, rate limiting)            │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ SSG/ISR Pages ──────────┐  ┌─ Server Pages ─────────────────┐  │
│  │ /projects, /projects/[s] │  │ /admin/*, /contact             │  │
│  │ /blog, /blog/[slug]      │  │                                │  │
│  │ /, /about                │  └────────────────────────────────┘  │
│  └──────────────────────────┘                                      │
│                                                                      │
│  ┌─ API Routes (Route Handlers) ─────────────────────────────────┐  │
│  │ /api/auth/**    → Better Auth 处理                            │  │
│  │ /api/ai/*       → AI 代理 (Streaming, Edge Runtime)           │  │
│  │ /api/admin/*    → 管理 CRUD (session 验证)                    │  │
│  │ /api/contact    → 留言提交                                    │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  ┌─ Services Layer ──────────────────────────────────────────────┐  │
│  │ AuthService │ ProjectService │ PostService │ AIService        │  │
│  │ ContactService │ SkillService │ ExperienceService             │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Better Auth  │ │ Drizzle ORM  │ │ Vercel AI SDK│ │ AI Cache     │
│ (认证)       │ │ (数据访问)   │ │ (AI 调用)    │ │ (KV/DB缓存)  │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │
       ▼                ▼                ▼                ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Session      │ │ PostgreSQL   │ │ AI Providers  │ │ ai_cache 表  │
│ (DB存储)     │ │ (Neon 连接池)│ │ DS/Kimi/Qwen │ │ ai_usage 表  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

---

## 子系统

| 子系统 | 职责 | 主要文件 | 约束 |
|--------|------|----------|------|
| Auth | 认证授权、session 管理、admin 路由保护 | `lib/auth/`, `middleware.ts` | C1 |
| Content | 项目与博客的 CRUD、SSG/ISR 渲染 | `services/project.service.ts`, `services/post.service.ts` | C4 |
| AI | AI 代理调用、响应缓存、调用计数 | `services/ai.service.ts`, `lib/ai/` | C2, C3, C5 |
| Contact | 访客留言提交与管理 | `services/contact.service.ts` | C7 |
| Admin | 管理后台面板、内容管理 | `app/(admin)/admin/` | C1 |
| Resume | 技能、经历展示 | `services/skill.service.ts`, `services/experience.service.ts` | — |

---

## API 端点

### 认证 (Auth)

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | /api/auth/sign-in | 管理员登录 |
| POST | /api/auth/sign-out | 登出 |
| GET | /api/auth/session | 获取当前会话 |

### 项目 (Projects)

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | /api/admin/projects | 项目列表（管理端） |
| POST | /api/admin/projects | 创建项目 |
| GET | /api/admin/projects/:slug | 项目详情（管理端） |
| PATCH | /api/admin/projects/:slug | 更新项目 |
| DELETE | /api/admin/projects/:slug | 删除项目 |

### 博客 (Posts)

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | /api/admin/posts | 文章列表（管理端） |
| POST | /api/admin/posts | 创建文章 |
| GET | /api/admin/posts/:slug | 文章详情（管理端） |
| PATCH | /api/admin/posts/:slug | 更新文章 |
| DELETE | /api/admin/posts/:slug | 删除文章 |

### 技能 (Skills)

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | /api/admin/skills | 技能列表 |
| POST | /api/admin/skills | 创建技能 |
| PATCH | /api/admin/skills/:slug | 更新技能 |
| DELETE | /api/admin/skills/:slug | 删除技能 |

### 经历 (Experiences)

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | /api/admin/experiences | 经历列表 |
| POST | /api/admin/experiences | 创建经历 |
| PATCH | /api/admin/experiences/:id | 更新经历 |
| DELETE | /api/admin/experiences/:id | 删除经历 |

### 留言 (Contact)

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | /api/contact | 访客提交留言 |
| GET | /api/admin/messages | 留言列表（管理端） |
| PATCH | /api/admin/messages/:id | 标记已读/回复 |
| DELETE | /api/admin/messages/:id | 删除留言 |

### AI 功能

| 方法 | 端点 | 描述 | 运行时 |
|------|------|------|--------|
| POST | /api/ai/summarize | 博客摘要生成 | Edge |
| POST | /api/ai/recommend | 项目智能推荐 | Edge |

> 所有 `/api/admin/*` 端点均需 Better Auth session 验证（C1）。
> 所有 `/api/ai/*` 端点经 Route Handler 代理，密钥仅存服务端（C2）。

---

## 目录结构

```
src/
├── app/
│   ├── layout.tsx                    # 根布局（主题、字体）
│   ├── page.tsx                      # 首页（SSG）
│   ├── about/
│   │   └── page.tsx                  # 关于页（SSG）
│   ├── projects/
│   │   ├── page.tsx                  # 项目列表（SSG）
│   │   └── [slug]/
│   │       └── page.tsx              # 项目详情（ISR）
│   ├── blog/
│   │   ├── page.tsx                  # 博客列表（SSG）
│   │   └── [slug]/
│   │       └── page.tsx              # 文章详情（ISR）
│   ├── contact/
│   │   └── page.tsx                  # 联系/留言页
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx              # 管理员登录页
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx            # 管理后台布局（session 守卫）
│   │       ├── page.tsx              # 仪表盘
│   │       ├── projects/
│   │       │   ├── page.tsx          # 项目管理列表
│   │       │   └── [slug]/
│   │       │       └── page.tsx      # 项目编辑
│   │       ├── posts/
│   │       │   ├── page.tsx          # 文章管理列表
│   │       │   └── [slug]/
│   │       │       └── page.tsx      # 文章编辑
│   │       ├── skills/
│   │       │   └── page.tsx          # 技能管理
│   │       ├── experiences/
│   │       │   └── page.tsx          # 经历管理
│   │       └── messages/
│   │           └── page.tsx          # 留言管理
│   └── api/
│       ├── auth/
│       │   └── [...all]/
│       │       └── route.ts          # Better Auth catch-all
│       ├── admin/
│       │   ├── projects/
│       │   │   └── route.ts          # 项目 CRUD
│       │   ├── posts/
│       │   │   └── route.ts          # 文章 CRUD
│       │   ├── skills/
│       │   │   └── route.ts          # 技能 CRUD
│       │   ├── experiences/
│       │   │   └── route.ts          # 经历 CRUD
│       │   └── messages/
│       │       └── route.ts          # 留言管理
│       ├── ai/
│       │   ├── summarize/
│       │   │   └── route.ts          # 博客摘要（Edge Runtime）
│       │   └── recommend/
│       │       └── route.ts          # 项目推荐（Edge Runtime）
│       └── contact/
│           └── route.ts              # 访客留言提交
├── components/
│   ├── ui/                           # shadcn/ui 组件
│   ├── layout/
│   │   ├── header.tsx                # 导航栏
│   │   ├── footer.tsx                # 页脚
│   │   └── theme-toggle.tsx          # 暗色模式切换
│   ├── home/
│   │   ├── hero.tsx                  # 首页 Hero
│   │   ├── featured-projects.tsx     # 精选项目
│   │   └── recent-posts.tsx          # 最新博客
│   ├── project/
│   │   ├── project-card.tsx          # 项目卡片
│   │   └── project-detail.tsx        # 项目详情
│   ├── blog/
│   │   ├── post-card.tsx             # 文章卡片
│   │   └── post-content.tsx          # 文章正文渲染
│   ├── contact/
│   │   └── contact-form.tsx          # 留言表单
│   ├── resume/
│   │   ├── skill-badge.tsx           # 技能标签
│   │   └── experience-timeline.tsx   # 经历时间线
│   └── admin/
│       ├── sidebar.tsx               # 管理后台侧边栏
│       ├── project-form.tsx          # 项目编辑表单
│       ├── post-editor.tsx           # 文章 Markdown 编辑器
│       └── data-table.tsx            # 通用数据表格
├── lib/
│   ├── db/
│   │   ├── index.ts                  # Drizzle 客户端（连接池）
│   │   ├── schema.ts                 # 数据库 Schema 定义
│   │   └── migrate.ts               # 迁移脚本
│   ├── auth/
│   │   ├── index.ts                  # Better Auth 配置
│   │   └── client.ts                 # 客户端 auth helper
│   ├── ai/
│   │   ├── index.ts                  # AI SDK 多 Provider 配置（DS/Kimi/Qwen/MiniMax）
│   │   ├── providers.ts              # Provider 注册与模型路由
│   │   ├── cache.ts                  # AI 响应缓存逻辑
│   │   └── rate-limit.ts            # 每日调用上限计数
│   └── utils.ts                      # 通用工具函数
├── services/
│   ├── project.service.ts            # 项目业务逻辑
│   ├── post.service.ts               # 文章业务逻辑
│   ├── skill.service.ts              # 技能业务逻辑
│   ├── experience.service.ts         # 经历业务逻辑
│   ├── contact.service.ts            # 留言业务逻辑
│   └── ai.service.ts                 # AI 功能业务逻辑
├── hooks/
│   ├── use-auth.ts                   # 认证状态 hook
│   └── use-theme.ts                  # 主题切换 hook
├── types/
│   ├── project.ts                    # 项目类型定义
│   ├── post.ts                       # 文章类型定义
│   └── common.ts                     # 通用类型
└── middleware.ts                      # 路由守卫 + 限流
```

---

## 数据库 Schema

```typescript
// ==================== 核心实体表 ====================

// admin（管理员，由 Better Auth 管理）
// Better Auth 自动创建 user, session, account 表

// projects 项目表
projects: {
  id:          serial primaryKey,
  slug:        varchar(128) unique notNull,     // URL 友好标识
  title:       varchar(256) notNull,
  description: text notNull,                    // 项目简介
  content:     text,                            // 项目详细 Markdown
  coverImage:  varchar(512),                    // 封面图 URL
  repoUrl:     varchar(512),                    // GitHub 仓库地址
  demoUrl:     varchar(512),                    // 在线演示地址
  category:    varchar(64),                     // 分类：fullstack/frontend/backend/ai-ml/tool/course
  featured:    boolean default(false),          // 是否精选
  published:   boolean default(false),          // 是否发布
  sortOrder:   integer default(0),              // 排序权重
  createdAt:   timestamp defaultNow(),
  updatedAt:   timestamp defaultNow(),
}

// posts 博客文章表
posts: {
  id:          serial primaryKey,
  slug:        varchar(256) unique notNull,
  title:       varchar(256) notNull,
  excerpt:     text,                            // 摘要
  content:     text notNull,                    // Markdown 正文
  coverImage:  varchar(512),
  type:        varchar(32) default('original'), // original/translation
  published:   boolean default(false),
  aiSummary:   text,                            // AI 生成的摘要（缓存）
  createdAt:   timestamp defaultNow(),
  updatedAt:   timestamp defaultNow(),
}

// skills 技能表
skills: {
  id:          serial primaryKey,
  slug:        varchar(64) unique notNull,      // typescript, react, postgresql
  name:        varchar(64) notNull,             // 显示名称
  category:    varchar(64),                     // language/frontend/backend/ai-ml/tool/soft
  icon:        varchar(128),                    // 图标标识
  proficiency: integer default(0),              // 熟练度 0-100
  sortOrder:   integer default(0),
}

// experiences 经历表
experiences: {
  id:          serial primaryKey,
  code:        varchar(32) unique notNull,      // edu_202209, work_202506
  type:        varchar(32) notNull,             // education/work/opensource
  title:       varchar(256) notNull,            // 职位/学位名称
  org:         varchar(256) notNull,            // 公司/学校名称
  description: text,
  startDate:   date notNull,
  endDate:     date,                            // null 表示至今
  sortOrder:   integer default(0),
}

// messages 留言表
messages: {
  id:          serial primaryKey,
  visitorName: varchar(128) notNull,
  visitorEmail:varchar(256) notNull,
  category:    varchar(32) default('general'),  // job/tech/collab/general
  subject:     varchar(256),
  content:     text notNull,
  isRead:      boolean default(false),
  reply:       text,                            // 管理员回复
  createdAt:   timestamp defaultNow(),
}

// ==================== 关系中间表 ====================

// project_skills 项目-技能（N:M）
projectSkills: {
  projectId:   integer references(projects.id) onDelete cascade,
  skillId:     integer references(skills.id) onDelete cascade,
  primaryKey:  (projectId, skillId),
}

// post_skills 文章-技能（N:M）
postSkills: {
  postId:      integer references(posts.id) onDelete cascade,
  skillId:     integer references(skills.id) onDelete cascade,
  primaryKey:  (postId, skillId),
}

// project_posts 项目-文章（N:M）
projectPosts: {
  projectId:   integer references(projects.id) onDelete cascade,
  postId:      integer references(posts.id) onDelete cascade,
  primaryKey:  (projectId, postId),
}

// experience_skills 经历-技能（N:M）
experienceSkills: {
  experienceId: integer references(experiences.id) onDelete cascade,
  skillId:      integer references(skills.id) onDelete cascade,
  primaryKey:   (experienceId, skillId),
}

// ==================== AI 缓存与限流表 ====================

// ai_cache AI 响应缓存
aiCache: {
  id:          serial primaryKey,
  cacheKey:    varchar(256) unique notNull,     // 请求哈希
  response:    text notNull,                    // 缓存的 AI 响应
  expiresAt:   timestamp notNull,               // 过期时间
  createdAt:   timestamp defaultNow(),
}

// ai_usage AI 调用计数
aiUsage: {
  id:          serial primaryKey,
  date:        date notNull,                    // 日期
  endpoint:    varchar(64) notNull,             // summarize/recommend
  count:       integer default(0),              // 当日调用次数
  unique:      (date, endpoint),
}
```

**关系说明**：
- Better Auth 自动管理 `user`、`session`、`account` 表（admin 实体）
- `projects` / `posts` 通过 admin session 隐式关联管理员（单管理员系统）
- 四张中间表实现 N:M 关系：`projectSkills`、`postSkills`、`projectPosts`、`experienceSkills`
- `aiCache` + `aiUsage` 支撑 C3 约束的缓存与限流

---

## 安全实现

| 约束 | 实现方式 |
|------|----------|
| C1: Admin 路由 session 验证 | `middleware.ts` 拦截 `/admin/*` 和 `/api/admin/*`，调用 Better Auth `getSession()` 验证，未认证重定向 `/login`。服务端 layout 二次校验 session。 |
| C2: AI 密钥禁止前端暴露 | AI 密钥（DeepSeek/Kimi/Qwen/MiniMax）仅存 `.env.local`（无 `NEXT_PUBLIC_` 前缀），所有 AI 调用经 `/api/ai/*` Route Handler 代理，客户端无法直接访问 AI Provider。 |
| C3: AI 响应缓存 + 每日上限 | `ai_cache` 表缓存 AI 响应（TTL 24h），`ai_usage` 表按日期+端点计数，超过 50 次/天返回 429。`lib/ai/cache.ts` 和 `lib/ai/rate-limit.ts` 实现。 |
| C4: 博客/项目 SSG/ISR | `projects/` 和 `blog/` 页面使用 `generateStaticParams` + `revalidate` 实现 ISR，确保搜索引擎抓取完整 HTML。管理端更新时触发 `revalidatePath`。 |
| C5: Vercel 10s 超时 | `/api/ai/*` 路由声明 `export const runtime = 'edge'`，使用 Vercel AI SDK `streamText()` 流式返回，避免超时。 |
| C6: 数据库连接池 | `lib/db/index.ts` 使用 `@neondatabase/serverless` 的 `neon()` HTTP 驱动或 WebSocket 连接池，禁止每次请求 `new Client()`。 |
| C7: 联系方式不明文硬编码 | 个人邮箱/手机号存储在数据库或环境变量中，前端通过 `/api/contact` 提交留言，联系方式展示使用 CSS 混淆或 SVG 图片渲染。 |

---

## ADR 摘要

| ADR | 决策 | 理由 |
|-----|------|------|
| 001 | Next.js 15 App Router | 全栈框架，RSC 支持 SSG/ISR，与 Vercel 深度集成，满足 C4 静态生成需求 |
| 002 | PostgreSQL + Neon Serverless | 关系型数据库支撑复杂 N:M 关系，Neon 提供免费 Serverless 实例和内置连接池，满足 C6 |
| 003 | Drizzle ORM | TypeScript 原生类型安全，轻量无运行时开销，schema-first 设计与 Neon 兼容性好 |
| 004 | Better Auth | 开源自托管认证方案，支持 session 数据库存储，满足 C1 服务端验证需求，无第三方依赖 |
| 005 | Vercel AI SDK + Edge Runtime + 国产模型优先 | 统一多模型接口，原生 `streamText()` 流式支持，Edge Runtime 绕过 Vercel 10s 超时限制，满足 C5。优先使用 DeepSeek、Kimi、Qwen、MiniMax 等国产模型，通过 `@ai-sdk/deepseek`、`@ai-sdk/openai-compatible`（Kimi/MiniMax）、社区 qwen provider 接入 |
| 006 | 数据库缓存 + 调用计数 | 使用 `ai_cache` 表替代外部 KV 服务（减少依赖），`ai_usage` 表实现每日上限，满足 C3 免费额度保护 |
| 007 | ISR 增量静态再生 | 博客/项目页使用 ISR（revalidate: 3600），兼顾 SEO 与内容实时性，管理端更新时按需 revalidate，满足 C4 |
| 008 | 单管理员架构 | 个人网站仅需一个管理员，省去角色权限系统复杂度，Better Auth 单用户 + middleware 守卫即可 |
| 009 | CSS 混淆联系方式 | 使用 CSS `direction: rtl` + `unicode-bidi` 或 SVG 渲染邮箱，防爬虫采集且无需额外后端接口，满足 C7 |
| 010 | 国产 AI 模型优先策略 | 优先级：DeepSeek（deepseek-chat/deepseek-reasoner）> Kimi（moonshot-v1-auto）> Qwen（qwen-plus/qwen-turbo）> MiniMax（abab6.5s-chat），国产模型 API 价格低、中文能力强、大陆访问延迟低，Claude/GPT 作为 fallback 备选 |

---

**版本**：v1.0.0 | **日期**：2026-02-18
