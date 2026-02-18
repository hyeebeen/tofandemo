import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/blog", label: "博客" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-lg font-bold">DevForge</span>
            <p className="text-sm text-muted-foreground">
              用代码锻造未来，以AI驱动表达
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} Yeebin Huang. All rights reserved.</p>
          <div className="flex gap-4">
            <span>GitHub</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
