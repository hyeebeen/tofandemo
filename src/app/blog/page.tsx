import { getPublishedPosts } from "@/lib/queries";
import { BlogClient } from "./blog-client";

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogClient posts={posts} />;
}
