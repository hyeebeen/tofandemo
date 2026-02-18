import { ContactForm } from "@/components/contact/contact-form";

export const metadata = {
  title: "联系",
  description: "通过留言表单与 Yeebin Huang 取得联系。",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
        联系我
      </h1>
      <p className="mb-8 text-muted-foreground">
        有任何问题、合作意向或技术交流，欢迎通过以下表单留言。
      </p>
      <ContactForm />
    </div>
  );
}
