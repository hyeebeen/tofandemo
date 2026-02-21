# AI 全栈工程师 3 个月成长指南 — AI 深度路线

> 全栈是载体，AI 是内核。每个项目都是一个 AI 应用，从 API 调用到多模型 Agent 编排，逐步深入。

---

## 你的起点和终点

**起点**：CS 大四，有运维经验，MacBook Pro M5 32GB 2TB，会用终端，懂 Linux 基础，有 ghelper 科学上网。
**终点**：3 个月后，你有 12 个 AI 应用项目、12 篇 AI 工程实践文章、一个 AI 原生作品集网站。面试时你讲的不是"我了解 RAG"，而是"我从零实现过 RAG，踩过这些坑，最终检索准确率从 60% 提到 85%"。

---

## 能力分层：7+2

**基本功**（AI 替代不了）
1. **算法思维 (C1)** — 判断 AI 生成代码的质量，理解模型推理的计算复杂度
2. **系统设计 (C2)** — 画出 AI 应用的数据流：用户输入 → Embedding → 检索 → 生成 → 流式输出
3. **技术写作 (C3)** — AI 工程实践文章，记录 Prompt 迭代、RAG 调优、Agent 编排的真实过程

**必备技能**（权重排序：AI 集成 > 本地 AI > 全栈 > DevOps）
4. **AI 集成 (C4)** ★★★ — LLM API、Prompt 工程、RAG、Agent、MCP、多模型编排
5. **TypeScript 全栈 (C5)** — Next.js 作为 AI 应用的 Web 载体，不单独强调
6. **DevOps (C6)** — 模型部署、GPU 推理服务、AI 应用的 CI/CD
7. **AI 辅助开发 (C7)** — Claude Code + Cursor 加速 AI 应用开发

**加分项**
8. **本地 AI (B1)** ★★★ — Ollama + MLX + llama.cpp，M5 32GB 的独特优势
9. **开源贡献 (B2)** — 给 AI 工具链（LangChain、Ollama、AI SDK）提 PR

---

## 第 0 步：把 Mac 变成 AI 开发武器

### 科学上网

已有 ghelper 代理。装 Clash Verge Rev：
- GitHub Releases 下载 dmg，导入订阅，开启系统代理 + 增强模式
- 验证：`curl -I https://api.openai.com` 能通就行

### AI 开发环境

```bash
# 基础工具
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git node bun ollama cmake

# 编辑器 + AI 工具
brew install --cask cursor warp
npm install -g @anthropic-ai/claude-code

# 本地模型矩阵（充分利用 M5 32GB）
ollama pull qwen2.5:14b          # 中文最强，日常开发主力
ollama pull llama3.1:8b           # 英文通用，速度快
ollama pull nomic-embed-text      # Embedding 模型，RAG 必备
ollama pull codellama:13b         # 代码专用模型

# MLX 框架（Apple Silicon 原生加速）
pip install mlx mlx-lm
# llama.cpp（GGUF 格式模型推理）
brew install llama.cpp

# 验证
ollama list && python -c "import mlx; print('MLX OK')"
```

### 账号注册

用 GitHub 账号统一登录：
- **Vercel** — 部署 AI Web 应用
- **Neon** — PostgreSQL + pgvector 向量数据库
- **Anthropic / OpenAI** — AI API（DeepSeek 作为平替）
- **Hugging Face** — 模型下载、Spaces 部署

**第一篇文章素材**：《M5 MacBook Pro AI 开发环境搭建：从 Ollama 到 MLX 全攻略》

---

## 做东西：12 个 AI 项目，12 篇实践文章

核心递进路径：**API 调用 → Prompt 工程 → RAG → Agent → MCP → 多模型编排**

### Phase 1：AI 入门（Week 1-2）

目标：跑通 AI API 调用全链路，建立 Prompt 工程直觉。

**P1. AI 个人网站 v0.1** — 带 AI 聊天的线上名片
- AI 技术：接入 LLM API，实现流式对话，用 System Prompt 定义 AI 人设
- 全栈载体：Next.js + Vercel AI SDK + Tailwind
- 你会学到：AI SDK 流式输出、SSE 协议、基础 Prompt 设计
- 文章：《Vercel AI SDK 流式输出实战：从 API 调用到打字机效果》
- 能力覆盖：C4 C5 C7

**P2. Prompt 工程工作台** — 可视化调试 Prompt 的工具
- AI 技术：多模型对比（云端 + 本地）、Temperature/TopP 参数实验、Prompt 模板管理
- 全栈载体：Next.js 全栈应用，SQLite 存储 Prompt 历史
- 你会学到：Prompt 工程系统化方法、模型参数对输出的影响、Ollama API
- 文章：《Prompt 工程不是玄学：我用工具量化了 Temperature 对输出质量的影响》
- 能力覆盖：C4 B1 C5

**P3. AI Git 周报 + Commit 生成器** — 第一个 AI CLI 工具
- AI 技术：结构化输出（JSON Mode）、Few-shot Prompting、本地模型 vs 云端对比
- 全栈载体：Node.js CLI（Commander.js）
- 你会学到：结构化 Prompt 设计、CLI 开发、本地模型实际表现评估
- 文章：《结构化输出实战：让 LLM 稳定输出 JSON 的 5 种方法》
- 能力覆盖：C4 B1 C7

### Phase 2：AI 核心能力（Week 3-7）

目标：掌握 RAG、Embedding、Agent、MCP 四大 AI 工程核心。

**P4. 本地模型竞技场** — M5 上的模型评测平台
- AI 技术：Ollama / MLX / llama.cpp 三种推理引擎对比、模型量化（Q4/Q5/Q8）、性能基准测试
- 全栈载体：Next.js 仪表盘，实时显示推理速度、内存占用、输出质量评分
- 你会学到：模型量化原理、Apple Silicon 推理优化、MLX 框架使用
- 文章：《M5 32GB 本地 LLM 深度评测：Ollama vs MLX vs llama.cpp》
- 能力覆盖：B1 C4 C2
- 关键：这篇文章自带流量，硬件评测 + AI 实测是热门话题

**P5. 文档知识库（RAG 系统）** — 和任何文档对话
- AI 技术：文档分块策略（固定/语义/递归）、Embedding 生成、pgvector 向量检索、Reranking、上下文窗口管理
- 全栈载体：Next.js + Neon PostgreSQL（pgvector 扩展）
- 你会学到：RAG 完整架构、Embedding 模型选择、检索策略调优、Chunk 大小对准确率的影响
- 文章：《从零实现 RAG：Chunk 策略选错，准确率直接腰斩》
- 能力覆盖：C4 C2 C5 B1
- 关键：RAG 是 AI 工程面试第一高频话题，你要能画出完整架构图并讲清每个环节的 trade-off

**P6. AI 简历定制器 + 面试模拟器** — Prompt 工程进阶
- AI 技术：多轮对话管理、角色扮演 Prompt、Chain-of-Thought 推理、流式输出中断与恢复
- 全栈载体：Next.js + 文件上传 + Markdown 渲染
- 你会学到：复杂 Prompt 链设计、对话状态管理、AI 输出质量评估
- 文章：《多轮对话 Prompt 设计：让 AI 扮演面试官的 7 个技巧》
- 能力覆盖：C4 C5 C7

**P7. MCP Server：个人知识图谱** — 让 AI 访问你的所有数据
- AI 技术：MCP 协议实现（Resources + Tools + Prompts）、Tool Calling、Function Calling
- 全栈载体：TypeScript MCP Server + Claude Desktop 集成
- 你会学到：MCP 协议规范、Tool 定义与调用、AI 与外部系统的标准化集成
- 文章：《MCP 实战：让 Claude 读取我的笔记、代码和日程》
- 能力覆盖：C4 C2 B1
- 关键：MCP 是 AI 工程的新标准，掌握它等于掌握 AI 应用的"USB 接口"

**P8. AI Agent：自动化代码审查** — 从 Tool Use 到 Agent Loop
- AI 技术：Agent 循环（Observe → Think → Act）、Tool Use 编排、GitHub API 集成、多步推理
- 全栈载体：GitHub Webhook + Next.js API Route + Agent 引擎
- 你会学到：Agent 架构设计、Tool 定义与错误处理、Agent 的停止条件设计
- 文章：《从 Tool Use 到 Agent Loop：构建一个真正能干活的 AI Code Reviewer》
- 能力覆盖：C4 C2 C6 B2

### Phase 3：AI 系统工程（Week 8-12）

目标：多模型编排、复杂 Agent 系统、AI 应用的生产化部署。

**P9. 多模型编排引擎** — 路由、降级、成本控制
- AI 技术：模型路由（按任务类型选模型）、降级策略（云端挂了切本地）、成本追踪、并发请求管理
- 全栈载体：Next.js 管理面板 + 独立路由服务
- 你会学到：多模型架构设计、负载均衡策略、成本优化、本地/云端混合部署
- 文章：《AI 应用的模型路由：如何在质量、速度和成本之间找到平衡》
- 能力覆盖：C4 C2 B1 C6

**P10. AI 运维助手（Agent + MCP + RAG）** — 三大技术融合
- AI 技术：RAG 检索运维知识库 + MCP 连接监控系统 + Agent 自动执行修复动作
- 全栈载体：Next.js 仪表盘 + MCP Server + Agent 引擎
- 你会学到：复杂 AI 系统的架构设计、RAG + Agent 的结合、安全边界（AI 能执行什么操作）
- 文章：《RAG + Agent + MCP：构建一个能自动排查故障的 AI 运维助手》
- 能力覆盖：C4 C2 C6 B1
- 关键：这个项目融合你的运维经验和 AI 能力，是面试的王牌项目

**P11. 个人网站 v2.0** — AI 原生作品集
- AI 技术：AI 聊天助手（RAG 你的所有文章和项目）、智能项目推荐、访客意图识别
- 全栈载体：Next.js + Better Auth + PostgreSQL + 全部前序项目集成
- 你会学到：AI 功能的产品化设计、全栈架构整合、性能优化
- 文章：《个人网站的 AI 进化：从静态展示到智能交互》
- 能力覆盖：C4 C5 C2 C3

**P12. 开源贡献** — 给 AI 工具链提 PR
- 目标项目：Ollama、Vercel AI SDK、LangChain.js、shadcn/ui 的 AI 组件
- 你会学到：阅读大型 AI 项目源码、开源协作流程
- 文章：《我的第一个 AI 开源贡献：从读源码到 PR 被合并》
- 能力覆盖：B2 C4 C1

---

## AI 技术递进地图

```
Week 1-2          Week 3-4          Week 5-7          Week 8-10         Week 11-12
API 调用          本地模型           RAG + MCP         Agent 系统        多模型编排
P1 P2 P3          P4                P5 P6 P7          P8 P9 P10         P11 P12

LLM API ──→ Ollama/MLX ──→ Embedding ──→ Tool Use ──→ 模型路由
流式输出       量化推理        向量检索      Agent Loop    降级策略
Prompt 基础    性能评测        Reranking     MCP 协议      成本控制
```

---

## 技术文章：AI 工程实践导向

### 好文章的公式

```
文章 = 一个 AI 工程难题 + 你的调优过程（数据说话）+ 最终方案 + 可复用的经验
```

不要写《我用 RAG 做了一个问答系统》。
要写《RAG 检索准确率从 60% 到 85%：我调了哪些参数》。

### 结构（800-2000 字）

1. **问题**（2 句话）— 遇到什么 AI 工程问题
2. **量化现状**（100 字）— 当前效果的数据：准确率、延迟、成本
3. **调优过程**（500 字）— 试了什么，每次改动的效果对比
4. **最终方案**（300 字）— 关键代码 + 配置 + 架构图
5. **数据对比**（100 字）— 优化前后的硬数据
6. **一句话总结** — 可复用的 AI 工程经验

### 发在哪

- **个人网站**（P11）— 主阵地，AI 助手能检索你的文章回答面试官的问题
- **掘金** — 中文 AI 工程实践，选 6 篇精华
- **Dev.to** — 英文版，选 3 篇翻译，外企加分
- **GitHub README** — 每个项目的技术文档

---

## 面试策略：嵌入项目，自然发生

### LeetCode：每天 30 分钟

- Week 1-4：Easy，TypeScript 解题，每天 1 题
- Week 5-8：Medium，重点刷图/树/动态规划，每天 1 题
- Week 9-12：高频题复习，每天 1 题
- 目标：80+ 题，每题能讲清思路

### AI 工程面试高频题 → 你的项目

| 面试题 | 你的项目 | 你能讲的深度 |
|--------|---------|-------------|
| 讲讲 RAG 架构 | P5 文档知识库 | 分块策略、Embedding 选择、Reranking、准确率调优数据 |
| MCP 是什么 | P7 知识图谱 | 协议规范、Tool/Resource/Prompt 三要素、实际集成经验 |
| Agent 怎么设计 | P8 代码审查 + P10 运维助手 | Agent Loop、停止条件、Tool 编排、安全边界 |
| 模型选择和成本 | P4 竞技场 + P9 编排引擎 | 量化对比数据、路由策略、降级方案、成本模型 |
| 本地部署经验 | P4 + B1 全线 | Ollama/MLX/llama.cpp 对比、量化精度损失、内存优化 |
| 设计一个 AI 应用 | P10 运维助手 | RAG + Agent + MCP 融合架构、完整数据流图 |
| Prompt 工程 | P2 工作台 + P6 面试模拟 | 系统化方法、Temperature 实验数据、多轮对话设计 |

### 投递节奏

- Week 4 开始投练手公司，积累 AI 岗面试经验
- Week 8 投目标公司，此时有 8 个 AI 项目 + 8 篇实践文章
- Week 11-12 密集面试，每场面试后 24 小时内写复盘

---

## AI 辅助开发工作流

```
你定义 AI 应用架构 → AI 生成代码 → 你审查 AI 逻辑 → AI 生成测试 → 你部署上线 → 你写文章
      (C2)              (C7)          (C4)           (C7)         (C6)         (C3)
```

### 工具

| 工具 | 什么时候用 |
|------|-----------|
| Claude Code | 架构设计、Agent 逻辑、多文件重构 |
| Cursor | 日常写代码、内联编辑、快速调试 |
| Ollama | 本地推理：P4/P5/P7/P9/P10 的核心依赖 |
| MLX | Apple Silicon 优化推理，P4 评测对比 |
| v0.dev | AI 应用的前端 UI 快速生成 |

### 边界

- AI 生成的每一行代码你都要能解释
- 重点理解 AI 工程的"为什么"：为什么选这个 Chunk 大小、为什么用这个 Embedding 模型
- 记录 Prompt 迭代过程——这本身就是最好的文章素材
- 本地模型优先：能本地跑的不用云端，省钱且理解更深

---

## 技术栈

| 层 | 选择 | 为什么 |
|----|------|--------|
| 语言 | TypeScript | 前后端统一，AI SDK 生态最好 |
| 框架 | Next.js 15 | AI 应用的 Web 载体，SSR/SSG/API/流式全支持 |
| UI | Tailwind + shadcn/ui | 快速搭建 AI 应用界面 |
| 数据库 | PostgreSQL (Neon) + pgvector | 向量检索原生支持，RAG 必备 |
| ORM | Drizzle | TypeScript 原生，支持 pgvector |
| AI SDK | Vercel AI SDK | 流式输出、Tool Use、多模型支持 |
| 本地推理 | Ollama + MLX + llama.cpp | 三种引擎覆盖不同场景 |
| Embedding | nomic-embed-text / text-embedding-3-small | 本地 + 云端双方案 |
| Agent | Claude Agent SDK / 自研 | Agent Loop + Tool Use |
| MCP | @modelcontextprotocol/sdk | AI 应用的标准化集成协议 |
| 部署 | Vercel + Docker | Web 应用 + 模型服务分离部署 |
| CI/CD | GitHub Actions | 自动化测试 + 部署 |
| 运行时 | Bun | 快 |

---

> 核心理念：每个项目都是一个 AI 应用，全栈只是载体。3 个月后你手里有 12 个 AI 项目、12 篇工程实践文章，面试官问任何 AI 工程问题，你都能说"我做过，数据在这里"。
