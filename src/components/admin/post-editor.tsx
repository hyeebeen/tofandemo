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
  excerpt: z.string().optional(),
  content: z.string().min(1, "内容必填"),
  coverImage: z.string().optional(),
  type: z.string().optional(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

interface PostEditorProps {
  slug?: string;
}

export function PostEditor({ slug }: PostEditorProps) {
  const router = useRouter();
  const isNew = !slug || slug === "new";
  const [saving, setSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "", slug: "", excerpt: "", content: "",
      coverImage: "", type: "original", published: false,
    },
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/posts/${slug}`).then((r) => r.json()).then((data) => {
        form.reset({
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          coverImage: data.coverImage ?? "",
          type: data.type ?? "original",
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
      const url = isNew ? "/api/admin/posts" : `/api/admin/posts/${slug}`;
      const method = isNew ? "POST" : "PATCH";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      router.push("/admin/posts");
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
        <FormField control={form.control} name="excerpt" render={({ field }) => (
          <FormItem>
            <FormLabel>摘要</FormLabel>
            <FormControl><Textarea {...field} rows={3} /></FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel>内容 (Markdown)</FormLabel>
            <FormControl><Textarea {...field} rows={16} className="font-mono text-sm" /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="coverImage" render={({ field }) => (
          <FormItem>
            <FormLabel>封面图 URL</FormLabel>
            <FormControl><Input {...field} /></FormControl>
          </FormItem>
        )} />
        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem>
            <FormLabel>类型</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
              <SelectContent>
                <SelectItem value="original">原创</SelectItem>
                <SelectItem value="repost">转载</SelectItem>
                <SelectItem value="translation">翻译</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )} />
        <FormField control={form.control} name="published" render={({ field }) => (
          <FormItem className="flex items-center gap-2">
            <FormControl><input type="checkbox" checked={field.value} onChange={field.onChange} className="h-4 w-4" /></FormControl>
            <FormLabel className="!mt-0">发布</FormLabel>
          </FormItem>
        )} />
        <div className="flex gap-2">
          <Button type="submit" disabled={saving}>{saving ? "保存中..." : "保存"}</Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin/posts")}>取消</Button>
        </div>
      </form>
    </Form>
  );
}