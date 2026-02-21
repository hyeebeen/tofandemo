# AI 全栈工程师 3 个月成长指南 — SaaS 产品路线

> 不做 10 个小 demo，做 1 个完整的 SaaS。
> 3 个月从 0 到 1，做一个有用户注册、付费、数据分析的真实产品。
> 哪怕只有 10 个用户，也比 100 个 demo 更有说服力。

---

## 你的起点和终点

**起点**：CS 大四，有运维经验，有一台 32G 2T 的 M5 Mac，会用终端，懂 Linux 基础。
**终点**：3 个月后，你有一个上线运营的 SaaS 产品，有真实用户、有付费流程、有数据看板。面试时你不是在讲 demo，而是在讲一个完整的产品从 0 到 1 的故事。

---

## 能力分层：7+2（全部在一个产品中体现）

**基本功**（AI 替代不了，值得花笨功夫）
1. **算法思维** — 体现在产品的核心 AI 逻辑、数据处理管道设计
2. **系统设计** — 体现在多租户架构、支付流程、权限系统的设计决策
3. **技术写作** — 体现在"SaaS 开发实战"系列文章（8-10 篇）

**必备技能**（在 SaaS 开发中自然习得）
4. **TypeScript 全栈** — Next.js + tRPC + Drizzle，一套 TS 打通前后端
5. **AI 集成** — 产品核心功能：LLM 调用、流式输出、Prompt 工程、RAG
6. **DevOps** — CI/CD、监控、日志、多环境部署、数据库迁移
7. **AI 辅助开发** — 用 Claude Code / Cursor 把开发效率拉满

**加分项**（有了脱颖而出）
8. **本地 AI** — 开发阶段用本地模型省钱调试，M5 32GB 的独特优势
9. **开源贡献** — 把产品中抽象出的通用模块开源（如多租户中间件、AI 工具函数）

---

## 第 0 步：把 Mac 变成开发武器

### 科学上网

你已经有 ghelper 代理了。装一个 Clash Verge Rev 作为客户端：
- 从 GitHub Releases 下载 dmg 安装
- 导入你的订阅链接
- 开启系统代理 + 增强模式
- 测试：`curl -I https://www.google.com` 能通就行

### 开发环境

```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 核心工具
brew install git node bun ollama
brew install --cask cursor warp visual-studio-code

# AI 编程工具
npm install -g @anthropic-ai/claude-code

# 本地模型（开发调试用，省 API 费）
ollama pull qwen2.5:14b
ollama pull llama3.1:8b

# SaaS 开发额外工具
brew install stripe/stripe-cli/stripe  # Stripe CLI，本地测试支付
brew install mailpit                    # 本地邮件测试

# 验证
bun --version && node --version && git --version && ollama list
```

### 账号注册

全部用 GitHub 账号登录：
- **Vercel** — 部署平台
- **Neon** — PostgreSQL 数据库
- **Stripe** — 支付（测试模式免费）
- **Resend** — 邮件服务（免费 tier 够用）
- **Claude API** — AI 核心能力（或 DeepSeek 平替）
- **PostHog** — 用户分析 + A/B 测试（免费 tier）
- **Sentry** — 错误监控

**文章 #1**：《M5 MacBook Pro SaaS 全栈开发环境搭建》

---

## 产品选择：AI 代码审查助手（CodeLens）

> 为什么选这个：你有 DevOps 背景，理解开发者痛点；市场有需求但巨头没完全覆盖；技术栈天然适合 AI 集成。

**产品定义**：
- 用户提交 GitHub PR 链接或粘贴代码片段
- AI 自动审查：安全漏洞、性能问题、代码风格、最佳实践
- 生成结构化审查报告，支持导出
- 免费用户每月 10 次审查，付费用户无限次 + 高级功能

你也可以换成其他垂直领域（AI 简历助手、AI 文档翻译等），核心 SaaS 架构不变。

---

## 阶段一：MVP（第 1-4 周）— 核心功能跑通

> 目标：最小可用产品上线，能注册、能用核心功能、能部署。

### Week 1：项目脚手架 + 认证系统

```
技术栈确定：
├── Next.js 15 (App Router)
├── TypeScript + Bun
├── Tailwind CSS + shadcn/ui
├── Drizzle ORM + Neon PostgreSQL
├── NextAuth.js v5 (认证)
├── tRPC (类型安全 API)
└── Vercel (部署)
```

**任务清单**：
- `bunx create-next-app` 初始化项目，配置 ESLint + Prettier
- 搭建 Drizzle + Neon 连接，设计用户表 schema
- 集成 NextAuth.js：GitHub OAuth + 邮箱密码登录
- 实现注册/登录/登出流程
- 部署到 Vercel，配置环境变量
- 能力覆盖：C4（全栈）、C6（DevOps 部署）、C7（AI 辅助搭建）

**文章 #2**：《从零搭建 SaaS 认证系统：NextAuth.js v5 实战》

### Week 2：核心 AI 功能

**任务清单**：
- 设计代码审查的 Prompt 模板（系统提示词 + 结构化输出）
- 集成 Vercel AI SDK，实现流式代码审查
- 本地开发用 Ollama（qwen2.5:14b），生产用 Claude API
- 实现代码输入界面：粘贴代码 / 输入 GitHub PR URL
- 审查结果展示：分类（安全/性能/风格）、严重程度、修复建议
- 能力覆盖：C1（算法/Prompt 设计）、C5（AI 集成）、C8（本地 AI）

**文章 #3**：《AI 代码审查引擎：Prompt 工程 + 流式输出实战》

### Week 3：多租户 + 数据模型

**任务清单**：
- 设计多租户数据模型：用户 → 组织 → 项目 → 审查记录
- 实现组织创建、成员邀请、角色权限（Owner/Admin/Member）
- 审查历史列表 + 详情页
- 用户 Dashboard：审查统计、最近活动
- 能力覆盖：C2（系统设计）、C4（全栈）

**文章 #4**：《SaaS 多租户架构设计：从数据模型到权限控制》

### Week 4：MVP 打磨 + 上线

**任务清单**：
- Landing Page：产品介绍、功能展示、CTA
- 响应式适配，基础 SEO
- 错误处理、Loading 状态、空状态
- 集成 Sentry 错误监控
- GitHub Actions CI：类型检查 + Lint + 构建
- MVP 上线，分享给 5 个朋友试用，收集反馈
- 能力覆盖：C6（CI/CD + 监控）、C7（AI 辅助开发）

**文章 #5**：《SaaS MVP 上线清单：从代码到生产环境》

---

## 阶段二：Beta（第 5-8 周）— 付费 + 增长

> 目标：加入付费系统，开始获取真实用户。

### Week 5-6：Stripe 订阅付费

**任务清单**：
- Stripe 集成：产品/价格配置（Free / Pro / Team 三档）
- 实现订阅流程：选择方案 → Checkout → 回调处理
- Webhook 处理：订阅创建、续费、取消、支付失败
- 用量限制中间件：Free 用户每月 10 次，Pro 无限
- 账单页面：当前方案、用量统计、发票历史
- Stripe CLI 本地测试 Webhook
- 能力覆盖：C2（支付系统设计）、C4（全栈）

**文章 #6**：《SaaS 订阅付费系统：Stripe 集成完全指南》

### Week 7：邮件 + 通知系统

**任务清单**：
- Resend 集成：React Email 模板
- 邮件场景：欢迎邮件、审查完成通知、订阅确认、即将到期提醒
- 应用内通知系统（数据库 + 实时推送）
- 邮件偏好设置页面
- 能力覆盖：C4（全栈）、C2（异步任务设计）

### Week 8：用户分析 + A/B 测试

**任务清单**：
- PostHog 集成：页面浏览、功能使用、转化漏斗
- 关键指标追踪：注册转化率、Free→Pro 转化率、留存率
- A/B 测试：Landing Page 不同文案/CTA 的转化对比
- 管理后台 v1：用户列表、收入统计、系统健康
- 能力覆盖：C2（数据分析系统设计）、C4（全栈）

**文章 #7**：《SaaS 数据驱动增长：PostHog 分析 + A/B 测试实战》

---

## 阶段三：Launch（第 9-10 周）— 正式发布

> 目标：产品打磨，正式对外发布，获取前 10 个用户。

### Week 9：高级功能 + RAG

**任务清单**：
- GitHub App 集成：自动审查新 PR（Pro 功能）
- RAG 实现：让 AI 理解项目上下文（读取 README、配置文件、历史审查）
- 审查规则自定义：用户可以配置关注点和忽略项
- API 接口：供 CI/CD 集成调用
- 能力覆盖：C1（RAG 算法）、C5（AI 深度集成）、C8（本地向量化）

**文章 #8**：《RAG 实战：让 AI 代码审查理解你的项目上下文》

### Week 10：发布准备

**任务清单**：
- 性能优化：数据库查询优化、API 响应缓存、图片 CDN
- 安全加固：Rate Limiting、CSRF、输入校验、SQL 注入防护
- 文档站：API 文档、使用指南、FAQ
- 发布渠道准备：Product Hunt、Hacker News、V2EX、Twitter
- 能力覆盖：C6（生产级 DevOps）、C3（技术写作/文档）

**文章 #9**：《SaaS 发布清单：安全、性能、SEO 一个都不能少》

---

## 阶段四：Iterate（第 11-12 周）— 迭代 + 总结

> 目标：根据用户反馈迭代，沉淀技术资产，准备面试。

### Week 11：用户反馈迭代

**任务清单**：
- 收集并分类用户反馈（功能请求、Bug、体验问题）
- 实现 Top 3 用户需求
- 优化 onboarding 流程，降低流失率
- 抽象通用模块开源（如：`@codelens/multi-tenant`、`@codelens/ai-utils`）
- 能力覆盖：C9（开源贡献）、C2（迭代设计）

### Week 12：总结 + 面试准备

**任务清单**：
- 完善个人作品集网站，CodeLens 作为核心项目展示
- 整理技术文章系列，发布到个人博客 + 掘金/Medium
- 准备面试叙事：产品故事线（为什么做 → 怎么做 → 学到什么 → 数据结果）
- 录制 3 分钟产品 Demo 视频

**文章 #10**：《从 0 到 1 做一个 AI SaaS：3 个月全栈开发复盘》

---

## SaaS 开发阶段全景

```
Week:  1    2    3    4    5    6    7    8    9    10   11   12
       ├────────────────┤├──────────────────┤├─────────┤├─────────┤
       │   MVP 阶段     ││   Beta 阶段      ││ Launch  ││ Iterate │
       │                ││                  ││         ││         │
       │ 认证+AI+多租户 ││ 付费+邮件+分析   ││ RAG+发布││ 迭代+总结│
       │ → 5人内测      ││ → 20人公测       ││ → 上线  ││ → 10+用户│
```

### 能力在产品中的映射

| 能力 | 在 CodeLens 中的体现 |
|------|---------------------|
| C1 算法思维 | Prompt 工程、RAG 检索算法、代码解析逻辑 |
| C2 系统设计 | 多租户架构、支付流程、异步任务、数据管道 |
| C3 技术写作 | 10 篇"SaaS 开发实战"系列文章 |
| C4 TypeScript 全栈 | Next.js + tRPC + Drizzle 全链路 |
| C5 AI 集成 | 流式审查、结构化输出、GitHub App 自动审查 |
| C6 DevOps | CI/CD、监控、多环境、数据库迁移 |
| C7 AI 辅助开发 | Claude Code + Cursor 全程协作 |
| C8 本地 AI | Ollama 开发调试、本地向量化 |
| C9 开源贡献 | 通用模块抽象开源 |

---

## 技术栈

| 层 | 选择 | 为什么 |
|----|------|--------|
| 语言 | TypeScript | 类型安全，前后端统一 |
| 框架 | Next.js 15 (App Router) | 全栈一体，SSR/SSG/API |
| UI | Tailwind + shadcn/ui | 快速构建专业界面 |
| API | tRPC | 端到端类型安全 |
| 数据库 | PostgreSQL (Neon) + Drizzle | Serverless + TS 原生 ORM |
| 认证 | NextAuth.js v5 | 灵活，支持多种 Provider |
| 支付 | Stripe | SaaS 支付标准方案 |
| AI | Vercel AI SDK + Ollama | 云端流式 + 本地推理 |
| 邮件 | Resend + React Email | 开发体验好，免费额度够 |
| 分析 | PostHog | 开源，功能全，免费 tier 慷慨 |
| 监控 | Sentry | 错误追踪行业标准 |
| 部署 | Vercel + Docker | 零配置 + 容器化 |
| CI/CD | GitHub Actions | 行业标准 |
| 运行时 | Bun | 快 |

---

## AI 协作策略

### 工具分工

| 工具 | 什么时候用 |
|------|-----------|
| Claude Code | 架构设计、多文件重构、复杂逻辑、代码审查 |
| Cursor | 日常编码、补全、内联编辑、快速问答 |
| v0.dev | UI 组件生成：Dashboard、Landing Page、表单 |
| Ollama | 本地开发调试、省 API 费、离线开发 |

### 边界

- AI 生成的每一行代码你都要能解释——面试官会问
- 记录你和 AI 的协作过程——这本身就是文章素材
- AI 帮你写得更快，不是帮你跳过理解

---

## 面试策略：一个 SaaS 打天下

面试时，你不是在背技术名词，你是在讲一个完整的产品故事：

**"我用 3 个月做了一个 AI 代码审查 SaaS"**
- 为什么做？→ 发现开发者痛点，市场调研
- 怎么设计？→ 多租户架构、支付系统、AI 管道（系统设计能力）
- 怎么实现？→ TypeScript 全栈、Stripe、RAG（技术深度）
- 怎么上线？→ CI/CD、监控、安全加固（DevOps 能力）
- 结果如何？→ X 个用户、Y 次审查、Z 元收入（数据驱动）
- 学到什么？→ 技术选型的 trade-off、用户反馈驱动迭代（成长性）

一个完整的 SaaS 能回答面试中 80% 的技术问题。比 10 个 demo 更有说服力。

---

> 核心理念：做一个真实的产品 → 在产品中学所有技术 → 把过程写成系列文章 → 用产品故事赢面试。3 个月后你手里有一个上线的 SaaS、10 篇技术文章、一个完整的产品故事。面试官问你什么，你都能说"我做过，而且上线了"。
