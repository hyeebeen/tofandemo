# AI 全栈工程师 3 个月成长指南 — DevOps 优势最大化路线

> 写给有运维经验的你。
> 大多数应届全栈工程师不懂 DevOps，这是你的护城河。围绕它构建差异化。

---

## 你的起点和终点

**起点**：CS 大四，有 DevOps/运维经验，MacBook Pro M5 32GB 2TB，懂 Docker、Linux、CI/CD。
**终点**：3 个月后，你是市场上稀缺的"能写前端、能接 AI、还能把整条链路部署好"的人。目标岗位——AI 全栈工程师（偏基础设施/平台工程方向）。

---

## 能力分层：7+2（DevOps 加权版）

**基本功**（AI 替代不了）
1. **算法思维** — 判断 AI 生成的代码好不好，理解时间/空间复杂度
2. **系统设计** — 画得出架构图，说得清数据流和故障域
3. **技术写作** — "DevOps + AI"交叉实践文章，这个赛道内容稀缺

**必备技能**（项目中习得，DevOps 权重最高）
4. **TypeScript 全栈** — Next.js + API + 数据库，一套 TS 打通
5. **DevOps（核心优势 ★★★）** — Docker、CI/CD、监控、日志、基础设施即代码，每个项目都要体现
6. **AI 集成** — AIOps 方向：智能告警、日志异常检测、AI 运维助手
7. **AI 辅助开发** — Claude Code / Cursor 把效率拉到 3-5 倍

**加分项**
8. **本地 AI** — M5 32GB 跑本地模型做日志分析、异常检测
9. **开源贡献** — 给 DevOps 工具链项目提 PR

---

## 第 0 步：把 Mac 变成 DevOps 工作站

### 科学上网

你已经有 ghelper 代理。装 Clash Verge Rev：
- GitHub Releases 下载 dmg 安装
- 导入订阅链接，开启系统代理 + 增强模式
- 测试：`curl -I https://www.google.com`

### 开发环境

```bash
# Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 核心工具
brew install git node bun ollama kubectl helm k9s
brew install --cask cursor warp visual-studio-code docker

# AI 编程工具
npm install -g @anthropic-ai/claude-code

# 本地模型（日志分析 & 异常检测用）
ollama pull qwen2.5:14b
ollama pull llama3.1:8b

# 验证
docker --version && kubectl version --client && bun --version && ollama list
```

### 账号注册

GitHub 账号统一登录：
- **Vercel** — 前端部署
- **Neon** — PostgreSQL 数据库
- **GitHub** — 代码托管 + Actions CI/CD
- **Claude API**（或 DeepSeek 平替）
- **Docker Hub** — 镜像托管

**第一篇文章素材**：《M5 Mac DevOps 全栈开发环境搭建：从 Docker Desktop 到 K8s 本地集群》

---

## 第一阶段：基础设施 + 全栈入门（第 1-4 周）

> 目标：用你熟悉的 DevOps 视角切入全栈开发，建立"开发 → 构建 → 部署"的完整闭环。

### P1：个人作品集网站（第 1 周）

做一个带实时构建状态徽章的作品集，展示你的 DevOps 基因。

**功能**：
- Next.js 15 静态站点，展示项目卡片
- GitHub Actions 自动构建部署到 Vercel
- 构建状态徽章、最近提交信息实时展示
- Lighthouse CI 自动跑分，成绩展示在页面上

**技术栈**：Next.js + Tailwind + shadcn/ui + GitHub Actions + Vercel
**能力覆盖**：C4 TypeScript 全栈 / C5 DevOps / C7 AI 辅助开发
**面试点**：讲 CI/CD pipeline 设计，为什么选择这种部署策略

**文章**：《从零搭建带 CI/CD 的个人作品集：GitHub Actions + Vercel 实战》

### P2：Docker 化全栈应用模板（第 2 周）

做一个"一键启动"的全栈开发模板，解决团队环境不一致的痛点。

**功能**：
- Docker Compose 编排：Next.js + PostgreSQL + Redis
- 开发/生产环境配置分离（multi-stage build）
- 热重载在容器内正常工作
- 一个 `make dev` 命令启动整个开发环境

**技术栈**：Docker + Docker Compose + Next.js + PostgreSQL + Drizzle ORM
**能力覆盖**：C5 DevOps / C4 TypeScript 全栈 / C2 系统设计
**面试点**：multi-stage build 优化镜像体积，开发体验与生产安全的平衡

**文章**：《Docker Compose 全栈开发模板：一个命令启动整个环境》

### P3：GitHub Actions CI/CD 可视化面板（第 3-4 周）

把 CI/CD 流水线的状态变成一个好看的 Dashboard。

**功能**：
- 调用 GitHub API 获取 Actions 运行状态
- 实时展示：构建成功率、平均耗时、失败趋势
- 按仓库/分支筛选，时间范围选择
- 构建失败时 AI 分析失败日志，给出修复建议

**技术栈**：Next.js + GitHub REST API + Recharts + Vercel AI SDK
**能力覆盖**：C4 全栈 / C5 DevOps / C6 AI 集成 / C3 技术写作
**面试点**：API 数据聚合策略，增量更新 vs 全量拉取，AI 日志分析的 Prompt 设计

**文章**：《用 AI 分析 CI/CD 失败日志：GitHub Actions 可视化面板开发实录》

---

## 第二阶段：AIOps 核心项目（第 5-8 周）

> 目标：把 AI 和 DevOps 深度结合，做出"只有懂运维的人才能做好"的产品。

### P4：智能日志分析平台（第 5-6 周）

这是你的核心差异化项目。大多数全栈工程师做不了这个。

**功能**：
- 日志采集：支持上传日志文件或粘贴日志文本
- 日志解析：自动识别格式（JSON、syslog、nginx access log）
- AI 异常检测：用本地模型分析日志模式，标记异常
- 可视化：时间线视图、错误聚类、异常高亮
- 根因分析：选中一段异常日志，AI 给出可能原因和修复建议

**技术栈**：Next.js + PostgreSQL + Ollama（本地推理）+ Vercel AI SDK + D3.js
**能力覆盖**：C5 DevOps / C6 AI 集成 / C8 本地 AI / C2 系统设计
**面试点**：日志解析的正则设计，本地模型 vs 云端 API 的选型决策，异常检测的 Prompt Engineering

**文章**：《本地 LLM 做日志异常检测：AIOps 实战指南》

### P5：服务健康监控面板（第 7-8 周）

一个轻量级的 Uptime Monitor + 智能告警系统。

**功能**：
- HTTP/TCP 健康检查，可配置检查间隔
- 响应时间趋势图、可用性百分比（SLA 计算）
- 状态页面：公开的服务状态展示（类似 status.github.com）
- AI 智能告警：不只是"挂了就报"，而是检测响应时间异常趋势，预测性告警
- Webhook 通知（Discord/飞书）

**技术栈**：Next.js + PostgreSQL + Cron Jobs + Vercel AI SDK + WebSocket
**能力覆盖**：C5 DevOps / C6 AI 集成 / C4 全栈 / C2 系统设计
**面试点**：健康检查的可靠性设计（避免误报），时序数据存储策略，预测性告警的实现思路

**文章**：《从 Ping 到预测：用 AI 构建智能服务监控系统》

---

## 第三阶段：平台工程 + 综合项目（第 9-12 周）

> 目标：做出平台级产品，展示你能 own 整条技术链路。

### P6：一键部署平台（第 9-10 周）

简化版 Vercel/Railway——输入 GitHub 仓库地址，自动构建部署。

**功能**：
- 输入 GitHub 仓库 URL，自动检测项目类型（Node/Python/Go）
- 生成 Dockerfile（AI 辅助，根据项目结构自动生成）
- Docker 构建 + 运行，分配子域名访问
- 构建日志实时流式输出（SSE）
- 部署历史、回滚功能

**技术栈**：Next.js + Docker API（dockerode）+ PostgreSQL + Server-Sent Events
**能力覆盖**：C5 DevOps / C6 AI 集成 / C2 系统设计 / C4 全栈
**面试点**：容器隔离与安全（不能让用户代码逃逸），构建缓存策略，AI 生成 Dockerfile 的准确性保障

**文章**：《自己动手做部署平台：Docker API + AI 自动生成 Dockerfile》

### P7：基础设施成本分析器（第 11 周）

帮开发者/小团队分析云资源使用，AI 给出优化建议。

**功能**：
- 手动输入或导入云资源配置（实例类型、数量、存储）
- 成本计算和趋势可视化
- AI 分析使用模式，建议降本方案（Reserved vs On-Demand、右 sizing）
- 生成优化报告（Markdown 导出）

**技术栈**：Next.js + Recharts + Vercel AI SDK + PostgreSQL
**能力覆盖**：C5 DevOps / C6 AI 集成 / C4 全栈 / C3 技术写作
**面试点**：云成本模型的抽象设计，AI 建议的可解释性

**文章**：《AI 驱动的云成本优化：从数据采集到智能建议》

### P8：AI 运维终端助手（第 12 周）

一个跑在终端里的 AI 运维 Copilot，用本地模型。

**功能**：
- 自然语言转运维命令（"查看占用 8080 端口的进程" → `lsof -i :8080`）
- 命令执行前确认，执行后解释输出
- 上下文感知：记住当前在排查什么问题
- 常见运维场景模板：磁盘清理、进程排查、网络诊断、日志搜索
- 本地 Ollama 模型驱动，无需联网

**技术栈**：TypeScript + Ink（终端 UI）+ Ollama + Node.js
**能力覆盖**：C8 本地 AI / C5 DevOps / C6 AI 集成 / C1 算法思维
**面试点**：自然语言到命令的映射策略，安全性（防止危险命令），本地模型的响应速度优化

**文章**：《用本地 LLM 打造终端运维 Copilot：从 Prompt 到产品》

---

## 时间线总览

```
第 1 周   P1 作品集网站（CI/CD 驱动）
第 2 周   P2 Docker 化全栈模板
第 3-4 周 P3 CI/CD 可视化面板 + AI 日志分析
第 5-6 周 P4 智能日志分析平台 ★ 核心项目
第 7-8 周 P5 服务健康监控 + 智能告警
第 9-10周 P6 一键部署平台 ★ 核心项目
第 11 周  P7 基础设施成本分析器
第 12 周  P8 AI 运维终端助手

贯穿全程：每个项目配一篇技术文章，持续更新作品集
```

### 能力覆盖矩阵

```
项目  C1算法 C2设计 C3写作 C4全栈 C5运维 C6AI  C7工具 C8本地 C9开源
P1              ●      ●      ●      ●            ●
P2           ●         ●      ●
P3                ●    ●      ●      ●      ●
P4    ●      ●         ●      ●      ●            ●
P5           ●         ●      ●      ●
P6           ●         ●      ●      ●
P7                ●    ●      ●      ●
P8    ●                       ●      ●            ●
```

C5 DevOps 覆盖全部 8 个项目——这就是你的差异化。

---

## AI 协作策略

### 工具分工

| 工具 | 什么时候用 |
|------|-----------|
| Claude Code | 架构设计、多文件修改、Docker/CI 配置生成、代码审查 |
| Cursor | 日常写代码：补全、内联编辑、快速问答 |
| v0.dev | Dashboard UI：监控面板、数据可视化组件 |
| Ollama | P4 日志分析、P8 终端助手的核心推理引擎 |

### 边界

- AI 生成的每一行代码你都要能解释
- 运维命令尤其要审查——一个错误的 `rm -rf` 没有回头路
- 记录 AI 协作过程，这本身就是文章素材
- AI 帮你写得更快，不是帮你跳过理解

---

## 技术栈

一套 TypeScript 打通全栈，DevOps 工具链用你已有的经验。

| 层 | 选择 | 为什么 |
|----|------|--------|
| 语言 | TypeScript | 前后端统一，类型安全 |
| 框架 | Next.js 15 | 全栈一体，SSR/SSG/API |
| UI | Tailwind + shadcn/ui | 快速搭建 Dashboard |
| 数据库 | PostgreSQL (Neon) + Drizzle | Serverless 友好 |
| AI | Vercel AI SDK + Ollama | 云端流式 + 本地推理 |
| 容器 | Docker + Docker Compose | 你的主场 |
| CI/CD | GitHub Actions | 行业标准，每个项目必配 |
| 监控 | 自建（P5）| 吃自己的狗粮 |
| 运行时 | Bun | 快 |

---

## 面试叙事线

不单独准备面试，面试答案就藏在项目里。

**"介绍一下你自己"**
→ 我是有运维背景的全栈工程师，专注 DevOps + AI 的交叉领域。我做了一个智能日志分析平台，用本地 LLM 做异常检测；做了一个一键部署平台，AI 自动生成 Dockerfile。

**"你最有挑战的项目"**
→ P4 智能日志分析平台。难点在于日志格式千差万别的解析、本地模型推理速度优化、异常检测的误报率控制。

**"你怎么看 AI 对开发的影响"**
→ 我每个项目都用 AI 辅助开发，效率提升 3-5 倍。但 AI 生成的运维脚本必须人工审查，我在文章里详细写过这个话题。

**"系统设计题"**
→ P6 部署平台就是一个完整的系统设计案例：容器编排、构建缓存、安全隔离、日志流式传输。

---

> 核心理念：DevOps 是你的护城河。别人在学怎么部署的时候，你已经在用 AI 优化整条运维链路了。做东西 → 学技术 → 写文章 → 赢面试，每一步都围绕"DevOps + AI"这个交叉点发力。
