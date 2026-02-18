import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, ExternalLink, FileText, Terminal } from "lucide-react";
import type { ProjectDetail } from "@/lib/queries";

interface ProjectDetailProps {
  project: NonNullable<ProjectDetail>;
}

export function ProjectDetailView({ project }: ProjectDetailProps) {
  const skillNames = project.projectSkills.map((ps) => ps.skill.name);
  const relatedPosts = project.projectPosts?.map((pp) => pp.post) ?? [];

  return (
    <article data-type="project-detail" className="relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary/70">guest@devforge</span>
          <span>~</span>
          <span className="text-accent">$</span>
          <span>cat ~/projects/{project.slug}.md</span>
        </div>

        <div className="aspect-video w-full bg-muted/50 rounded border border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-2 left-2 text-xs text-primary/50 font-mono">
            [PROJECT_PREVIEW]
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-primary text-glow-sm">
              {project.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              <span className="text-primary/30">// </span>
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {skillNames.map((skill) => (
              <Badge key={skill} variant="secondary" data-skill={skill} className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
                <span data-skill={skill}>{skill}</span>
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            {project.repoUrl && (
              <Button variant="outline" asChild className="border-primary/30 text-primary hover:bg-primary/10 hover:text-glow-sm">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/80 hover:box-glow-sm">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  在线演示
                </a>
              </Button>
            )}
          </div>

          <Separator className="bg-primary/20" />

          <div className="prose dark:prose-invert max-w-none border border-primary/10 rounded p-6 bg-card/30">
            <p className="text-card-foreground">{project.content}</p>
          </div>

          {relatedPosts.length > 0 && (
            <>
              <Separator className="bg-primary/20" />
              <div>
                <h2 className="mb-4 text-xl font-semibold text-accent flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-muted-foreground">&gt;</span> 关联博客
                </h2>
                <ul className="space-y-2">
                  {relatedPosts.map((post) => (
                    <li key={post.slug} className="border border-primary/10 rounded p-3 bg-card/20 hover:border-accent/30 transition-all">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2"
                      >
                        <span className="text-accent/50">&gt;</span>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
