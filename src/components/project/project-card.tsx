import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import type { ProjectWithSkills } from "@/lib/queries";

interface ProjectCardProps {
  project: ProjectWithSkills;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const skillNames = project.projectSkills.map((ps) => ps.skill.name);

  return (
    <article data-type="project">
      <Card className="flex h-full flex-col border-primary/20 bg-card/50 hover:border-primary/50 hover:box-glow-sm transition-all cursor-pointer group">
        <div className="aspect-video w-full bg-muted/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-2 left-2 text-xs text-primary/50 font-mono">
            [{String(index + 1).padStart(2, '0')}]
          </div>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="h-4 w-4 text-primary" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground group-hover:text-primary transition-colors">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-glow-sm flex items-center gap-2"
            >
              <span className="text-primary/50">&gt;</span>
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
          {skillNames.map((skill) => (
            <Badge key={skill} variant="secondary" data-skill={skill} className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
              <span data-skill={skill}>{skill}</span>
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </article>
  );
}
