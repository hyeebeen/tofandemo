# DevForge 认知模型

<cog>
本系统包括以下关键实体：
- visitor：访客，浏览网站的人
  - anonymous：匿名访客，未留下任何信息
  - identified：已识别访客，通过留言等行为留下联系方式
- admin：管理员，网站所有者（大四计算机学生本人），管理所有内容
- project：项目，展示的技术项目作品
- post：博客文章，技术博客内容
  - original：原创文章
  - translation：翻译/转载文章
- skill：技能，技术技能标签
- experience：经历，教育和工作经历
  - education：教育经历
  - work：工作/实习经历
  - opensource：开源贡献经历
- message：留言，访客发送的留言或联系信息
</cog>

<visitor>
- 唯一编码：由浏览器指纹或 cookie 生成的匿名 session ID，格式如 vis_20260218_xxxx
- 常见分类：匿名访客（仅浏览）；已识别访客（留过言或发过消息）
</visitor>

<admin>
- 唯一编码：系统内唯一管理员，通过 Better Auth 认证的用户 ID（UUID）
- 常见分类：超级管理员（网站所有者，拥有全部权限，当前系统仅此一人）
</admin>

<project>
- 唯一编码：项目 slug，由项目名称生成的 URL 友好字符串，如 minimind、devforge
- 常见分类：全栈项目；前端项目；后端项目；AI/ML 项目；工具/脚本；课程设计
</project>

<post>
- 唯一编码：文章 slug，格式如 nextjs-15-server-actions，全局唯一
- 常见分类：原创文章；翻译文章；技术教程；项目复盘；学习笔记；面试总结
</post>

<skill>
- 唯一编码：技能 slug，使用技术名称的小写标准化形式，如 typescript、react、postgresql
- 常见分类：编程语言（TypeScript、Python、Java）；前端框架（React、Next.js、Vue）；后端技术（Node.js、PostgreSQL、Redis）；AI/ML（PyTorch、Transformers）；工具链（Git、Docker、CI/CD）；软技能（系统设计、技术写作）
</skill>

<experience>
- 唯一编码：经历编码，格式为 类型前缀_起始年月，如 edu_202209、work_202506
- 常见分类：教育经历（本科、硕士）；工作经历（全职、实习）；开源贡献（维护者、贡献者）
</experience>

<message>
- 唯一编码：系统自动生成的 UUID，格式如 msg_uuid
- 常见分类：求职咨询（HR/招聘方发来的）；技术交流（同行的技术讨论）；合作邀请（项目合作意向）；一般留言（其他反馈）
</message>

<rel>
- admin-project：一对多（管理员创建和管理多个项目）
- admin-post：一对多（管理员撰写多篇博客文章）
- admin-experience：一对多（管理员录入多段经历）
- project-skill：多对多（一个项目使用多种技能，一种技能可出现在多个项目中）
- post-skill：多对多（一篇文章涉及多种技能标签，一种技能可关联多篇文章）
- project-post：多对多（一个项目可关联多篇相关博文，一篇博文可涉及多个项目）
- visitor-message：一对多（一个访客可发送多条留言）
- admin-message：一对多（管理员接收并回复多条留言）
- experience-skill：多对多（一段经历涉及多种技能，一种技能可在多段经历中体现）
</rel>
