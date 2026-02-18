import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProjectWithSkills } from "@/lib/queries";

interface ProjectCardProps {
  project: ProjectWithSkills;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const skillNames = project.projectSkills.map((ps) => ps.skill.name);

  return (
    <article data-type="project">
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
          {skillNames.map((skill) => (
            <Badge key={skill} variant="secondary" data-skill={skill}>
              <span data-skill={skill}>{skill}</span>
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </article>
  );
}
