# DevForge 产品需求规格书

<meta>
  <project>DevForge</project>
  <version>1.0.0</version>
  <created>2026-02-18</created>
</meta>

## 产品环境

**定位**：大四计算机学生个人技术展示网站，集项目作品集、技术博客、在线简历于一体，深度集成 AI 能力提供智能增强体验

**智能体**：

| 智能体类型 | 行动能力 |
|-----------|---------|
| visitor（匿名/已识别） | 浏览首页、查看项目详情、阅读博客、与 AI 交互、发送留言 |
| admin（唯一管理员） | 管理项目/博客/经历/技能、回复留言、配置 AI 功能、查看数据 |
| 系统 | 代理 AI API 调用、管理认证会话、缓存响应、生成静态页面 |

**核心可供性**：
1. 展示可供性（项目作品集与技能图谱的多维呈现）
2. 阅读可供性（技术博客的 SSG/ISR 渲染与阅读体验）
3. AI 交互可供性（智能推荐、博客摘要、技术问答）
4. 联系可供性（访客留言与联系方式的安全传递）
5. 管理可供性（后台内容发布与数据管理）

---

## 最小可供故事（MAS）

### MAS-1：首页浏览与技术概览
```
访问首页 → 感知个人品牌（头像/标语/简介） → 浏览技能图谱 → 查看精选项目卡片 → 查看最新博客 → 了解经历时间线
```
依赖：无 | 支持：MAS-2, MAS-3, MAS-4

### MAS-2：项目详情探索
```
点击项目卡片 → 查看项目概述与技术栈标签 → 浏览截图/演示 → 查看关联博客文章 → 访问源码/在线演示链接
```
依赖：MAS-1 | 支持：MAS-3, MAS-4

### MAS-3：博客文章阅读
```
进入博客列表 → 按技能标签/分类筛选 → 点击文章 → 阅读 Markdown 渲染内容 → 查看 AI 生成摘要 → 浏览关联项目与相关文章
```
依赖：MAS-1 | 支持：MAS-4

### MAS-4：AI 智能交互
```
触发 AI 功能入口 → 获取项目智能推荐 → 查看博客自动摘要 → 发起技术问答对话 → 查看流式响应结果
```
依赖：MAS-1, MAS-2, MAS-3 | 支持：无

### MAS-5：后台内容管理
```
访问 /admin → Better Auth 登录认证 → 进入管理面板 → 创建/编辑项目或博客 → 管理技能标签与经历 → 查看并回复访客留言
```
依赖：无（独立认证流程） | 支持：MAS-1, MAS-2, MAS-3

### MAS-6：访客留言联系
```
点击联系入口 → 选择留言类型（求职咨询/技术交流/合作邀请/一般留言） → 填写内容与联系方式 → 提交留言 → 收到确认反馈
```
依赖：MAS-1 | 支持：无

---

## 可供性目录

| ID | 名称 | 级别 | 行动 | API |
|----|------|------|------|-----|
| P01 | 首页展示 | 主要(P) | 浏览个人信息与技能图谱 | GET / (SSG) |
| P02 | 项目列表 | 主要(P) | 浏览所有项目卡片 | GET /projects (SSG) |
| P03 | 项目详情 | 主要(P) | 查看项目完整信息 | GET /projects/[slug] (ISR) |
| P04 | 博客列表 | 主要(P) | 浏览博客文章列表 | GET /blog (SSG) |
| P05 | 博客阅读 | 主要(P) | 阅读文章完整内容 | GET /blog/[slug] (ISR) |
| P06 | 管理员登录 | 主要(P) | 认证进入后台 | POST /api/auth/sign-in |
| P07 | 内容管理 | 主要(P) | CRUD 项目/博客/技能/经历 | /api/admin/* |
| P08 | AI 博客摘要 | 主要(P) | 生成文章智能摘要 | GET /api/ai/summary?slug= |
| S01 | 技能标签筛选 | 次要(S) | 按技能过滤项目/博客 | GET /api/projects?skill= |
| S02 | AI 项目推荐 | 次要(S) | 智能推荐相关项目 | GET /api/ai/recommend?context= |
| S03 | 访客留言 | 次要(S) | 提交联系留言 | POST /api/messages |
| S04 | 留言管理 | 次要(S) | 查看/回复留言 | GET/PATCH /api/admin/messages |
| S05 | 经历时间线 | 次要(S) | 浏览教育/工作/开源经历 | GET / (SSG, 首页组件) |
| S06 | 暗色模式切换 | 次要(S) | 切换明暗主题 | 客户端状态 |
| S07 | 博客搜索 | 次要(S) | 关键词检索文章 | GET /api/posts?q= |
| L01 | AI 技术问答 | 潜在(L) | 基于站点内容的交互式问答 | POST /api/ai/chat (Streaming) |
| L02 | RSS 订阅 | 潜在(L) | 订阅博客更新 | GET /feed.xml |
| L03 | 访客数据分析 | 潜在(L) | 查看访问统计 | GET /api/admin/analytics |
| L04 | 项目演示嵌入 | 潜在(L) | 内嵌项目在线演示 | iframe / embed |

---
## AI 感知规约

### 核心元素选择器

| 可供性 | 选择器 | 操作 |
|--------|--------|------|
| 项目卡片 | `article[data-type="project"]` | 遍历子元素，提取项目信息 |
| 博客卡片 | `article[data-type="post"]` | 遍历子元素，提取文章信息 |
| 技能标签 | `span[data-skill]` | 读取 data-skill 属性值 |
| 经历时间线 | `section[aria-label="experience-timeline"]` | 遍历时间线节点 |
| AI 摘要区域 | `div[data-ai="summary"]` | 读取摘要内容 |
| AI 推荐区域 | `div[data-ai="recommendation"]` | 遍历推荐项目列表 |
| 留言表单 | `form[name="contact"]` | 填充表单字段并提交 |
| 留言类型选择 | `select[name="message-type"]` | 更改选中值 |
| 导航菜单 | `nav[aria-label="main-navigation"]` | 遍历导航链接 |
| 主题切换 | `button[aria-label="toggle-theme"]` | 触发 click |
| 搜索框 | `input[type="search"][name="blog-search"]` | 填充 value |
| 管理员登录表单 | `form[name="admin-login"]` | 填充凭据并提交 |

### 状态验证

| 操作 | 成功标志 |
|------|----------|
| 首页加载 | `main[data-page="home"]` 存在，项目卡片数量 > 0 |
| 项目详情加载 | `article[data-type="project-detail"]` 存在，slug 匹配 URL |
| 博客文章加载 | `article[data-type="post-detail"]` 存在，Markdown 内容已渲染 |
| AI 摘要生成 | `div[data-ai="summary"]` 内容非空，loading 状态消失 |
| AI 推荐返回 | `div[data-ai="recommendation"]` 包含至少 1 个推荐项 |
| 留言提交 | 表单重置，`div[role="alert"]` 显示成功提示 |
| 管理员登录 | 重定向到 /admin/dashboard，session cookie 已设置 |
| 未授权访问 /admin | 重定向到 /admin/login，返回 401/302 |
| AI 调用限流 | 返回 429，显示"今日调用次数已达上限"提示 |

---

## 约束（来自 real.md）

| ID | 约束 | 影响 |
|----|------|------|
| C1 | 管理后台必须 Better Auth session 验证 | P06、P07 所有 /admin/* 路由需服务端 middleware 校验 session，未认证一律 302 到登录页 |
| C2 | AI API 密钥禁止 NEXT_PUBLIC_ 暴露 | P08、S02、L01 所有 AI 调用必须经 Route Handler 代理，密钥仅存服务端环境变量 |
| C3 | AI 功能必须响应缓存 + 每日调用上限 | P08、S02、L01 需实现 KV/数据库缓存层，单用户每日上限 50 次，超限返回 429 |
| C4 | 博客/项目页必须 SSG/ISR | P01-P05 公开页面必须预渲染静态 HTML，确保 SEO 可抓取，禁止纯 CSR |
| C5 | Vercel 10 秒超时限制 | P08、S02、L01 AI 调用必须使用 Streaming 或 Edge Runtime，确保 10 秒内开始响应 |
| C6 | 数据库必须用连接池 | 所有数据库操作通过 @neondatabase/serverless 或 pgBouncer 连接池，禁止每次请求新建连接 |
| C7 | 个人联系方式不得明文硬编码前端 | 邮箱/手机号通过服务端 API 动态返回或使用混淆/图片方式展示，禁止写入前端源码 |

---
## 禁止操作

| 禁止的动作 | 违反约束 | 理由 |
|-----------|---------|------|
| 未认证访问 /admin/* 路由 | C1 | 管理后台必须经 Better Auth session 验证，禁止仅依赖客户端路由守卫 |
| 前端直接调用 AI 模型 API | C2 | API 密钥会暴露在客户端源码中，必须经 Route Handler 代理 |
| AI 功能无缓存无限调用 | C3 | 免费额度被刷爆导致服务中断，必须缓存 + 限流 |
| 博客/项目页纯客户端渲染 | C4 | 搜索引擎无法抓取内容，严重影响 SEO |
| AI 接口同步阻塞超 10 秒 | C5 | Vercel Serverless 超时导致 504，必须 Streaming 或 Edge Runtime |
| 每次请求新建数据库连接 | C6 | 耗尽免费版连接数上限（约 20 个），导致数据库拒绝服务 |
| 前端源码硬编码邮箱/手机号 | C7 | 爬虫批量采集个人信息，必须混淆或服务端动态提供 |
| 管理员凭据硬编码在代码中 | C1+C2 | 源码泄露即凭据泄露，必须使用环境变量 + Better Auth |
| 跳过 session 校验的管理 API | C1 | 任何人可调用管理接口修改内容，造成数据篡改 |

---

## 技术实现

**前端可供性渲染**

| 可供性 | 组件 | 技术实现 |
|-------|-----|---------|
| 首页展示 | `<HomePage />` | Next.js 15 SSG + Tailwind CSS + shadcn/ui |
| 项目卡片 | `<ProjectCard />` | shadcn/ui Card + 技能标签 Badge |
| 博客文章 | `<PostContent />` | MDX/Markdown 渲染 + ISR |
| 技能图谱 | `<SkillGraph />` | 分类展示 + 熟练度指示 |
| 经历时间线 | `<Timeline />` | 垂直时间线组件 |
| AI 摘要 | `<AISummary />` | Vercel AI SDK useCompletion + Streaming |
| 留言表单 | `<ContactForm />` | React Hook Form + Zod 校验 |
| 暗色模式 | `<ThemeProvider />` | next-themes + Tailwind dark: |

**后端可供性支持**

| 可供性 | API 端点 | 技术实现 |
|-------|---------|---------|
| AI 摘要 | GET /api/ai/summary | Route Handler + Vercel AI SDK + 缓存层 |
| AI 推荐 | GET /api/ai/recommend | Route Handler + 向量相似度/规则推荐 |
| AI 问答 | POST /api/ai/chat | Edge Runtime + Streaming SSE |
| 留言提交 | POST /api/messages | Drizzle ORM + Zod 校验 |
| 内容管理 | /api/admin/* | Better Auth middleware + Drizzle ORM CRUD |
| 认证 | /api/auth/* | Better Auth session 管理 |
| 联系方式 | GET /api/contact | 服务端动态返回，防爬虫采集 |

**基础设施要求**

| 需求 | 规格 |
|-----|-----|
| 数据库 | PostgreSQL（Neon/Supabase）+ 连接池 |
| 认证 | Better Auth + Session Cookie |
| 部署 | Vercel（SSG/ISR + Edge Runtime + Serverless） |
| AI 模型 | 国产优先：DeepSeek / Kimi / Qwen / MiniMax via Vercel AI SDK，Claude/GPT 作为 fallback |
| 缓存 | KV 或数据库缓存（AI 响应） |

---

**版本**：v1.0.0 | **日期**：2026-02-18
