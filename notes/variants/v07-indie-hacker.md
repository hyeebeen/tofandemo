# AI 全栈独立开发者 3 个月成长指南

> 写给想自己做产品的你。
> 不只是找工作，而是培养独立做产品、独立赚钱的能力。即使最终去上班，独立开发者的思维方式也是巨大优势——你不只是写代码的人，你是能从 0 到 1 做出产品的人。

---

## 你的起点和终点

**起点**：CS 大四，有运维经验，有一台 32G 2T 的 M5 Mac，会用终端，懂 Linux 基础。
**终点**：3 个月后，你有 2-3 个上线的真实产品，至少 1 个产生过收入（哪怕 1 块钱），一个个人品牌开始有人关注。面试时你不是在背八股，而是在讲"我做了一个产品，有 XX 个用户，赚了 XX 块钱"。

---

## 能力分层：7+2（独立开发者版）

**基本功**（AI 替代不了，值得花笨功夫）
1. **算法思维** — 判断 AI 生成的代码好不好，独立开发者没有 code review，全靠自己
2. **系统设计** — 一个人扛全栈，必须能画出整个系统的数据流
3. **技术写作** — Build in Public 的核心能力，写作 = 营销 = 用户获取

**必备技能**（在产品中自然习得）
4. **TypeScript 全栈** — Next.js + API + 数据库，一套 TS 打通
5. **AI 集成** — 把 LLM 接进产品里，这是 2025 年产品的标配
6. **DevOps** — 你已经有的优势，独立开发者更需要自动化一切
7. **AI 辅助开发** — 一个人干三个人的活，效率是生存关键

**加分项**（独立开发者的护城河）
8. **本地 AI** — M5 32GB 跑本地模型，做出别人做不了的离线产品
9. **开源贡献** — 开源是最好的营销，你的工具被别人用 = 免费获客

**隐性能力**（贯穿全程）
- **产品思维** — 用户要什么 > 你想做什么
- **发布和获客** — 做出来不算完，让人知道才算
- **成本控制** — 免费 tier 优先，每一分钱花在刀刃上

---

## 第 0 步：把 Mac 变成独立开发武器

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

# 本地模型
ollama pull qwen2.5:14b
ollama pull llama3.1:8b

# 验证
bun --version && node --version && git --version && ollama list
```

### 账号注册（免费 tier 优先，成本 = 0）

全部用 GitHub 账号登录：
- **Vercel** — 部署平台，免费额度够个人产品
- **Neon** — PostgreSQL，免费 tier 0.5GB
- **Cloudflare** — CDN + R2 存储 + Workers，免费额度极其慷慨
- **Claude / DeepSeek** — AI API（DeepSeek 性价比极高，独立开发者首选）
- **Stripe** — 收款（国内可用 LemonSqueezy 替代）
- **Google Analytics** — 用户数据，免费
- **Plausible** — 隐私友好的替代方案（自部署免费）

### 社交账号（Build in Public 阵地）

注册 Twitter/X、即刻、V2EX、Product Hunt。这四个是独立开发者的核心发布渠道。

**第一篇文章**：《M5 MacBook Pro 独立开发者工作站搭建指南》，发到即刻和 V2EX。

---

## 第一个月：第一个产品从 0 到上线到赚钱

> 目标：完成 2 个面向真实用户的产品，其中 1 个尝试变现。建立 Build in Public 习惯。

### P1：AI 工具站（第 1-2 周）— 你的第一个上线产品

做一个解决具体问题的 AI 小工具网站。不要做"又一个 ChatGPT 套壳"，找一个细分场景：
- 例：AI 周报生成器、AI 简历优化器、AI 英文邮件润色、AI 代码解释器
- 关键：用户来了 → 解决一个问题 → 走了。简单、直接、有用

**技术栈**：Next.js 15 + Tailwind + shadcn/ui + Vercel AI SDK
**部署**：Vercel（自定义域名，买一个 .com，约 $10/年）
**变现**：免费用 3 次/天，注册后 10 次/天，付费 $3/月无限用（接 LemonSqueezy）

学到什么（能力映射）：
- (C4) TypeScript 全栈基础
- (C5) AI 集成：流式输出、Prompt 工程
- (C7) AI 辅助开发：用 Claude Code 搭建整个项目

**产品发布 checklist**：
1. 自定义域名 + favicon + OG 图片（社交分享预览）
2. 落地页讲清楚"这个工具帮你做什么"
3. 发到即刻 #独立开发者 话题 + V2EX /create 节点
4. 在 Twitter 发一条 Build in Public 帖子

**文章**：《我的第一个 AI 产品：从想法到上线到第一个付费用户》

### P2：个人品牌网站 + 博客（第 2-3 周）— 你的大本营

不是普通的个人主页，是你的产品展示 + 博客 + 独立开发者品牌阵地：
- 首页：你是谁，你在做什么（一句话）
- 产品页：展示你做的所有产品，带链接和数据
- 博客：技术文章 + Build in Public 周记
- 关于页：你的故事，为什么做独立开发

**技术栈**：Next.js 15 + MDX（博客内容）+ Tailwind
**SEO**：从第一天就做好——sitemap、meta tags、结构化数据
**部署**：Vercel，绑定你的主域名

学到什么：
- (C4) SSG/SSR、动态路由
- (C3) 技术写作系统化
- (C6) CI/CD：GitHub Actions 自动部署

**文章**：《独立开发者的个人网站应该长什么样——我的设计思路》

### P3：开源 CLI 工具（第 3-4 周）— 开源即营销

做一个开发者会用的 CLI 工具，开源到 GitHub，发布到 npm：
- 例：AI commit message 生成器、项目脚手架、Markdown 转社交图片
- 关键：解决你自己开发中遇到的痛点

**技术栈**：TypeScript + Commander.js + Ollama（本地 AI）
**发布**：npm publish + GitHub README 写好 + 录一个 GIF demo

学到什么：
- (C8) 本地 AI 集成
- (C9) 开源项目管理：README、LICENSE、CONTRIBUTING
- (C1) 算法思维：CLI 工具需要高效的数据处理

**获客策略**：
- GitHub 上 star 数就是你的社交证明
- 在 Hacker News 的 Show HN 发帖
- 写一篇"我为什么做这个工具"发到技术社区

**文章**：《从痛点到 npm 包：我的第一个开源工具的诞生》

---

## 第二个月：做一个真正的 SaaS

> 目标：完成 1 个有数据库、有用户系统、有付费功能的完整 SaaS 产品。这是你简历上最重的一笔。

### P4：AI SaaS 产品（第 5-7 周）— 你的核心项目

做一个完整的 SaaS 产品，面向真实用户群体。选一个你了解的领域：
- 例：AI 面试模拟器（对着摄像头练面试）、AI 学习笔记整理、AI 运维告警摘要
- 必须有：用户注册/登录、数据持久化、付费功能、用户仪表盘

**完整功能清单**：用户认证（NextAuth.js / Clerk）、数据库（PostgreSQL + Drizzle ORM）、AI 核心功能（流式输出）、付费订阅（LemonSqueezy，免费版 + Pro 版）、用户仪表盘、转化率优化的落地页。

**成本控制**：Neon 免费 tier + Vercel 免费 tier + DeepSeek API（便宜 10 倍）+ Ollama 降级方案。总成本 < $15/月。

**定价**：Free（有限次数）→ Pro $9/月（无限 + 高级功能）。10 个付费用户 = $90/月，覆盖成本有盈余。

学到什么：
- (C2) 系统设计：完整的 SaaS 架构
- (C4) 全栈深度：认证、数据库、API、前端
- (C5) AI 集成进阶：多模型切换、成本优化
- (C6) DevOps：监控、日志、自动化部署

**产品发布**：即刻/Twitter 预热收集 waitlist → Product Hunt 发布（选周二到周四）→ V2EX + Hacker News Show HN → 给 KOL 发免费 Pro 账号换评测。

**文章**：《独立开发一个 AI SaaS 的完整记录：技术、产品、变现》

### P5：Chrome 扩展（第 7-8 周）— 触达用户的另一个渠道

做一个有用的 Chrome 扩展，和你的 SaaS 产品互补或独立：
- 例：网页内容 AI 摘要、一键翻译优化、GitHub PR 助手
- Chrome Web Store 是一个被低估的分发渠道

**技术栈**：TypeScript + Chrome Extension API + 你的 AI 后端
**变现**：免费版 + Pro 版（Chrome Web Store 支持付费扩展）

学到什么：
- (C4) 浏览器扩展开发
- (C5) AI 集成：在受限环境中调用 AI
- (C7) AI 辅助开发：快速学习新领域

**文章**：《Chrome 扩展开发入门：从零到 Chrome Web Store 上架》

---

## 第三个月：规模化 + 求职双线并行

> 目标：优化现有产品的增长，同时把独立开发经历转化为求职优势。

### P6：给 SaaS 加上 AI Agent 能力（第 9-10 周）

在 P4 的基础上，加入更智能的 AI 功能：
- RAG：让 AI 基于用户自己的数据回答问题
- Agent：AI 能自主完成多步骤任务
- 本地模型选项：用 Ollama 提供隐私模式

**技术栈**：LangChain / Vercel AI SDK + pgvector + Ollama

学到什么：
- (C5) AI 集成高级：RAG、Agent、向量数据库
- (C8) 本地 AI：Ollama 集成到生产产品
- (C2) 系统设计：复杂 AI 系统的架构

**文章**：《给 SaaS 产品加上 RAG：从向量数据库到生产部署》

### P7：产品增长 + 数据驱动（第 10-11 周）

不写新产品，专注让现有产品增长：分析用户数据（哪些功能用得多，哪里流失）、SEO 优化（写 3-5 篇长尾关键词博客）、每周 2-3 条 Build in Public 内容、加入反馈收集并迭代、A/B 测试落地页和定价页。

学到什么：
- (C3) 技术写作 + SEO 写作
- (C6) 监控和数据分析

**文章**：《独立开发者的增长手册：我如何从 0 做到 100 个用户》

### P8：Docker 化 + 自部署方案（第 11-12 周）

把你的 SaaS 产品做成可自部署的版本：
- Docker Compose 一键部署
- 详细的自部署文档
- 这既是技术能力展示，也是一种商业模式（开源核心 + 云端付费）

**技术栈**：Docker + Docker Compose + Nginx + GitHub Actions

学到什么：
- (C6) DevOps 深度：容器化、编排、自动化
- (C9) 开源运营：开源 + 商业化的平衡

**文章**：《从 Vercel 到自部署：SaaS 产品的 Docker 化全记录》

---

## 每周节奏：独立开发者的一周

| 时间 | 做什么 |
|------|--------|
| 周一 | 规划本周目标，处理用户反馈 |
| 周二-周四 | 核心开发时间（每天 4-6 小时深度编码） |
| 周五 | 写文章 / Build in Public 内容 |
| 周六 | 刷 1-2 道算法题 + 学习新技术 |
| 周日 | 复盘本周 + 社区互动 + 回复评论 |

### Build in Public 习惯

每周至少发布：
- 1 条开发进度更新（即刻/Twitter）
- 1 篇技术文章或周记（个人博客）
- 回复所有用户反馈和社区评论

---

## 成本预算：独立开发者的精打细算

| 项目 | 月成本 | 备注 |
|------|--------|------|
| 域名 | ~$1 | $10/年 |
| Vercel | $0 | 免费 tier |
| Neon 数据库 | $0 | 免费 tier |
| AI API (DeepSeek) | $5-10 | 按量付费，极便宜 |
| LemonSqueezy | 5%+$0.5/笔 | 只在有收入时才有成本 |
| Cloudflare | $0 | 免费 tier |
| **总计** | **< $15/月** | |

**盈亏平衡**：2 个 $9/月的付费用户就能覆盖所有成本。

---

## 面试策略：独立开发经历就是最强简历

### 你的故事线

"我在 3 个月里独立开发了 X 个产品，其中 [产品名] 有 XX 个用户，月收入 $XX。我一个人搞定了产品设计、全栈开发、部署运维、用户获取。"

这比任何八股文都有说服力。

### 面试中怎么讲

| 面试官问 | 你怎么答 |
|----------|----------|
| 做过什么项目？ | 独立开发了一个 AI SaaS，有 XX 个用户，赚了 XX 块钱 |
| 系统设计？ | 画我的 SaaS 架构，这是实际跑在生产环境的 |
| 遇到什么困难？ | 用户增长卡在 XX，通过 SEO + 内容营销解决了 |
| 团队协作？ | 管理了 XX 个开源贡献者，处理了 XX 个 PR |

### 简历亮点

- "独立开发并上线 AI SaaS 产品，XX 注册用户，$XX MRR"
- "开源工具 XX stars，npm 周下载量 XX"
- "技术博客 XX 篇文章，XX 阅读量"
- "Product Hunt 发布，获得 XX upvotes"

---

## 项目与能力映射

```
P1 AI工具站    P2 个人网站    P3 CLI工具    P4 SaaS     P5 扩展     P6 Agent    P7 增长    P8 Docker
   (C4,C5,C7)   (C3,C4,C6)   (C1,C8,C9)  (C2,C4,C5,C6) (C4,C5,C7) (C5,C8,C2) (C3,C6)   (C6,C9)
```

### 工具

| 工具 | 什么时候用 |
|------|-----------|
| Claude Code | 架构设计、多文件修改、代码审查 |
| Cursor | 日常写代码：补全、内联编辑 |
| v0.dev | 落地页和 UI 组件快速生成 |
| Ollama | 本地模型：P3、P6 的核心依赖 |

---

## 技术栈

一套 TypeScript 打通全栈，独立开发者不折腾多语言。

| 层 | 选择 | 为什么 |
|----|------|--------|
| 语言 | TypeScript | 前后端统一，一个人效率最高 |
| 框架 | Next.js 15 | 全栈一体，SSR/SSG/API 都有 |
| UI | Tailwind + shadcn/ui | 快，好看，不需要设计师 |
| 数据库 | PostgreSQL (Neon) + Drizzle | Serverless 友好，免费 tier 够用 |
| AI | Vercel AI SDK + DeepSeek + Ollama | 云端便宜 + 本地免费 |
| 支付 | LemonSqueezy | 对独立开发者最友好 |
| 部署 | Vercel + Docker | 零配置 + 可自部署 |
| 分析 | Google Analytics / Plausible | 了解你的用户 |
| 运行时 | Bun | 快 |

---

> 核心理念：做产品 → 找用户 → 赚到钱 → 写文章 → 赢面试。独立开发者的经历证明你不只是会写代码，你能从 0 到 1 做出有人用、有人付费的产品。这是任何刷题和背八股都给不了你的竞争力。
