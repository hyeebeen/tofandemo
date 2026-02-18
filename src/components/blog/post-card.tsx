import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <Card className="flex h-full flex-col">
        <CardHeader>
          <div className="mb-2 text-sm text-muted-foreground">{dateStr}</div>
          <CardTitle className="text-lg">
            <Link href={`/blog/${post.slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between gap-3">
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" data-skill={tag}>
                <span data-skill={tag}>{tag}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
