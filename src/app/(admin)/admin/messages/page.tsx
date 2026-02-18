"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, type Column } from "@/components/admin/data-table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

interface Message {
  id: number;
  visitorName: string;
  visitorEmail: string;
  category: string | null;
  subject: string | null;
  content: string;
  isRead: boolean;
  reply: string | null;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => { load(); }, []);

  function load() {
    fetch("/api/admin/messages").then((r) => r.json()).then(setMessages);
  }

  async function openDetail(msg: Message) {
    setSelected(msg);
    setReplyText(msg.reply || "");
    if (!msg.isRead) {
      await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, isRead: true } : m));
    }
  }

  async function handleReply() {
    if (!selected || !replyText.trim()) return;
    await fetch(`/api/admin/messages/${selected.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: replyText }),
    });
    setSelected(null);
    load();
  }

  async function handleDelete(id: number) {
    if (!confirm("确定删除该留言？")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  }

  const columns: Column<Message>[] = [
    { key: "visitorName", header: "发送者" },
    { key: "category", header: "类型", render: (m) => m.category || "-" },
    { key: "subject", header: "主题", render: (m) => m.subject || "-" },
    {
      key: "isRead", header: "状态",
      render: (m) => <Badge variant={m.isRead ? "secondary" : "default"}>{m.isRead ? "已读" : "未读"}</Badge>,
    },
    {
      key: "createdAt", header: "时间",
      render: (m) => new Date(m.createdAt).toLocaleDateString("zh-CN"),
    },
    {
      key: "actions", header: "操作",
      render: (m) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => openDetail(m)}>查看</Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">留言管理</h1>
      <DataTable columns={columns} data={messages} />
      <Dialog open={!!selected} onOpenChange={(v) => { if (!v) setSelected(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>留言详情</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              <div className="text-sm"><span className="font-medium">发送者：</span>{selected.visitorName} ({selected.visitorEmail})</div>
              <div className="text-sm"><span className="font-medium">类型：</span>{selected.category || "一般"}</div>
              <div className="text-sm"><span className="font-medium">主题：</span>{selected.subject || "无"}</div>
              <div className="rounded border p-3 text-sm whitespace-pre-wrap">{selected.content}</div>
              {selected.reply && (
                <div className="rounded border border-primary/20 bg-primary/5 p-3 text-sm">
                  <span className="font-medium">已回复：</span>
                  <p className="mt-1 whitespace-pre-wrap">{selected.reply}</p>
                </div>
              )}
              <div className="space-y-2">
                <Textarea placeholder="输入回复内容..." value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={4} />
                <Button onClick={handleReply} className="w-full">发送回复</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}