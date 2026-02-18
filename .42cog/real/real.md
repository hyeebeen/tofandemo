# 现实约束

<real>
- 管理后台路由（/admin/*）必须通过 Better Auth 的 session 验证保护，未认证请求一律重定向到登录页，禁止仅依赖客户端路由守卫
- 所有 AI 相关 API 密钥（OpenAI 等）只能存放在服务端环境变量中，禁止以 NEXT_PUBLIC_ 前缀暴露给客户端，API 调用必须经由 Next.js Route Handler 代理
- AI 功能（博客摘要、项目推荐）必须实现响应缓存（建议 KV 或数据库缓存），单用户每日 API 调用设上限（如50次），防止免费额度被刷爆导致服务中断
- 博客内容页和项目展示页必须使用 SSG 或 ISR 生成静态页面，确保搜索引擎可抓取完整 HTML 内容，禁止纯客户端渲染这些公开页面
- Vercel 免费版 Serverless Function 执行时长上限为 10 秒，所有 API 路由（含 AI 调用）必须在此限制内完成响应，超时场景需改用 Streaming 或 Edge Runtime
- Neon/Supabase 免费版数据库连接数有限（通常约 20 个），必须使用连接池（如 Neon 的 @neondatabase/serverless 或 Supabase 的 pgBouncer），禁止每次请求新建连接
- 网站展示的个人联系方式（邮箱、手机号）不得以明文硬编码在前端源码中，需通过混淆、图片或服务端接口提供，防止爬虫批量采集
</real>
