import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import type { PostWithSkills } from "@/lib/queries";

interface PostCardProps {
  post: PostWithSkills;
}

export function PostCard({ post }: PostCardProps) {
  const tags = post.postSkills.map((ps) => ps.skill.name);
  const dateStr = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("zh-CN")
    : "";

  return (
    <article data-type="post">
      <Card className="flex h-full flex-col border-primary/20 bg-card/50 hover:border-accent/50 transition-all cursor-pointer group">
        <CardHeader>
          <div className="mb-2 text-sm text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3 text-accent" />
            <span className="font-mono">{dateStr}</span>
          </div>
          <CardTitle className="text-lg text-card-foreground group-hover:text-accent transition-colors">
            <Link href={`/blog/${post.slug}`} className="hover:text-glow-sm flex items-center gap-2">
              <span className="text-accent/50">&gt;</span>
              {post.title}
              <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            <span className="text-accent/30">/* </span>
            {post.excerpt}
            <span className="text-accent/30"> */</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" data-skill={tag} className="border-accent/30 text-accent/80 hover:bg-accent/10">
                <span data-skill={tag}>#{tag}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
