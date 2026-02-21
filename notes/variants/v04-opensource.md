# AI 全栈工程师 3 个月成长指南 — 开源优先路线

> 写给刚拿到 MacBook Pro M5 32GB 的你。
> 核心理念：不闭门造车，在开源社区中成长。用贡献代替练习，用 PR 代替作业，用 GitHub Profile 代替 PDF 简历。

---

## 你的起点和终点

**起点**：CS 大四，有运维经验，有一台 32G 2T 的 M5 Mac，会用终端，懂 Linux 基础。
**终点**：3 个月后，你的 GitHub Profile 就是简历——有给知名项目的 merged PR，有自己的 100+ Star 开源项目，有系列源码分析文章。面试时你不是在背八股，而是在讲"我给 Next.js 修过 bug"。

---

## 能力分层：7+2（开源升级版）

**基本功**（AI 替代不了，值得花笨功夫）
1. **算法思维** — 读大型代码库时判断架构好坏的底层能力
2. **系统设计** — 理解开源项目的架构决策，才能提出有价值的 PR
3. **技术写作** — 源码分析文章是最好的学习证明

**必备技能**（在开源贡献中自然习得）
4. **TypeScript 全栈** — Next.js + Drizzle + shadcn/ui，贡献这些项目的同时学会它们
5. **AI 集成** — 给 AI 相关开源项目贡献代码，比自己从零写更有说服力
6. **DevOps** — 你已有的优势，用它帮开源项目改 CI/CD 是最容易被 merge 的 PR
7. **AI 辅助开发** — 用 Claude Code 读源码、理解架构、写 PR

**核心能力**（从加分项升级——开源路线的灵魂）
8. **本地 AI** — M5 32GB 跑本地模型，做 Ollama 生态的贡献者
9. **开源贡献** — 不再是加分项，是你的核心竞争力和学习方式

---

## 第 0 步：把 Mac 变成开源贡献工作站

你已经有 ghelper 代理了，装 Clash Verge Rev 做客户端，导入订阅链接，开系统代理 + 增强模式。

### 开发环境

```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 核心工具
brew install git node bun ollama gh
brew install --cask cursor warp visual-studio-code

# AI 编程工具
npm install -g @anthropic-ai/claude-code

# 本地模型
ollama pull qwen2.5:14b
ollama pull llama3.1:8b

# 验证
bun --version && node --version && git --version && gh --version && ollama list
```

注意：多装了 `gh`（GitHub CLI）——fork、PR、issue 全在命令行搞定。

### 账号与 GitHub Profile 设置

全部用 GitHub 账号登录：**Vercel**、**Neon**、**Claude**。

重点配置 GitHub Profile：
- 写一个 Profile README（`username/username` 仓库）
- 开启 Contribution Graph（确保 commit 邮箱一致）
- 设置 Bio：一句话说清你是谁、在做什么
- Pin 6 个仓库：随着计划推进逐步更新

**第一篇文章**：《M5 Mac 开源贡献工作站搭建 + GitHub Profile 打造指南》

---

## 第一阶段（第 1-4 周）：给知名项目提 PR

> 目标：提交 8-12 个 PR，至少 3 个被 merge。学会阅读大型代码库。

### 核心能力：阅读大型代码库

这是大多数应届生最缺的能力。不是从第一行读到最后一行，而是：

1. **入口追踪法**：从 `package.json` 的 scripts 找入口 → 顺着调用链往下读
2. **Issue 驱动法**：找一个 bug issue → 复现 → 用 debugger 追踪到出问题的代码
3. **测试反推法**：先读测试文件，理解预期行为 → 再读实现
4. **Git Blame 考古法**：对不理解的代码 `git blame` → 找到原始 PR → 读 PR 讨论理解设计意图

### 第 1 周：热身——文档和 typo 类 PR

**目标项目**：shadcn/ui、Drizzle ORM
**做什么**：
- Fork 项目，本地跑起来（这本身就是学习）
- 读 Contributing Guide，理解 PR 规范
- 找文档错误、类型定义不完善、示例代码 bug
- 提 1-2 个小 PR

**学到的**：项目结构、构建流程、代码规范、Git 工作流

```bash
# 标准开源贡献流程
gh repo fork shadcn-ui/ui --clone
cd ui && bun install && bun run build
git checkout -b fix/button-aria-label
# 改代码、跑测试
git commit -m "fix: add missing aria-label to Button component"
gh pr create --title "fix: add missing aria-label to Button" --body "..."
```

### 第 2 周：功能增强类 PR

**目标项目**：Ollama、Next.js
**做什么**：
- 在 Ollama 的 GitHub Issues 中找 `good first issue` 或 `help wanted`
- 读 Ollama 的 Go 代码（运维背景让你读 Go 不会太吃力）
- 给 Next.js 的 examples 目录贡献一个新示例
- 提 2-3 个 PR

**学到的**：跨语言阅读能力、大型项目的模块化设计

### 第 3 周：Bug 修复类 PR

**目标项目**：Vercel AI SDK、Drizzle ORM
**做什么**：
- 在 Issues 中找有复现步骤的 bug
- 本地复现 → 定位问题 → 写修复 → 补测试
- 提 2-3 个 PR

**学到的**：调试技巧、测试编写、与 maintainer 沟通

### 第 4 周：深度贡献 + 阶段总结

**目标项目**：选一个你最熟悉的项目深入
**做什么**：
- 提一个有实质性的功能 PR（不是 typo 级别）
- 参与 Issue 讨论，帮其他人解答问题
- 写 2 篇文章

**文章**：
- 《我给 shadcn/ui 提了 X 个 PR：源码结构全解析》
- 《Drizzle ORM 源码阅读笔记：从 schema 定义到 SQL 生成》

### 面试武器

每个 merged PR 都是可验证的能力证明。"我给 Next.js 贡献过代码"比"我用过 Next.js"强 10 倍。与 maintainer 的讨论记录展示沟通能力。

---

## 第二阶段（第 5-8 周）：基于开源做衍生产品

> 目标：基于你已经深入理解的开源项目，做 3 个自己的产品。

### P1：AI Chat UI（基于 Vercel AI SDK 深度定制）（第 5 周）

你已经读过 Vercel AI SDK 的源码了，现在基于它做一个更好的 Chat UI。

**做什么**：
- Next.js 15 + shadcn/ui + Vercel AI SDK
- 支持多模型切换（OpenAI / Claude / 本地 Ollama）
- 对话历史持久化（Drizzle + Neon PostgreSQL）
- 流式输出 + Markdown 渲染

**技术深度**：基于你对 AI SDK 源码的理解做深度定制——自定义 StreamingTextResponse 处理、token 计数和成本估算。

**部署**：Vercel，绑自定义域名
**文章**：《深入 Vercel AI SDK 源码后，我做了一个多模型 Chat UI》

### P2：开源项目健康度仪表盘（第 6 周）

用你的开源经验做一个工具，帮别人评估开源项目。

**做什么**：
- 调 GitHub API 获取项目数据（star 趋势、PR 合并速度、issue 响应时间）
- 可视化仪表盘（Recharts）
- 给出"项目健康度评分"

**技术栈**：Next.js + GitHub API + Drizzle + Neon
**文章**：《用 GitHub API 构建开源项目健康度分析工具》

### P3：本地 AI 知识库（Ollama + RAG）（第 7-8 周）

**做什么**：
- 本地 Ollama 模型做推理
- 实现 RAG：文档切片 → 向量化 → 检索 → 生成
- 支持导入 Markdown / PDF 文档
- Web UI 做问答交互

**技术深度**：基于 Ollama 源码理解优化本地推理性能，实现 streaming RAG pipeline，对比不同 embedding 模型效果。

**文章**：
- 《Ollama 源码解析：本地模型推理的完整链路》
- 《从零实现 RAG：不用 LangChain，纯 TypeScript 方案》

### 面试武器

每个产品都能追溯到你对源码的理解——"我读过 AI SDK 的源码，所以我知道流式输出底层是这样实现的"。产品展示全栈能力，源码分析展示深度。

---

## 第三阶段（第 9-12 周）：发布自己的开源项目

> 目标：发布一个有价值的开源项目，争取 100+ Star。

### P4：你的开源项目（第 9-10 周）

基于前两个阶段的积累，选一个方向做开源项目。推荐方向：

**方向 A：开发者工具**
- 比如：一个 CLI 工具，帮开发者快速搭建 AI 应用脚手架
- `npx create-ai-app` → 选模型 → 选 UI 框架 → 生成项目

**方向 B：AI 组件库**
- 比如：一套 React 组件，专门用于 AI 交互场景
- ChatBubble、StreamingText、ModelSelector、TokenCounter

**方向 C：Ollama 生态工具**
- 比如：Ollama 模型管理 Web UI，比官方的更好用
- 模型下载/删除、性能监控、API Playground

**关键动作**：
- 写好 README（这是你项目的门面）
- 配置 CI/CD（GitHub Actions 跑测试 + 发布）
- 发布到 npm（如果是 JS/TS 项目）
- License 选 MIT

### P5：推广与社区运营（第 11 周）

Star 不会自己来，你需要主动推广：

- 在 Reddit（r/nextjs、r/webdev）发帖介绍
- 在 Twitter/X 上发技术推文，@相关项目的作者
- 在 Hacker News 的 Show HN 发帖
- 写一篇"为什么我做了这个项目"的文章发到 dev.to
- 在你之前贡献过的项目社区里分享（你已经有人脉了）

**文章**：《从 0 到 100 Star：一个应届生的开源项目推广实录》

### P6：完善 + 作品集网站（第 12 周）

**做什么**：
- 根据社区反馈迭代你的开源项目
- 处理 Issue 和 PR（现在你是 maintainer 了）
- 搭建个人作品集网站，展示所有项目和文章
- 完善 GitHub Profile，Pin 最好的 6 个仓库

**作品集网站**：
- Next.js + Vercel 部署
- 展示：开源贡献记录、自己的项目、技术文章
- 嵌入 GitHub Contribution Graph
- 不需要花哨，干净专业就行

**文章**：《3 个月开源之路：从第一个 PR 到 100 Star》

---

## 时间节奏

每周 40-50 小时（全职投入）：

| 时间块 | 内容 | 占比 |
|--------|------|------|
| 上午 9-12 | 阅读源码 / 写代码 / 提 PR | 40% |
| 下午 2-6 | 做自己的项目 / 处理 PR 反馈 | 40% |
| 晚上 8-10 | 写文章 / 社区互动 / 算法练习 | 20% |

算法练习：每天 1 题 LeetCode Medium，不贪多，保持手感。遇到面试前再集中突击。

---

## 12 周产出清单

```
第 0 步  环境搭建 + GitHub Profile
         └─ 文章：Mac 开源工作站搭建指南

第 1-4 周  开源贡献期
         ├─ 8-12 个 PR（至少 3 个 merged）
         ├─ 深入阅读 3-5 个大型代码库
         ├─ 文章：shadcn/ui 源码解析
         └─ 文章：Drizzle ORM 源码阅读笔记

第 5-8 周  衍生产品期
         ├─ P1：AI Chat UI（多模型 + 流式）
         ├─ P2：开源项目健康度仪表盘
         ├─ P3：本地 AI 知识库（RAG）
         ├─ 文章：Vercel AI SDK 源码 + Chat UI
         ├─ 文章：GitHub API 健康度工具
         ├─ 文章：Ollama 源码解析
         └─ 文章：纯 TS 实现 RAG

第 9-12 周  自己的开源项目
         ├─ P4：开源项目（争取 100+ Star）
         ├─ P5：社区推广
         ├─ P6：作品集网站
         ├─ 文章：开源推广实录
         └─ 文章：3 个月开源之路总结
```

---

## 能力 × 项目矩阵

```
能力              贡献期        衍生产品期      开源项目期
─────────────────────────────────────────────────────────
C1 算法思维       源码阅读       RAG 实现       项目架构设计
C2 系统设计       理解架构       产品设计       开源项目设计
C3 技术写作       源码分析文章   产品文章       推广文章
C4 TS 全栈        PR 代码       P1/P2/P3       P4/P6
C5 AI 集成        AI SDK PR     P1/P3          P4
C6 DevOps         CI/CD PR      部署           GitHub Actions
C7 AI 辅助开发    读源码        写产品         维护项目
C8 本地 AI        Ollama PR     P3             P4(可选)
C9 开源贡献       ★ 核心        衍生创作       ★ 核心
```

---

## 工具

| 工具 | 在开源路线中的角色 |
|------|-------------------|
| Claude Code | 阅读大型代码库、理解架构、写 PR description |
| Cursor | 日常写代码、内联编辑、快速问答 |
| `gh` CLI | Fork、PR、Issue 管理，全在终端完成 |
| v0.dev | 快速生成 UI 组件原型 |
| Ollama | 本地模型，P3 和 P4 的核心依赖 |

## 阅读源码的工具链

```bash
claude "explain the architecture of this project"  # 快速理解项目结构
gh pr list --state merged --limit 20               # 查看 PR 历史
gh pr view 1234                                     # 读重要 PR 的讨论
git log --oneline --graph --all | head -50          # 追踪代码演进
git blame src/core/engine.ts                        # 找关键代码的作者和 PR
```

## 边界

- 开源贡献不是刷数量，一个有质量的 PR 胜过十个 typo fix
- AI 帮你读源码更快，但理解必须是你自己的
- 每个 PR 你都要能在面试中完整讲述：为什么做、怎么做、学到什么
- 社区沟通用英文，这也是在练英语

---

> 核心循环：读源码 → 提 PR → 做产品 → 写文章 → 发开源。3 个月后你的 GitHub Profile 就是最好的简历——每一个绿点都是真实的代码，每一个 PR 都是可验证的能力。面试官打开你的 GitHub，看到的不是空仓库，而是一个活跃的开源贡献者。
