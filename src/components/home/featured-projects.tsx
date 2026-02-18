import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FolderGit2, ArrowRight } from "lucide-react";
import type { ProjectWithSkills } from "@/lib/queries";

interface FeaturedProjectsProps {
  projects: ProjectWithSkills[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-primary flex items-center gap-2">
            <FolderGit2 className="h-6 w-6" />
            <span className="text-muted-foreground">&gt;</span> 精选项目
          </h2>
          <Button variant="ghost" asChild className="text-accent hover:text-accent hover:text-glow-sm">
            <Link href="/projects" className="flex items-center gap-1">
              查看全部 <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const skillNames = project.projectSkills.map((ps) => ps.skill.name);
            return (
              <article key={project.slug} data-type="project">
                <Card className="flex h-full flex-col border-primary/20 bg-card/50 hover:border-primary/50 hover:box-glow-sm transition-all cursor-pointer group">
                  <div className="aspect-video w-full bg-muted/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <div className="absolute top-2 left-2 text-xs text-primary/50 font-mono">
                      [{String(index + 1).padStart(2, '0')}]
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-glow-sm"
                      >
                        {project.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary/30">// </span>
                      {project.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-1.5">
                    {skillNames.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" data-skill={skill} className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
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
