import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { RecentPosts } from "@/components/home/recent-posts";
import { SkillBadge } from "@/components/resume/skill-badge";
import { ExperienceTimeline } from "@/components/resume/experience-timeline";
import { Cpu, Briefcase } from "lucide-react";
import {
  getFeaturedProjects,
  getRecentPosts,
  getAllSkills,
  getAllExperiences,
  type SkillRow,
} from "@/lib/queries";

export default async function HomePage() {
  const [featuredProjects, recentPosts, dbSkills, experiences] =
    await Promise.all([
      getFeaturedProjects(),
      getRecentPosts(3),
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
    <div data-page="home">
      <Hero />
      <FeaturedProjects projects={featuredProjects} />
      <RecentPosts posts={recentPosts} />

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl text-primary flex items-center gap-2">
            <Cpu className="h-6 w-6" />
            <span className="text-muted-foreground">&gt;</span> 技能概览
          </h2>
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category} className="border border-primary/10 rounded p-4 bg-card/20">
                <h3 className="mb-3 text-sm font-medium text-accent flex items-center gap-2">
                  <span className="text-primary/50">#</span>
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
        </div>
      </section>

      <section className="bg-muted/10 border-y border-primary/10 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl text-primary flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-muted-foreground">&gt;</span> 经历
          </h2>
          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>
    </div>
  );
}
