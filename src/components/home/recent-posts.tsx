import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Calendar } from "lucide-react";
import type { PostWithSkills } from "@/lib/queries";

interface RecentPostsProps {
  posts: PostWithSkills[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="py-16 bg-muted/10 border-y border-primary/10">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl text-primary flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <span className="text-muted-foreground">&gt;</span> 最新博客
          </h2>
          <Button variant="ghost" asChild className="text-accent hover:text-accent hover:text-glow-sm">
            <Link href="/blog" className="flex items-center gap-1">
              查看全部 <ArrowRight className="h-4 w-4" />
            </Link>
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
                <Card className="flex h-full flex-col border-primary/20 bg-card/50 hover:border-accent/50 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="mb-2 text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-accent" />
                      <span className="font-mono">{dateStr}</span>
                    </div>
                    <CardTitle className="text-lg text-card-foreground group-hover:text-accent transition-colors">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-glow-sm"
                      >
                        {post.title}
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
          })}
        </div>
      </div>
    </section>
  );
}
