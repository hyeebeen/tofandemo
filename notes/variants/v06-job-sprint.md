# AI 全栈工程师 3 个月速成求职路线

> 一切行动服务于一个目标：拿 offer。
> 不等"准备好"，第 1 周就开始投递，边做边投，边面边改。

---

## 你的起点和终点

**起点**：CS 大四，有 DevOps/运维经验，MacBook Pro M5 32GB 2TB，已有科学上网。
**终点**：3 个月后，手握 6-8 个面试能讲清楚的项目、100+ LeetCode、6 篇技术文章，拿到 offer。

---

## 能力分层：7+2（求职权重版）

**基本功**（面试硬通货）
1. **算法思维 [C1]** ★★★★★ — 每天 1 小时 LeetCode，目标 100+ 题
2. **系统设计 [C2]** ★★★★ — 能画架构图，讲清楚 trade-off
3. **技术写作 [C3]** ★★★ — 6 篇精选文章，面试时当作品展示

**必备技能**（项目中自然习得）
4. **TypeScript 全栈 [C4]** ★★★★★ — Next.js + API + 数据库
5. **AI 集成 [C5]** ★★★★ — LLM 接入产品，当前最热考点
6. **DevOps [C6]** ★★★ — 你的既有优势，简历亮点
7. **AI 辅助开发 [C7]** ★★★ — Claude Code / Cursor 加速产出

**加分项**（有了脱颖而出）
8. **本地 AI [C8]** ★★ — M5 32GB 跑本地模型
9. **开源贡献 [C9]** ★★ — 有 PR 记录，证明协作能力

---

## 第 0 步：环境搭建（Day 0）

拿到电脑当天搞定，不过夜。

### 科学上网
已有 ghelper 代理。装 Clash Verge Rev：下载 dmg → 导入订阅 → 开启系统代理 → `curl -I https://www.google.com` 验证。

### 开发环境
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git node bun ollama
brew install --cask cursor warp visual-studio-code
npm install -g @anthropic-ai/claude-code
ollama pull qwen2.5:14b
```

### 账号注册（全部 GitHub 登录）
Vercel / Neon / GitHub（开 2FA）/ Claude API

### 同步启动：简历 v0.1
环境搭建同时写简历第一版：教育背景 + DevOps 经验 + 技术栈，项目栏先空着每周补充。

---

## 三条线并行

整个 3 个月同时跑三条线：

| 线 | 内容 | 节奏 |
|----|------|------|
| 做项目 | 6-8 个面试能讲的项目 | 每 1-2 周一个 |
| 刷算法 | LeetCode 100+ 题 | 每天 1 小时 |
| 投简历/面试 | 边做边投 | 第 1 周投递，第 3 周面试 |

**每日时间分配**：算法 1h（早）→ 项目 6h（白天）→ 投递/复盘/系统设计 2h（晚）

---

## LeetCode 策略：100+ 题

| 题型 | 题数 | 高频考点 |
|------|-----|---------|
| 数组/哈希 | 15 | Two Sum、滑动窗口、前缀和 |
| 链表 | 10 | 反转、合并、环检测 |
| 二叉树 | 15 | 遍历、LCA、序列化 |
| 二分查找 | 8 | 旋转数组、搜索区间 |
| 动态规划 | 15 | 背包、子序列、路径 |
| BFS/DFS | 12 | 岛屿、拓扑排序 |
| 栈/队列/双指针 | 16 | 单调栈、三数之和、接雨水 |
| 贪心/其他 | 15 | 区间调度、设计题 |

**原则**：每题限时 25 分钟，超时看题解理解后重写。用 TypeScript 刷。每周日复习错题。

---

## 第一阶段：基础 + 首投（第 1-4 周）

### P1：全栈 Todo App（第 1 周）[C4][C6]

**技术栈**：Next.js 15 + TypeScript + PostgreSQL (Neon) + Drizzle ORM + Tailwind + shadcn/ui

**功能**：用户注册/登录（NextAuth.js）→ Todo CRUD + 分类/优先级 → SSR → Vercel 部署 + CI/CD

**面试讲点**：认证方案选型（JWT vs Session）、数据库设计与索引、SSR vs CSR trade-off

### P2：AI 聊天助手（第 2-3 周）[C4][C5][C7]

**技术栈**：Next.js + Vercel AI SDK + Claude/DeepSeek API

**功能**：多轮对话 + 流式响应 → 对话历史持久化 → Markdown 渲染 + 代码高亮 → Prompt 模板

**面试讲点**：流式输出原理（SSE vs WebSocket）、Token 计费与上下文管理、Prompt Engineering

### P3：个人作品集网站（第 4 周）[C4][C3]

**技术栈**：Next.js + MDX + Tailwind + Framer Motion

**功能**：项目展示页 → 技术博客（MDX）→ 响应式 + 暗色模式 → SEO 优化

**文章**：① 《M5 Mac 全栈开发环境搭建指南》 ② 《流式 AI 聊天实战：Next.js + Vercel AI SDK》

**求职动作**：
- 第 1 周：简历 v0.1，投 5-10 家练手
- 第 2 周：根据反馈改简历，投 10 家
- 第 3 周：开始面试（2 次/周），记录面试题
- 第 4 周：简历加上 P1/P2，针对性投递

---

## 第二阶段：进阶 + 高频面试（第 5-8 周）

### P4：RAG 知识库问答（第 5-6 周）[C5][C2][C8]

**技术栈**：Next.js + LangChain + 向量数据库（Pinecone/Chroma）+ Ollama

**功能**：文档上传 + 文本分块 → 向量化存储 + 语义检索 → RAG 增强回答 + 引用标注 → 本地/云端模型切换

**面试讲点**：RAG 架构（检索→增强→生成）、向量数据库选型、分块策略对检索质量的影响

### P5：实时协作看板（第 7-8 周）[C4][C2]

**技术栈**：Next.js + WebSocket (Socket.io) + Redis + PostgreSQL

**功能**：看板 CRUD + 拖拽排序 → 实时多人协作 → 乐观更新 + 冲突解决 → RBAC 权限

**面试讲点**：实时同步方案对比、乐观更新与冲突解决、水平扩展（Redis Pub/Sub）

**文章**：③ 《RAG 系统从零到一：向量检索 + LLM 实战》 ④ 《WebSocket 实时协作系统设计》

**求职动作**：每周 2-3 次面试，建立面试题库。简历 v3.0 加上 P4/P5，冲刺目标公司。

**系统设计专项**（每晚 1h）：URL 短链 → 限流器 → 消息队列 → 聊天系统 → 协作编辑

---

## 第三阶段：冲刺 + 收割 Offer（第 9-12 周）

### P6：CLI 工具 / VS Code 插件（第 9 周）[C7][C6]

**技术栈**：Node.js + Commander.js 或 VS Code Extension API

**二选一**：AI 代码审查 CLI（git diff → LLM → 审查建议）或 AI 代码片段生成插件

**面试讲点**：CLI/插件架构、AI API 集成模式、开发者工具 UX

### P7：微服务 Demo（第 10-11 周）[C2][C6][C4]

**技术栈**：Next.js + Docker Compose + Nginx + Redis + PostgreSQL

**功能**：用户/订单/通知三个服务 → API Gateway → 服务间通信（REST + 消息队列）→ Docker Compose 一键启动

**面试讲点**：微服务 vs 单体决策、服务拆分原则、分布式事务、容器编排

### P8（可选）：开源贡献（第 12 周）[C9]

目标 shadcn/ui、Vercel AI SDK 等用过的库，从 good first issue 入手，有 PR 记录即可。

**文章**：⑤ 《Docker Compose 微服务实战》 ⑥ 《AI 全栈求职复盘：3 个月从 0 到 Offer》

**求职动作**：第 9-10 周全力面试（3-4 次/周）→ 第 11 周谈 offer → 第 12 周收尾

---

## 项目与能力映射

```
项目              能力         面试考点
───────────────────────────────────────────────
P1 Todo App       C4 C6       CRUD、认证、数据库设计
P2 AI 聊天        C4 C5 C7    流式输出、Prompt、API
P3 作品集         C4 C3       SSG、SEO、前端工程化
P4 RAG 知识库     C5 C2 C8    向量检索、RAG、本地模型
P5 实时看板       C4 C2       WebSocket、并发、系统设计
P6 CLI/插件       C7 C6       工具链、开发者体验
P7 微服务         C2 C6 C4    架构、容器化、分布式
P8 开源贡献       C9          协作能力、代码规范
```

---

## 面试准备

**行为面试**（每个项目准备 STAR 故事）：最大技术挑战？为什么选这个方案？重新做会怎样？

**技术高频题**：
- 前端：虚拟 DOM、React 生命周期、SSR vs CSR、性能优化
- 后端：RESTful、认证授权、数据库索引、缓存策略
- AI：RAG 原理、Prompt Engineering、Token 管理
- 系统设计：URL 短链、聊天系统、限流器、Feed 流
- DevOps：CI/CD、Docker、Nginx、监控

**每次面试后**：记录题目 → 标记弱项 → 当天补齐 → 更新题库

---

## 技术栈

| 层 | 选择 | 面试加分点 |
|----|------|-----------|
| 语言 | TypeScript | 类型安全，前后端统一 |
| 框架 | Next.js 15 | SSR/SSG/API 全覆盖 |
| UI | Tailwind + shadcn/ui | 组件化、可定制 |
| 数据库 | PostgreSQL (Neon) + Drizzle | 关系型 + TS 原生 ORM |
| AI | Vercel AI SDK + Ollama | 云端 + 本地双模式 |
| 部署 | Vercel + Docker | Serverless + 容器化 |
| CI/CD | GitHub Actions | 行业标准 |

---

## 12 周总览

```
周   项目          算法      求职            文章
────────────────────────────────────────────────
1    P1 Todo       15题     简历v0.1+投递    ①
2    P2 AI聊天     15题     继续投递
3    P2 完成       10题     首次面试         ②
4    P3 作品集     10题     面试2次/周
────────────────────────────────────────────────
5    P4 RAG        10题     面试2次/周       ③
6    P4 完成       10题     面试+复盘
7    P5 看板       8题      简历v3.0         ④
8    P5 完成       8题      冲刺目标公司
────────────────────────────────────────────────
9    P6 CLI/插件   6题      全力面试         ⑤
10   P7 微服务     5题      全力面试
11   P7 完成       3题      谈offer
12   P8 开源(可选) 复习     收割offer        ⑥
────────────────────────────────────────────────
累计              100+题    30+次面试        6篇
```

---

## 核心原则

1. **不等准备好** — 第 1 周就投，面试是最好的学习方式
2. **每个项目能讲 5 分钟** — 做完不算完，面试讲清楚才算完
3. **算法不能停** — 每天 1 小时，雷打不动
4. **简历是活文档** — 每周更新，每次面试后优化
5. **面试复盘 > 面试本身** — 记录、补短板、迭代
6. **AI 加速不替代理解** — 每行代码你都要能解释

> 不是准备好了再上场，而是在战斗中学会战斗。
