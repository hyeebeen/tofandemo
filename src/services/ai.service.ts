import { generateText } from "ai";
import { getModel } from "@/lib/ai/providers";
import { getCachedResponse, setCachedResponse } from "@/lib/ai/cache";
import { checkRateLimit, incrementUsage } from "@/lib/ai/rate-limit";
import { getPostBySlug } from "@/services/post.service";

export async function generateSummary(postSlug: string) {
  const limit = await checkRateLimit("summarize");
  if (!limit.allowed) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }

  const cacheKey = `summary:${postSlug}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) return cached;

  const post = await getPostBySlug(postSlug);
  if (!post) throw new Error("POST_NOT_FOUND");

  const { text } = await generateText({
    model: getModel(),
    prompt: `Please generate a concise summary (2-3 sentences) for the following blog post. Respond in the same language as the content.\n\nTitle: ${post.title}\n\nContent:\n${post.content}`,
  });

  await setCachedResponse(cacheKey, text);
  await incrementUsage("summarize");
  return text;
}

export async function getRecommendations(context: string) {
  const limit = await checkRateLimit("recommend");
  if (!limit.allowed) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }

  const cacheKey = `recommend:${context}`;
  const cached = await getCachedResponse(cacheKey);
  if (cached) return cached;

  const { text } = await generateText({
    model: getModel(),
    prompt: `Based on the following context, recommend relevant projects or blog posts. Respond in JSON format with an array of { title, reason } objects. Context:\n${context}`,
  });

  await setCachedResponse(cacheKey, text);
  await incrementUsage("recommend");
  return text;
}
