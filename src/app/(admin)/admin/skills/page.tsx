"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable, type Column } from "@/components/admin/data-table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Skill {
  id: number;
  slug: string;
  name: string;
  category: string | null;
  proficiency: number;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", category: "", proficiency: 0 });

  useEffect(() => {
    loadSkills();
  }, []);

  function loadSkills() {
    fetch("/api/admin/skills").then((r) => r.json()).then(setSkills);
  }

  function openNew() {
    setEditing(null);
    setForm({ name: "", slug: "", category: "", proficiency: 0 });
    setOpen(true);
  }

  function openEdit(skill: Skill) {
    setEditing(skill);
    setForm({ name: skill.name, slug: skill.slug, category: skill.category || "", proficiency: skill.proficiency });
    setOpen(true);
  }

  async function handleSave() {
    if (editing) {
      await fetch(`/api/admin/skills/${editing.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setOpen(false);
    loadSkills();
  }

  async function handleDelete(slug: string) {
    if (!confirm("确定删除该技能？")) return;
    await fetch(`/api/admin/skills/${slug}`, { method: "DELETE" });
    loadSkills();
  }

  const columns: Column<Skill>[] = [
    { key: "name", header: "名称" },
    { key: "category", header: "分类", render: (s) => s.category || "-" },
    { key: "proficiency", header: "熟练度", render: (s) => `${s.proficiency}%` },
    {
      key: "actions", header: "操作",
      render: (s) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => openEdit(s)}><Pencil className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(s.slug)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">技能管理</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />新建技能</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "编辑技能" : "新建技能"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div><Label>名称</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })} /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
              <div><Label>分类</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><Label>熟练度 (%)</Label><Input type="number" min={0} max={100} value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })} /></div>
              <Button onClick={handleSave} className="w-full">保存</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={skills} />
    </div>
  );
}