import { Badge } from "@/components/ui/badge";

interface SkillBadgeProps {
  name: string;
  level: number;
}

export function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="gap-1.5 px-3 py-1" data-skill={name}>
      <span data-skill={name}>{name}</span>
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`inline-block h-1.5 w-1.5 rounded-full ${
              i < level ? "bg-foreground" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </span>
    </Badge>
  );
}
