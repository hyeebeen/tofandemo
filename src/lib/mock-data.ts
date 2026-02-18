export interface Project {
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  skills: string[];
  githubUrl: string;
  demoUrl: string;
  content: string;
  relatedPosts: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  content: string;
  relatedProjects: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: string;
}

export interface Experience {
  id: string;
  type: "education" | "work" | "opensource";
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export const mockProjects: Project[] = [
  {
    slug: "devforge",
    title: "DevForge",
    description: "AI 驱动的个人技术展示网站，集项目作品集、技术博客、在线简历于一体。",
    coverImage: "/placeholder-project.svg",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AI"],
    githubUrl: "https://github.com/example/devforge",
    demoUrl: "https://devforge.example.com",
    content: "DevForge 是一个面向开发者的个人技术展示平台...",
    relatedPosts: ["building-devforge", "nextjs-app-router"],
  },
  {
    slug: "minimind",
    title: "MiniMind",
    description: "轻量级深度学习框架，从零实现 Transformer 架构，支持训练和推理。",
    coverImage: "/placeholder-project.svg",
    skills: ["Python", "PyTorch", "Transformer", "Deep Learning"],
    githubUrl: "https://github.com/example/minimind",
    demoUrl: "",
    content: "MiniMind 是一个教学用途的深度学习框架...",
    relatedPosts: ["transformer-from-scratch"],
  },
  {
    slug: "smart-campus",
    title: "智慧校园助手",
    description: "基于 RAG 的校园智能问答系统，整合课程、图书馆、校历等信息。",
    coverImage: "/placeholder-project.svg",
    skills: ["React", "Node.js", "LangChain", "Vector DB", "RAG"],
    githubUrl: "https://github.com/example/smart-campus",
    demoUrl: "https://campus.example.com",
    content: "智慧校园助手利用 RAG 技术为师生提供智能问答服务...",
    relatedPosts: ["rag-in-practice"],
  },
];

export const mockPosts: Post[] = [
  {
    slug: "building-devforge",
    title: "从零搭建 AI 驱动的个人网站",
    excerpt: "分享使用 Next.js 15 + Vercel AI SDK 构建 DevForge 的完整过程，包括架构设计、AI 集成和部署优化。",
    date: "2026-02-15",
    tags: ["Next.js", "AI", "全栈开发"],
    content: "## 为什么要做 DevForge\n\n作为一名即将毕业的计算机专业学生，我需要一个能够全面展示技术能力的平台...\n\n## 技术选型\n\n经过调研，我选择了 Next.js 15 作为核心框架...\n\n## AI 集成\n\n通过 Vercel AI SDK 接入 DeepSeek 等国产大模型...",
    relatedProjects: ["devforge"],
  },
  {
    slug: "nextjs-app-router",
    title: "深入理解 Next.js App Router",
    excerpt: "详解 App Router 的核心概念：Server Components、Streaming、ISR，以及从 Pages Router 迁移的最佳实践。",
    date: "2026-02-10",
    tags: ["Next.js", "React", "SSR"],
    content: "## App Router 的革新\n\nNext.js 13 引入的 App Router 彻底改变了 React 应用的构建方式...\n\n## Server Components\n\nRSC 让我们可以在服务端渲染组件...",
    relatedProjects: ["devforge"],
  },
  {
    slug: "transformer-from-scratch",
    title: "从零实现 Transformer：理论与代码",
    excerpt: "用 PyTorch 从零实现 Transformer 架构，深入理解 Self-Attention、Multi-Head Attention 和位置编码。",
    date: "2026-01-28",
    tags: ["Deep Learning", "PyTorch", "Transformer"],
    content: "## Attention Is All You Need\n\n2017 年 Google 发表的这篇论文彻底改变了 NLP 领域...\n\n## Self-Attention 机制\n\n自注意力机制的核心思想是...",
    relatedProjects: ["minimind"],
  },
];

export const mockSkills: Skill[] = [
  { name: "TypeScript", level: 4, category: "语言" },
  { name: "Python", level: 4, category: "语言" },
  { name: "Java", level: 3, category: "语言" },
  { name: "Go", level: 2, category: "语言" },
  { name: "Next.js", level: 4, category: "框架" },
  { name: "React", level: 4, category: "框架" },
  { name: "PyTorch", level: 3, category: "框架" },
  { name: "Node.js", level: 3, category: "框架" },
  { name: "PostgreSQL", level: 3, category: "工具" },
  { name: "Docker", level: 3, category: "工具" },
  { name: "Git", level: 4, category: "工具" },
  { name: "Tailwind CSS", level: 4, category: "工具" },
];

export const mockExperiences: Experience[] = [
  {
    id: "edu-1",
    type: "education",
    title: "计算机科学与技术 本科",
    organization: "某大学 计算机学院",
    startDate: "2022-09",
    endDate: "2026-06",
    description: "主修计算机科学与技术，GPA 3.8/4.0。核心课程：数据结构、算法设计、操作系统、计算机网络、机器学习。",
    skills: ["算法", "数据结构", "机器学习"],
  },
  {
    id: "work-1",
    type: "work",
    title: "前端开发实习生",
    organization: "某科技公司",
    startDate: "2025-06",
    endDate: "2025-09",
    description: "参与公司核心产品的前端开发，使用 React + TypeScript 重构遗留模块，提升页面性能 40%。",
    skills: ["React", "TypeScript", "性能优化"],
  },
  {
    id: "opensource-1",
    type: "opensource",
    title: "开源贡献者",
    organization: "MiniMind Project",
    startDate: "2025-10",
    endDate: "至今",
    description: "参与轻量级深度学习框架的开发，贡献了 Transformer 推理优化模块，获得 200+ Star。",
    skills: ["Python", "PyTorch", "开源协作"],
  },
];