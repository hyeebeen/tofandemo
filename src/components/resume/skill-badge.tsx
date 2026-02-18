import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  name: string;
  level: number;
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-all" data-skill={name}>
      <span data-skill={name}>{name}</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`inline-block h-1.5 w-1.5 rounded-sm ${
              i < level ? "bg-primary shadow-[0_0_4px_var(--primary)]" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </span>
    </Badge>
  );
}
