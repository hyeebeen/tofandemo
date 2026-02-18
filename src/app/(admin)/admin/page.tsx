"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, MessageSquare, Zap } from "lucide-react";

interface Stats {
  projects: number;
  posts: number;
  messages: number;
  skills: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projects: 0, posts: 0, messages: 0, skills: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/posts").then((r) => r.json()),
      fetch("/api/admin/messages").then((r) => r.json()),
      fetch("/api/admin/skills").then((r) => r.json()),
    ]).then(([projects, posts, messages, skills]) => {
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
      });
    });
  }, []);

  const items = [
    { label: "项目", value: stats.projects, icon: FolderKanban },
    { label: "文章", value: stats.posts, icon: FileText },
    { label: "留言", value: stats.messages, icon: MessageSquare },
    { label: "技能", value: stats.skills, icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">仪表盘</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
