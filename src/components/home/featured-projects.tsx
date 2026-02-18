import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectWithSkills } from "@/lib/queries";

interface FeaturedProjectsProps {
  projects: ProjectWithSkills[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            精选项目
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/projects">查看全部</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const skillNames = project.projectSkills.map((ps) => ps.skill.name);
            return (
              <article key={project.slug} data-type="project">
                <Card className="flex h-full flex-col">
                  <div className="aspect-video w-full bg-muted" />
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:underline"
                      >
                        {project.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-1.5">
                    {skillNames.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" data-skill={skill}>
                        <span data-skill={skill}>{skill}</span>
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
