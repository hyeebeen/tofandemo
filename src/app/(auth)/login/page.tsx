"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signIn.email({ email, password });
      if (res.error) {
        setError(res.error.message ?? "登录失败");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("登录失败，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <Card className="w-full max-w-sm border-primary/30 bg-card/50 relative">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 justify-center">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-primary/70">root@devforge</span>
            <span>~</span>
            <span className="text-accent">$</span>
            <span>sudo login</span>
          </div>
          <CardTitle className="text-center text-xl text-primary flex items-center justify-center gap-2">
            <Lock className="h-5 w-5" />
            DevForge 管理登录
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form name="admin-login" onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-destructive/50">[ERROR]</span> {error}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                <span className="text-primary/50">$</span> 邮箱
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-primary/20 bg-background focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">
                <span className="text-primary/50">$</span> 密码
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-primary/20 bg-background focus:border-primary focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:box-glow-sm transition-all" disabled={loading}>
              {loading ? (
                <span className="animate-pulse">认证中...</span>
              ) : (
                <><Lock className="h-4 w-4 mr-2" /> 登录</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
