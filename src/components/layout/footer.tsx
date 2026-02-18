import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Terminal, Github, Linkedin } from "lucide-react";

const footerLinks = [
  { href: "/", label: "~/home" },
  { href: "/projects", label: "~/projects" },
  { href: "/blog", label: "~/blog" },
  { href: "/about", label: "~/about" },
  { href: "/contact", label: "~/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-background/50">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2 text-lg font-bold text-primary">
              <Terminal className="h-4 w-4" />
              <span>DevForge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-primary/50">// </span>
              用代码锻造未来，以AI驱动表达
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-all hover:text-primary hover:text-glow-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Separator className="my-6 bg-primary/20" />
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>
            <span className="text-primary/50">&gt;</span> &copy; {new Date().getFullYear()} Yeebin Huang. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="flex items-center gap-1 hover:text-primary transition-all cursor-pointer">
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <Link href="#" className="flex items-center gap-1 hover:text-accent transition-all cursor-pointer">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
