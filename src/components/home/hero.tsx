import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
          <Avatar className="h-28 w-28 md:h-36 md:w-36">
            <AvatarImage src="/avatar.jpg" alt="Yeebin Huang" />
            <AvatarFallback className="text-2xl">YH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Yeebin Huang
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              用代码锻造未来，以AI驱动表达
            </p>
            <p className="max-w-lg text-muted-foreground">
              大四计算机专业学生，热衷于全栈开发与 AI 应用。擅长 React/Next.js 生态，
              对深度学习和大语言模型有深入研究。
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <Button asChild>
                <Link href="/projects">查看项目</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">联系我</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
