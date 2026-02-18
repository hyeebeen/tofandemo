"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable, type Column } from "@/components/admin/data-table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Experience {
  id: number;
  code: string;
  type: string;
  title: string;
  org: string;
  startDate: string;
  endDate: string | null;
}

const defaultForm = { code: "", type: "work", title: "", org: "", startDate: "", endDate: "" };

export default function ExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => { load(); }, []);

  function load() {
    fetch("/api/admin/experiences").then((r) => r.json()).then(setItems);
  }

  function openNew() {
    setEditing(null);
    setForm(defaultForm);
    setOpen(true);
  }

  function openEdit(exp: Experience) {
    setEditing(exp);
    setForm({
      code: exp.code, type: exp.type, title: exp.title, org: exp.org,
      startDate: exp.startDate, endDate: exp.endDate || "",
    });
    setOpen(true);
  }

  async function handleSave() {
    const payload = { ...form, endDate: form.endDate || null };
    if (editing) {
      await fetch(`/api/admin/experiences/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/experiences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setOpen(false);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("确定删除该经历？")) return;
    await fetch(`/api/admin/experiences/${id}`, { method: "DELETE" });
    load();
  }

  const columns: Column<Experience>[] = [
    { key: "title", header: "标题" },
    { key: "org", header: "机构" },
    { key: "type", header: "类型" },
    { key: "period", header: "时间段", render: (e) => `${e.startDate} ~ ${e.endDate || "至今"}` },
    {
      key: "actions", header: "操作",
      render: (e) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => openEdit(e)}><Pencil className="h-4 w-4" /></Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(e.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">经历管理</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />新建经历</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "编辑经历" : "新建经历"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div><Label>标题</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><Label>编码</Label><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></div>
              <div><Label>机构</Label><Input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} /></div>
              <div>
                <Label>类型</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">工作</SelectItem>
                    <SelectItem value="education">教育</SelectItem>
                    <SelectItem value="opensource">开源</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>开始日期</Label><Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
                <div><Label>结束日期</Label><Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
              </div>
              <Button onClick={handleSave} className="w-full">保存</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={items} />
    </div>
  );
}