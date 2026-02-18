"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
import { FileText, Terminal, Filter } from "lucide-react";
import type { PostWithSkills } from "@/lib/queries";

interface BlogClientProps {
  posts: PostWithSkills[];
}

export function BlogClient({ posts }: BlogClientProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.postSkills.map((ps) => ps.skill.name)))
  );

  const filtered = activeTag
    ? posts.filter((p) =>
        p.postSkills.some((ps) => ps.skill.name === activeTag)
      )
    : posts;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary/70">guest@devforge</span>
          <span>~</span>
          <span className="text-accent">$</span>
          <span>ls ~/blog</span>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-primary flex items-center gap-2">
          <FileText className="h-8 w-8" />
          <span className="text-muted-foreground">&gt;</span> 博客
        </h1>
        <p className="mb-8 text-muted-foreground">
          <span className="text-accent/50">// </span>
          技术文章与学习笔记，记录开发过程中的思考与实践。
        </p>

        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-primary/50 mr-1" />
          <Badge
            variant={activeTag === null ? "default" : "outline"}
            className={`cursor-pointer ${activeTag === null ? 'bg-primary text-primary-foreground' : 'border-accent/30 text-accent/80 hover:bg-accent/10'}`}
            onClick={() => setActiveTag(null)}
          >
            全部
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={activeTag === tag ? "default" : "outline"}
              className={`cursor-pointer ${activeTag === tag ? 'bg-accent text-accent-foreground' : 'border-accent/30 text-accent/80 hover:bg-accent/10'}`}
              onClick={() => setActiveTag(tag)}
              data-skill={tag}
            >
              <span data-skill={tag}>#{tag}</span>
            </Badge>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <span className="text-primary/50">&gt;</span> 暂无相关文章
          </div>
        )}
      </div>
    </div>
  );
}
