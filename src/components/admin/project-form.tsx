"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(1, "标题必填"),
  slug: z.string().min(1, "Slug 必填"),
  description: z.string().min(1, "描述必填"),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  repoUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  category: z.string().optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface ProjectFormProps {
  slug?: string;
}

export function ProjectForm({ slug }: ProjectFormProps) {
  const router = useRouter();
  const isNew = !slug || slug === "new";
  const [saving, setSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "", slug: "", description: "", content: "",
      coverImage: "", repoUrl: "", demoUrl: "", category: "",
      featured: false, published: false,
    },
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/projects/${slug}`).then((r) => r.json()).then((data) => {
        form.reset({
          title: data.title ?? "",
          slug: data.slug ?? "",
          description: data.description ?? "",
          content: data.content ?? "",
          coverImage: data.coverImage ?? "",
          repoUrl: data.repoUrl ?? "",
          demoUrl: data.demoUrl ?? "",
          category: data.category ?? "",
          featured: data.featured ?? false,
          published: data.published ?? false,
        });
      });
    }
  }, [isNew, slug, form]);

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
  }

  async function onSubmit(values: FormValues) {
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${slug}`;
      const method = isNew ? "POST" : "PATCH";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      router.push("/admin/projects");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>标题</FormLabel>
            <FormControl>
              <Input {...field} onChange={(e) => { field.onChange(e); if (isNew) form.setValue("slug", generateSlug(e.target.value)); }} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="slug" render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>描述</FormLabel>
            <FormControl><Textarea {...field} rows={3} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel>内容 (Markdown)</FormLabel>
            <FormControl><Textarea {...field} rows={10} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="coverImage" render={({ field }) => (
          <FormItem>
            <FormLabel>封面图 URL</FormLabel>
            <FormControl><Input {...field} /></FormControl>
          </FormItem>
        )} />
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="repoUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>仓库 URL</FormLabel>
              <FormControl><Input {...field} /></FormControl>
            </FormItem>
          )} />
          <FormField control={form.control} name="demoUrl" render={({ field }) => (
            <FormItem>
              <FormLabel>演示 URL</FormLabel>
              <FormControl><Input {...field} /></FormControl>
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel>分类</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="选择分类" /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="ai">AI/ML</SelectItem>
                <SelectItem value="tool">工具</SelectItem>
                <SelectItem value="other">其他</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )} />
        <div className="flex gap-6">
          <FormField control={form.control} name="featured" render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4" /></FormControl>
              <FormLabel className="!mt-0">精选</FormLabel>
            </FormItem>
          )} />
          <FormField control={form.control} name="published" render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormControl><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4" /></FormControl>
              <FormLabel className="!mt-0">发布</FormLabel>
            </FormItem>
          )} />
        </div>
        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>{saving ? "保存中..." : "保存"}</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>取消</Button>
        </div>
      </form>
    </Form>
  );
}