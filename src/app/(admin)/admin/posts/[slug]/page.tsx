"use client";

import { use } from "react";
import { PostEditor } from "@/components/admin/post-editor";

export default function PostEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{slug === "new" ? "新建文章" : "编辑文章"}</h1>
      <PostEditor slug={slug === "new" ? undefined : slug} />
    </div>
  );
}
