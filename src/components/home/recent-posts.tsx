import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PostWithSkills } from "@/lib/queries";

interface RecentPostsProps {
  posts: PostWithSkills[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            最新博客
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">查看全部</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const tags = post.postSkills.map((ps) => ps.skill.name);
            const dateStr = post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("zh-CN")
              : "";
            return (
              <article key={post.slug} data-type="post">
                <Card className="flex h-full flex-col">
                  <CardHeader>
                    <div className="mb-2 text-sm text-muted-foreground">
                      {dateStr}
                    </div>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
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
          })}
        </div>
      </div>
    </section>
  );
}
