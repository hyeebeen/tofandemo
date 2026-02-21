# AI 全栈工程师 3 个月成长指南

> 写给刚拿到 MacBook Pro M5 32GB 的你。
> 不是培训大纲，是操作手册。从开机第一天开始，一步步做东西，所有技术在干中学。
> 三条主线：做产品解决真实问题 + 在开源社区中成长 + 用技术写作放大一切。

---

## 你的起点和终点

**起点**：CS 大四，有运维经验，有一台 32G 2T 的 M5 Mac，会用终端，懂 Linux 基础。
**终点**：3 个月后，你有一个个人网站展示 10+ 个自己做的产品，给知名开源项目提过 PR，在技术社区发过 15+ 篇文章。面试时你不是在背八股，而是在讲自己做过的东西——面试官打开你的 GitHub 和博客，能力一目了然。

**核心循环**：
```
做产品 → 遇到难题 → 深入研究 → 写文章 → 读者反馈 → 理解更深
  ↑                                                      ↓
  └──── 读开源源码 ← 提 PR ← 发现问题 ← 用别人的库 ←────┘
```

---

## 能力分层：7+2

不是所有东西都同等重要。分清楚，才不会什么都学、什么都浅。

**基本功**（AI 替代不了，值得花笨功夫）
1. **算法思维** — 不是为了刷题，是为了能判断 AI 生成的代码好不好
2. **系统设计** — 能画出一个系统的数据流，能说清楚为什么这样设计
3. **技术写作** — 把做过的事讲清楚，这个能力会复利一辈子。费曼学习法：教别人 = 真正学会

**必备技能**（当前市场要的，在项目中自然习得）
4. **TypeScript 全栈** — Next.js + API + 数据库，一套 TS 打通
5. **AI 集成** — 把 LLM 接进产品里：流式输出、Prompt 工程、RAG
6. **DevOps** — 你已经有的优势，放大它
7. **AI 辅助开发** — 用 Claude Code / zed 把效率拉到 3-5 倍

**加分项**（有了脱颖而出）
8. **本地 AI** — 你的 M5 32GB 能跑本地模型，大多数应届生没这个条件
9. **开源贡献** — 给别人的项目提过 PR，证明你能在真实协作中写代码

---

## 第 0 步：把 Mac 变成开发武器

拿到电脑的第一天，别急着写代码。先把环境搞利索，这本身就是第一个项目。

### 科学上网

你已经有 ghelper 代理了。装一个 Clash Verge Rev 作为客户端：
- 从 GitHub Releases 下载 dmg 安装
- 导入你的订阅链接
- 开启系统代理 + 增强模式
- 测试：`curl -I https://www.google.com` 能通就行

科学上网不是可选项，是基础设施。GitHub、npm、Docker Hub、AI API 文档、Stack Overflow——你每天都要用。

### 开发环境

```bash
# Homebrew（Mac 包管理）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 核心工具 (这里可以查询你自己习惯使用的，但建议是 zed 、claude code CLI和 textmate)
brew install git node bun ollama gh
brew install --cask cursor warp visual-studio-code

# AI 编程工具
npm install -g @anthropic-ai/claude-code

# 写作和内容工具
brew install --cask obsidian typora cleanshot

# 本地模型（利用你的 32GB）
ollama pull qwen2.5:14b
ollama pull llama3.1:8b

# 验证
bun --version && node --version && git --version && gh --version && ollama list
```

注意多装了两样东西：`gh`（GitHub CLI）——fork、PR、issue 全在终端搞定；`obsidian`——写文章的主力工具。

### 账号注册

全部用 GitHub 账号登录，保持统一：
- **Vercel** — 部署平台，免费额度够用
- **Neon** — PostgreSQL 数据库，免费 tier
- **GitHub** — 代码托管，开启 2FA，写好 Profile README
- **Claude** — AI API（或用 DeepSeek 作为平替）
- **掘金** — 中文技术社区，发文章
- **Dev.to** — 英文技术社区，精选文章翻译发

或者也可以直接使用本地 docker desktop 

### GitHub Profile 配置

这是你的线上简历，比 PDF 重要：
- 创建 `username/username` 仓库，写 Profile README
- 开启 Contribution Graph（确保 commit 邮箱一致）
- Bio 一句话说清你是谁
- Pin 6 个仓库，随着计划推进逐步更新

**做完这步，你已经有了第一篇文章的素材**：《M5 MacBook Pro 全栈开发环境 + 开源工作站搭建指南》

---

## 做东西：12 个产品 + 开源贡献，15+ 篇文章

不是"学完再做"，是"做着学"。三种产出交替进行：
- **自己的产品** — 解决你自己的真实问题
- **开源贡献** — 给你用的库提 PR，在真实项目中成长
- **技术文章** — 每个产品/贡献提炼一篇，放大你的影响力

### Phase 1：上手（Week 1-2）

目标：跑通"想法 → 代码 → 上线"的完整闭环，建立 AI coding 工作流。

**P1. 个人网站 v0.1** — 你的线上名片
- 解决什么：面试官搜你名字，能看到一个专业的页面
- 怎么做：`bunx create-next-app`，用 Cursor 写，Vercel 一键部署
- 你会学到：Next.js 项目结构、Tailwind CSS、Vercel 部署流程
- 文章：《从 `bun create` 到上线：30 分钟部署第一个 Next.js 网站》
- 关键：先上线再迭代，v0.1 只需要首页 + 关于我 + 项目列表

**P2. 求职追踪器** — 管理你的投递进度
- 解决什么：投了哪些公司、什么状态、下次跟进时间——用表格管太乱了
- 怎么做：Next.js + SQLite（本地先跑），CRUD 全栈闭环
- 你会学到：Server Actions、数据库基础、表单处理、Zod 验证
- 文章：《用 Next.js Server Actions 做一个全栈 CRUD 应用》
- 关键：这个工具你接下来 3 个月每天都会用，所以会持续迭代

**P3. AI 周报生成器** — 把 Git 提交变成周报
- 解决什么：每周总结做了什么很烦，让 AI 从 Git log 自动生成
- 怎么做：读取 Git log → 调用 LLM API → 生成结构化周报
- 你会学到：第一次调 AI API、Prompt 工程基础、CLI 工具开发
- 文章：《我的第一个 AI 工具：从 Git Log 到周报只需一条命令》

### Phase 2：核心能力 + 开源贡献（Week 3-7）

目标：每个项目攻克一个核心技术点，同时开始给你用的开源库提 PR。

**P4. 算法刷题伴侣** — 间隔重复 + AI 解题提示
- 解决什么：LeetCode 刷完就忘，需要科学复习
- 怎么做：SM-2 间隔重复算法 + AI 生成提示（不是直接给答案）
- 你会学到：算法实现（不是刷题，是实现调度算法）、PostgreSQL + Drizzle ORM
- 文章：《实现 SM-2 算法：为什么间隔重复比死记硬背有效》

**P5. 简历定制器** — AI 根据 JD 调整简历重点
- 解决什么：每个岗位侧重点不同，手动改简历太慢
- 怎么做：上传简历 + 粘贴 JD → AI 分析匹配度 → 建议修改
- 你会学到：Vercel AI SDK 流式输出、文件上传处理、Prompt 工程进阶
- 文章：《Prompt 工程实战：让 AI 理解 JD 并优化你的简历》

**P6. 本地模型竞技场** — 在你的 M5 上跑模型对比
- 解决什么：Ollama 装了好几个模型，到底哪个适合什么场景？
- 怎么做：同一个 Prompt 发给多个本地模型，对比速度和质量
- 你会学到：Ollama API、模型量化概念、MLX 框架、性能基准测试
- 文章：《M5 MacBook Pro 本地 LLM 实测：哪个模型最适合日常开发》
- 关键：这篇文章会有流量——很多人买了 Mac 想知道能跑什么模型

**P7. 一键部署 CLI** — 把你的运维经验产品化
- 解决什么：每次部署新项目都要重复配 Docker + CI/CD
- 怎么做：CLI 工具，交互式选择技术栈 → 自动生成 Dockerfile + GitHub Actions
- 你会学到：CLI 开发（Commander.js）、Docker API、模板引擎
- 文章：《把运维经验变成产品：一个部署 CLI 的设计思路》

**开源贡献穿插进行（Week 3-7）**

在做自己项目的过程中，你会大量使用开源库。遇到 bug 或缺失功能时，不要绕过去——去提 PR。

**重点关注：AI Coding 开源生态**

这些项目是当前最活跃的 AI 编程开源项目，代码质量高、社区活跃、适合贡献：

| 项目 | 语言 | Stars | 定位 | 你能贡献什么 |
|------|------|-------|------|-------------|
| [OpenCode](https://github.com/opencode-ai/opencode) | Go | 11k+ | 终端 AI 编程 Agent | Go 不熟没关系——改文档、加测试、优化 CI/CD（你的强项） |
| [Cline](https://github.com/cline/cline) | TypeScript | 58k+ | VS Code 内 AI Agent | TypeScript 项目，和你的技术栈完全一致，最适合深度贡献 |
| [Aider](https://github.com/Aider-AI/aider) | Python | 40k+ | 终端 AI 结对编程 | Python 项目，适合修 bug 和加小功能 |
| [Roo Code](https://github.com/RooCodeInc/Roo-Code) | TypeScript | 22k+ | VS Code AI Agent 团队 | TypeScript，Cline 的 fork，社区更开放 |
| [NanoCoder](https://github.com/Nano-Collective/nanocoder) | TypeScript | 1.3k+ | 本地优先终端 Agent | 小项目，代码量少，最容易读懂和贡献 |

**为什么要关注这些项目：**
- 它们就是你每天用的 Claude Code / Cursor 的开源替代品，读源码能理解 AI coding 工具的底层原理
- 面试时说"我给 Cline 提过 PR"比说"我用过 Cursor"有说服力 100 倍
- 这些项目的架构（Tool Use、MCP、Agent Loop）就是 AI 工程的核心知识

**贡献路径建议：**
1. **NanoCoder**（入门）— 代码量小，TypeScript，先读懂整体架构，修一个 issue
2. **Roo Code / Cline**（进阶）— 大型 TypeScript 项目，找 `good first issue`，从 bug fix 开始
3. **OpenCode**（挑战）— Go 语言，但 CI/CD 和文档贡献不需要懂 Go

**同时也关注你日常用的库：**
- shadcn/ui、Drizzle ORM、Ollama、Vercel AI SDK——用的时候踩坑了就去提 PR

怎么找到可以贡献的点：
- **用的时候踩坑了** → 修 bug，最容易被 merge
- **文档不清楚** → 改文档，门槛最低的 PR
- **缺一个小功能** → 加功能，先开 issue 讨论再写代码
- **CI/CD 可以优化** → 你的 DevOps 优势，别人不擅长的你擅长

阅读大型代码库的方法：
```bash
claude "explain the architecture of this project"  # AI 帮你快速理解结构
gh issue list --label "good first issue"            # 找适合新手的 issue
gh pr list --state merged --limit 20                # 看别人怎么提 PR
git blame src/core/engine.ts                        # 追踪关键代码的历史
```

目标：Phase 2 期间提交 5-8 个 PR，至少 2 个被 merge。每个被 merge 的 PR 写一篇文章。

**文章示例**：
- 《NanoCoder 源码解读：一个 AI Coding Agent 的最小实现》
- 《给 Cline 提 PR：我是怎么优化 Tool Use 调用链的》
- 《OpenCode vs Claude Code：开源 AI 编程工具架构对比》
- 《Drizzle ORM 源码阅读：migration 系统是怎么工作的》

### Phase 3：综合展示（Week 8-12）

目标：把前面的能力整合成有说服力的作品，同时密集面试。

**P8. 文档问答机器人** — 和任何 PDF/文档对话
- 解决什么：技术文档太长，想直接问问题
- 怎么做：上传文档 → 分块 → Embedding → 向量检索 → LLM 生成回答
- 你会学到：RAG 完整架构、Embedding、向量数据库、检索策略
- 文章：《从零实现 RAG：让任何文档变成可对话的知识库》

**P9. 个人网站 v2.0** — 从名片升级为 AI 原生作品集
- 解决什么：把前面所有项目整合展示，让面试官能互动体验
- 怎么做：在 P1 基础上加：项目展示页、技术博客（你写的文章都在这）、AI 聊天助手
- 你会学到：Better Auth 认证、全栈架构设计、SEO 优化
- 文章：《个人网站从 v0.1 到 v2.0：一个全栈项目的演进记录》

**P10. AI 运维助手** — 结合你的运维经验
- 解决什么：日志分析靠肉眼太慢，让 AI 帮忙识别异常模式
- 怎么做：接入日志流 → AI 分析异常 → 自动生成告警摘要
- 你会学到：流式数据处理、MCP 概念实践、告警系统设计
- 文章：《AI + DevOps：用 LLM 做智能日志分析和告警》

**P11. GitHub Code Review Bot** — AI 帮你审代码
- 解决什么：自己的 PR 没人 review，AI 来当第一个 reviewer
- 怎么做：GitHub Webhook → 读取 PR diff → AI 审查 → 评论回写
- 你会学到：GitHub API、Webhook、MCP Server 基础
- 参考：读 Cline 和 OpenCode 的 Tool Use 实现，理解 AI Agent 怎么和外部系统交互
- 文章：《构建一个 AI Code Review Bot：从 Webhook 到智能评论》
- 关键：这个项目本身可以开源，争取 50+ Star

**P12. 发布你自己的开源项目 + 深度贡献 AI Coding 生态**
- 从 P7（部署 CLI）或 P11（Code Review Bot）中选一个，正式开源发布
- 同时给 NanoCoder / Cline / Roo Code 提一个有质量的功能 PR（不是 typo fix）
- 写好 README（英文）、添加 LICENSE、配置 CI/CD、发布到 npm
- 在 V2EX、Hacker News、Reddit 推广
- 文章：《我的第一个开源项目：从代码到社区的完整记录》+ 《给 [项目名] 贡献代码：从读源码到 PR 被 merge》
- 目标：自己的项目 100+ Star，AI Coding 项目至少 1 个功能 PR 被 merge

---

## 技术写作：你的放大器

每个产品、每个开源贡献都产出一篇文章。不是写日记，是写"别人搜到能学到东西"的内容。

### 好文章的公式

```
文章 = 一个具体的技术难题 + 你踩过的坑 + 最终的解决方案
```

不要写《我用 Next.js 做了一个网站》——没人搜这个。
要写《Next.js Server Actions 中处理文件上传的 3 个坑》——有人搜。

### 结构（800-2000 字就够）

1. **问题**（2 句话）— 我遇到了什么，为什么值得写
2. **我先试了什么**（200 字）— 第一反应是什么，为什么不行
3. **解决方案**（500 字）— 最终怎么搞定的，关键代码贴出来
4. **为什么有效**（200 字）— 底层原理，让读者真正理解
5. **一句话总结** — 可复用的经验

### 三类文章交替写

| 类型 | 来源 | 示例 | 频率 |
|------|------|------|------|
| 产品实战 | 你做的 12 个产品 | 《从零实现 RAG》《Prompt 工程实战》 | 每个产品 1 篇 |
| 源码分析 | 你的开源贡献 | 《Drizzle ORM migration 系统源码解读》 | 每个 PR 1 篇 |
| 工具评测 | 你的使用体验 | 《M5 本地 LLM 实测》《Claude Code vs Cursor》 | 有感而发 |

### 发在哪

| 平台 | 用途 | 策略 |
|------|------|------|
| 个人博客（P9） | 主阵地，SEO 长尾流量 | 每篇都发，面试官直接看 |
| 掘金 | 中文技术社区曝光 | 精选发，标题要有搜索关键词 |
| Dev.to | 英文社区，外企加分 | 精选 3-5 篇翻译发 |
| GitHub README | 项目文档 | 每个项目的 README 本身就是作品 |

### 增长飞轮

```
写文章 → 被搜到 → 涨读者 → 被面试官看到
  ↑                                    ↓
做项目 ← 学技术 ← 教别人 ← 写文章 ← 读者提问发现盲区
```

费曼学习法闭环：做项目遇到问题 → 深入研究 → 写文章发现理解不够 → 继续深入 → 读者提问发现盲区 → 再次深入。每一轮理解更深一层。

---

## 面试：不是单独准备，是自然发生

你做的每个产品就是面试素材，你写的每篇文章就是面试谈资，你提的每个 PR 就是能力证明。

### LeetCode：每天 30 分钟，嵌入日常(可以考虑做个算法学习小工具和可视化工具)

- Week 1-4：Easy 为主，熟悉 TypeScript 解题，每天 1 题
- Week 5-8：Medium 为主，链表/树/BFS/DFS，每天 1 题
- Week 9-12：高频题复习 + 少量 Hard，每天 1 题
- P4 算法刷题伴侣帮你管理复习节奏
- 目标：80+ 题，不追求数量，追求每题能讲清楚思路

### 系统设计：从你的项目里来

| 面试题 | 你的项目 | 你能讲的深度 |
|--------|---------|-------------|
| 设计一个聊天系统 | P8 文档问答 + P9 网站 AI 助手 | 流式传输、SSE、上下文管理 |
| 设计一个 CI/CD 系统 | P7 部署 CLI + P10 运维助手 | Docker 编排、流水线、回滚 |
| 设计一个推荐系统 | P5 简历定制器 | Embedding 相似度、Prompt 策略 |
| 设计一个 AI 应用 | P6 P8 P11 | 模型选择、成本、RAG、流式架构 |

### 行为面试 = 讲项目故事 + 开源经历

| 问题 | 用什么回答 |
|------|-----------|
| 讲一个有挑战的项目 | P8 RAG 的检索精度调优 |
| 你如何快速学习新技术 | P6 三天搞懂模型量化 |
| 你如何在团队中协作 | 给 shadcn/ui 提 PR 的 code review 过程 |
| 你的 DevOps 经验 | P7 + P10，从运维到产品化 |
| 为什么选 AI 全栈方向 | 整体叙事：12 个产品 + 开源贡献 + 15 篇文章 |

### 投递节奏

- Week 4 开始投"练手"公司，积累面试经验
- Week 8 开始投目标公司，这时你已经有 8 个项目 + 开源 PR + 多篇文章
- Week 11-12 密集面试，每场面试后 24 小时内写复盘
- P2 求职追踪器帮你管理所有投递状态

---

## AI 辅助开发：怎么用，边界在哪

### 工作流

```
你定义问题和架构 → AI 生成代码 → 你审查修改 → AI 生成测试 → 你部署上线 → 你写文章
     (C4)              (C7)          (C2)           (C7)         (C5)         (C6)
```

### 工具

| 工具 | 什么时候用 |
|------|-----------|
| Claude Code | 复杂任务：架构设计、多文件修改、代码审查、阅读开源源码 |
| zed | 日常写代码：补全、内联编辑、快速问答 |
| `gh` CLI | 开源贡献：fork、PR、issue，全在终端搞定 |
| v0.dev | 前端 UI：描述你要什么组件，直接生成 |
| Ollama | 本地模型：P6 和 P8 的核心依赖 |

### 边界

- AI 生成的每一行代码你都要能解释——面试官会问
- 遇到不懂的地方停下来搞懂，不要跳过
- 记录你和 AI 的协作过程——这本身就是文章素材,使用 claude skill ,将每次和 AI 的对话都保存下来
- AI 帮你写得更快，不是帮你跳过理解
- 开源贡献不是刷数量，一个有质量的 PR 胜过十个 typo fix

---

## 技术栈

一套 TypeScript 打通全栈，不折腾多语言。

| 层 | 选择 | 为什么 |
|----|------|--------|
| 语言 | TypeScript | 类型安全，前后端统一 |
| 框架 | Next.js 15 | 全栈一体，SSR/SSG/API 都有 |
| UI | Tailwind + shadcn/ui | 快，好看，可定制 |
| 数据库 | PostgreSQL (Neon) + Drizzle | Serverless 友好，TS 原生 ORM |
| AI | Vercel AI SDK + Ollama | 云端流式 + 本地推理 |
| 认证 | Better Auth | 灵活，学习价值高 |
| 部署 | Vercel + Docker | 零配置 + 容器化 |
| CI/CD | GitHub Actions | 行业标准 |
| 运行时 | Bun | 快 |

---

> 核心理念：做产品 → 学技术 → 提 PR → 写文章 → 赢面试。三条线拧成一股绳，3 个月后你手里有 12 个产品、多个被 merge 的开源 PR、15+ 篇技术文章、一个能互动的作品集网站。面试官问你什么，你都能说"我做过，我写过，我贡献过"。
