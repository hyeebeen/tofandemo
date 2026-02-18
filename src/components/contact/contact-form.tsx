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
import { Send, CheckCircle } from "lucide-react";

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
    <Card className="border-primary/20 bg-card/50">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Send className="h-5 w-5" />
          <span className="text-muted-foreground">&gt;</span> 发送留言
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submitted && (
          <div role="alert" className="mb-6 rounded border border-primary/50 bg-primary/10 p-4 text-sm text-primary flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-primary/50">[SUCCESS]</span> 留言已提交，感谢您的联系！
          </div>
        )}
        <form name="contact" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-muted-foreground">
              <span className="text-primary/50">$</span> 姓名
            </Label>
            <Input id="name" placeholder="您的姓名" {...register("name")} className="border-primary/20 bg-background focus:border-primary focus:ring-primary" />
            {errors.name && (
              <p className="text-sm text-destructive"><span className="text-destructive/50">[ERROR]</span> {errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-muted-foreground">
              <span className="text-primary/50">$</span> 邮箱
            </Label>
            <Input id="email" type="email" placeholder="your@email.com" {...register("email")} className="border-primary/20 bg-background focus:border-primary focus:ring-primary" />
            {errors.email && (
              <p className="text-sm text-destructive"><span className="text-destructive/50">[ERROR]</span> {errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message-type" className="text-muted-foreground">
              <span className="text-primary/50">$</span> 留言类型
            </Label>
            <Select
              name="message-type"
              defaultValue="general"
              onValueChange={(value) =>
                setValue("type", value as ContactFormData["type"])
              }
            >
              <SelectTrigger className="border-primary/20 bg-background focus:border-primary focus:ring-primary">
                <SelectValue placeholder="选择留言类型" />
              </SelectTrigger>
              <SelectContent className="border-primary/20 bg-background">
                {messageTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value} className="focus:bg-primary/10 focus:text-primary">
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-muted-foreground">
              <span className="text-primary/50">$</span> 主题
            </Label>
            <Input id="subject" placeholder="留言主题" {...register("subject")} className="border-primary/20 bg-background focus:border-primary focus:ring-primary" />
            {errors.subject && (
              <p className="text-sm text-destructive"><span className="text-destructive/50">[ERROR]</span> {errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-muted-foreground">
              <span className="text-primary/50">$</span> 内容
            </Label>
            <Textarea
              id="message"
              placeholder="请输入您的留言内容..."
              rows={5}
              {...register("message")}
              className="border-primary/20 bg-background focus:border-primary focus:ring-primary"
            />
            {errors.message && (
              <p className="text-sm text-destructive"><span className="text-destructive/50">[ERROR]</span> {errors.message.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:box-glow-sm transition-all" disabled={isSubmitting}>
            {isSubmitting ? (
              <><span className="animate-pulse">处理中...</span></>
            ) : (
              <><Send className="h-4 w-4 mr-2" /> 提交留言</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}