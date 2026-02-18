import { ContactForm } from "@/components/contact/contact-form";
import { Mail, Terminal } from "lucide-react";

export const metadata = {
  title: "联系",
  description: "通过留言表单与 Yeebin Huang 取得联系。",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16 relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary/70">guest@devforge</span>
          <span>~</span>
          <span className="text-accent">$</span>
          <span>./contact.sh</span>
        </div>

        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-primary flex items-center gap-2">
          <Mail className="h-8 w-8" />
          <span className="text-muted-foreground">&gt;</span> 联系我
        </h1>
        <p className="mb-8 text-muted-foreground">
          <span className="text-accent/50">// </span>
          有任何问题、合作意向或技术交流，欢迎通过以下表单留言。
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
