import { Hero } from "@/components/home/hero";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { RecentPosts } from "@/components/home/recent-posts";
import { SkillBadge } from "@/components/resume/skill-badge";
import { ExperienceTimeline } from "@/components/resume/experience-timeline";
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
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            技能概览
          </h2>
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
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            经历
          </h2>
          <ExperienceTimeline experiences={experiences} />
        </div>
      </section>
    </div>
  );
}
