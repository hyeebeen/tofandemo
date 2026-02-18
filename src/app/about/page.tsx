import { SkillBadge } from "@/components/resume/skill-badge";
import { ExperienceTimeline } from "@/components/resume/experience-timeline";
import { getAllSkills, getAllExperiences, type SkillRow } from "@/lib/queries";

export const metadata = {
  title: "关于",
  description: "了解 Yeebin Huang 的技术背景、技能图谱和个人经历。",
};

export default async function AboutPage() {
  const [dbSkills, experiences] = await Promise.all([
    getAllSkills(),
    getAllExperiences(),
  ]);

  const skillsByCategory = dbSkills.reduce(
    (acc, skill) => {
      const cat = skill.category ?? "其他";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, SkillRow[]>,
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        关于我
      </h1>

      <section className="mb-12">
        <p className="text-lg text-muted-foreground leading-relaxed">
          我是 Yeebin Huang，一名大四计算机科学与技术专业的学生。
          热衷于全栈 Web 开发和 AI 应用，擅长使用 React/Next.js 生态构建现代化 Web 应用，
          同时对深度学习、大语言模型有深入的研究和实践经验。
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          我相信技术的价值在于解决真实问题。无论是构建高性能的前端应用，
          还是训练一个轻量级的语言模型，我都追求代码的简洁与工程的优雅。
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">技能图谱</h2>
        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <SkillBadge
                    key={skill.slug}
                    name={skill.name}
                    level={Math.round((skill.proficiency ?? 0) / 20)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold tracking-tight">经历</h2>
        <ExperienceTimeline experiences={experiences} />
      </section>
    </div>
  );
}
