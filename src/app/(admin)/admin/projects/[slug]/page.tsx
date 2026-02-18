"use client";

import { use } from "react";
import { ProjectForm } from "@/components/admin/project-form";

export default function ProjectEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{slug === "new" ? "新建项目" : "编辑项目"}</h1>
      <ProjectForm slug={slug === "new" ? undefined : slug} />
    </div>
  );
}
