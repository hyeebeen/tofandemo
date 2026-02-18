import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ProjectDetail } from "@/lib/queries";

interface ProjectDetailProps {
  project: NonNullable<ProjectDetail>;
}

export function ProjectDetailView({ project }: ProjectDetailProps) {
  const skillNames = project.projectSkills.map((ps) => ps.skill.name);
  const relatedPosts = project.projectPosts?.map((pp) => pp.post) ?? [];

  return (
    <article data-type="project-detail">
      <div className="aspect-video w-full bg-muted" />

      <div className="mt-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {skillNames.map((skill) => (
            <Badge key={skill} variant="secondary" data-skill={skill}>
              <span data-skill={skill}>{skill}</span>
            </Badge>
          ))}
        </div>

        <div className="flex gap-3">
          {project.repoUrl && (
            <Button variant="outline" asChild>
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
          {project.demoUrl && (
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                在线演示
              </a>
            </Button>
          )}
        </div>

        <Separator />

        <div className="prose dark:prose-invert max-w-none">
          <p>{project.content}</p>
        </div>

        {relatedPosts.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="mb-4 text-xl font-semibold">关联博客</h2>
              <ul className="space-y-2">
                {relatedPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-muted-foreground hover:text-foreground hover:underline"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
