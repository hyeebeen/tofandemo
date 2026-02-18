import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <article data-type="post-detail">
      <header className="mb-8">
        <div className="mb-3 text-sm text-muted-foreground">{dateStr}</div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" data-skill={tag}>
              <span data-skill={tag}>{tag}</span>
            </Badge>
          ))}
        </div>
      </header>

      <div data-ai="summary" className="mb-8 rounded-lg border bg-muted/50 p-4">
        <p className="text-sm font-medium text-muted-foreground">
          {post.aiSummary ?? "AI 摘要加载中..."}
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none whitespace-pre-line">
        {post.content}
      </div>

      {relatedProjects.length > 0 && (
        <>
          <Separator className="my-8" />
          <div>
            <h2 className="mb-4 text-xl font-semibold">关联项目</h2>
            <ul className="space-y-2">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-muted-foreground hover:text-foreground hover:underline"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </article>
  );
}
