"use client";

import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(1, "请输入姓名"),
  email: z.email("请输入有效的邮箱地址"),
  type: z.enum(["job", "tech", "collab", "general"]),
  subject: z.string().min(1, "请输入主题"),
  message: z.string().min(10, "留言内容至少 10 个字符"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const messageTypes = [
  { value: "job", label: "求职咨询" },
  { value: "tech", label: "技术交流" },
  { value: "collab", label: "合作邀请" },
  { value: "general", label: "一般留言" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    defaultValues: {
      type: "general",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // TODO: 提交到 /api/contact
    console.log("Contact form submitted:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>发送留言</CardTitle>
      </CardHeader>
      <CardContent>
        {submitted && (
          <div role="alert" className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            留言已提交，感谢您的联系！
          </div>
        )}
        <form name="contact" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input id="name" placeholder="您的姓名" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input id="email" type="email" placeholder="your@email.com" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-type">留言类型</Label>
            <Select
              name="message-type"
              defaultValue="general"
              onValueChange={(value) =>
                setValue("type", value as ContactFormData["type"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="选择留言类型" />
              </SelectTrigger>
              <SelectContent>
                {messageTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">主题</Label>
            <Input id="subject" placeholder="留言主题" {...register("subject")} />
            {errors.subject && (
              <p className="text-sm text-destructive">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">内容</Label>
            <Textarea
              id="message"
              placeholder="请输入您的留言内容..."
              rows={5}
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "提交中..." : "提交留言"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}