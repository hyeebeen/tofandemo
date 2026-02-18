import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Terminal, Code2, Cpu } from "lucide-react";

export function Hero() {
  return (
    <section className="py-20 md:py-28 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl px-4 relative">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <div className="relative">
            <Avatar className="h-28 w-28 md:h-36 md:w-36 border-2 border-primary box-glow-sm">
              <AvatarImage src="/avatar.jpg" alt="Yeebin Huang" />
              <AvatarFallback className="text-2xl bg-background text-primary">YH</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-background border border-primary rounded px-2 py-1 text-xs text-primary">
              <span className="text-accent">●</span> online
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-primary/70">guest@devforge</span>
              <span>~</span>
              <span className="text-accent">$</span>
              <span>whoami</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-primary text-glow-sm">
              Yeebin Huang
            </h1>
            <p className="text-xl text-accent md:text-2xl flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              用代码锻造未来，以AI驱动表达
            </p>
            <div className="flex items-start gap-2 text-muted-foreground max-w-lg">
              <Cpu className="h-4 w-4 mt-1 text-primary/50 shrink-0" />
              <p className="text-left">
                <span className="text-primary/70">// </span>
                大四计算机专业学生，热衷于全栈开发与 AI 应用。擅长 React/Next.js 生态，
                对深度学习和大语言模型有深入研究。
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start pt-2">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/80 hover:box-glow-sm transition-all">
                <Link href="/projects">
                  <span className="mr-2">$</span>ls ~/projects
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent/10 hover:text-glow-sm transition-all">
                <Link href="/contact">
                  <span className="mr-2">$</span>./contact.sh
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
