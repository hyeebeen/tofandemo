"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/admin/data-table";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Post {
  id: number;
  slug: string;
  title: string;
  type: string | null;
  published: boolean;
}

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/admin/posts").then((r) => r.json()).then(setPosts);
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm("确定删除该文章？")) return;
    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  }

  const columns: Column<Post>[] = [
    { key: "title", header: "标题" },
    { key: "type", header: "类型", render: (p) => p.type || "-" },
    {
      key: "published", header: "状态",
      render: (p) => <Badge variant={p.published ? "default" : "secondary"}>{p.published ? "已发布" : "草稿"}</Badge>,
    },
    {
      key: "actions", header: "操作",
      render: (p) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => router.push(`/admin/posts/${p.slug}`)}><Pencil className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(p.slug)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">文章管理</h1>
        <Button onClick={() => router.push("/admin/posts/new")}><Plus className="mr-2 h-4 w-4" />新建文章</Button>
      </div>
      <DataTable columns={columns} data={posts} />
    </div>
  );
}
