"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Zap,
  Briefcase,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "仪表盘", icon: LayoutDashboard },
  { href: "/admin/projects", label: "项目管理", icon: FolderKanban },
  { href: "/admin/posts", label: "文章管理", icon: FileText },
  { href: "/admin/skills", label: "技能管理", icon: Zap },
  { href: "/admin/experiences", label: "经历管理", icon: Briefcase },
  { href: "/admin/messages", label: "留言管理", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-card">
      <div className="flex h-14 items-center px-4 font-semibold">
        DevForge Admin
      </div>
      <Separator />
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")}>
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Separator />
      <div className="p-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" />
          退出登录
        </Button>
      </div>
    </aside>
  );
}
