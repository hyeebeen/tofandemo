"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/components/project/project-card";
import type { ProjectWithSkills } from "@/lib/queries";

interface ProjectsClientProps {
  projects: ProjectWithSkills[];
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const allSkills = Array.from(
    new Set(
      projects.flatMap((p) => p.projectSkills.map((ps) => ps.skill.name))
    )
  );

  const filtered = activeSkill
    ? projects.filter((p) =>
        p.projectSkills.some((ps) => ps.skill.name === activeSkill)
      )
    : projects;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        项目
      </h1>
      <p className="mb-8 text-muted-foreground">
        我的技术项目作品集，涵盖全栈开发、AI 应用等方向。
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        <Badge
          variant={activeSkill === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveSkill(null)}
        >
          全部
        </Badge>
        {allSkills.map((skill) => (
          <Badge
            key={skill}
            variant={activeSkill === skill ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveSkill(skill)}
            data-skill={skill}
          >
            <span data-skill={skill}>{skill}</span>
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
