import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, FolderGit2, Terminal, Sparkles } from "lucide-react";
import type { PostDetail } from "@/lib/queries";

interface PostContentProps {
  post: NonNullable<PostDetail>;
}

export function PostContent({ post }: PostContentProps) {
  const tags = post.postSkills.map((ps) => ps.skill.name);
  const relatedProjects = post.projectPosts?.map((pp) => pp.project) ?? [];
  const dateStr = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("zh-CN")
    : "";

  return (
    <article data-type="post-detail" className="relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary/70">guest@devforge</span>
          <span>~</span>
          <span className="text-accent">$</span>
          <span>cat ~/blog/{post.slug}.md</span>
        </div>

        <header className="mb-8">
          <div className="mb-3 text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="font-mono">{dateStr}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-accent text-glow-sm">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" data-skill={tag} className="border-accent/30 text-accent/80 hover:bg-accent/10">
                <span data-skill={tag}>#{tag}</span>
              </Badge>
            ))}
          </div>
        </header>

        <div data-ai="summary" className="mb-8 rounded border border-accent/30 bg-accent/5 p-4">
          <div className="flex items-center gap-2 mb-2 text-accent text-sm">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono">[AI_SUMMARY]</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {post.aiSummary ?? "AI 摘要加载中..."}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none whitespace-pre-line border border-primary/10 rounded p-6 bg-card/30 text-card-foreground">
          {post.content}
        </div>

        {relatedProjects.length > 0 && (
          <>
            <Separator className="my-8 bg-primary/20" />
            <div>
              <h2 className="mb-4 text-xl font-semibold text-primary flex items-center gap-2">
                <FolderGit2 className="h-5 w-5" />
                <span className="text-muted-foreground">&gt;</span> 关联项目
              </h2>
              <ul className="space-y-2">
                {relatedProjects.map((project) => (
                  <li key={project.slug} className="border border-primary/10 rounded p-3 bg-card/20 hover:border-primary/30 transition-all">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <span className="text-primary/50">&gt;</span>
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
