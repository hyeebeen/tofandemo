"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PostCard } from "@/components/blog/post-card";
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
    <div className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        博客
      </h1>
      <p className="mb-8 text-muted-foreground">
        技术文章与学习笔记，记录开发过程中的思考与实践。
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        <Badge
          variant={activeTag === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveTag(null)}
        >
          全部
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveTag(tag)}
            data-skill={tag}
          >
            <span data-skill={tag}>{tag}</span>
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
