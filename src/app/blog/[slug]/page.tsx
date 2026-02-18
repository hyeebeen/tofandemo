import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/post-content";
import { getPostBySlug, getAllPostSlugs } from "@/lib/queries";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((row) => ({ slug: row.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <PostContent post={post} />
    </div>
  );
}
