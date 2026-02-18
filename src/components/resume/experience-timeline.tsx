import { Badge } from "@/components/ui/badge";
import type { ExperienceWithSkills } from "@/lib/queries";

interface ExperienceTimelineProps {
  experiences: ExperienceWithSkills[];
}

const typeLabels: Record<string, string> = {
  education: "教育",
  work: "工作",
  opensource: "开源",
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section aria-label="experience-timeline">
      <div className="relative border-l-2 border-border pl-6">
        {experiences.map((exp) => {
          const skillNames = exp.experienceSkills.map((es) => es.skill.name);
          const endLabel = exp.endDate ?? "至今";
          return (
            <div key={exp.id} className="relative mb-8 last:mb-0">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{exp.title}</h3>
                  <Badge variant="outline">{typeLabels[exp.type] ?? exp.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {exp.org} &middot; {exp.startDate} - {endLabel}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {exp.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {skillNames.map((skill) => (
                    <Badge key={skill} variant="secondary" data-skill={skill}>
                      <span data-skill={skill}>{skill}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
