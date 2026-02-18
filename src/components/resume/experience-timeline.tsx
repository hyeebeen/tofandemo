import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";
import type { ExperienceWithSkills } from "@/lib/queries";

interface ExperienceTimelineProps {
  experiences: ExperienceWithSkills[];
}

const typeLabels: Record<string, string> = {
  education: "教育",
  work: "工作",
  opensource: "开源",
};

const typeIcons: Record<string, React.ReactNode> = {
  education: <GraduationCap className="h-3 w-3" />,
  work: <Briefcase className="h-3 w-3" />,
  opensource: <Code2 className="h-3 w-3" />,
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <section aria-label="experience-timeline">
      <div className="relative border-l-2 border-primary/30 pl-6">
        {experiences.map((exp) => {
          const skillNames = exp.experienceSkills.map((es) => es.skill.name);
          const endLabel = exp.endDate ?? "至今";
          return (
            <div key={exp.id} className="relative mb-8 last:mb-0 group">
              <div className="absolute -left-[31px] top-1 h-4 w-4 rounded border border-primary bg-background flex items-center justify-center group-hover:box-glow-sm transition-all">
                <div className="h-2 w-2 bg-primary rounded-sm" />
              </div>
              <div className="flex flex-col gap-1 border border-primary/10 rounded p-4 bg-card/20 hover:border-primary/30 transition-all">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-card-foreground">{exp.title}</h3>
                  <Badge variant="outline" className="border-accent/30 text-accent/80 flex items-center gap-1">
                    {typeIcons[exp.type]}
                    {typeLabels[exp.type] ?? exp.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  <span className="text-primary/50">&gt;</span> {exp.org} <span className="text-accent/50">|</span> {exp.startDate} - {endLabel}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="text-primary/30">// </span>
                  {exp.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {skillNames.map((skill) => (
                    <Badge key={skill} variant="secondary" data-skill={skill} className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20">
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
