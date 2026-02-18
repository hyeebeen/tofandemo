import { NextRequest, NextResponse } from "next/server";
import { generateSummary } from "@/services/ai.service";
import { z } from "zod";

const schema = z.object({ slug: z.string().min(1) });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const summary = await generateSummary(parsed.data.slug);
    return NextResponse.json({ summary });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    if (message === "RATE_LIMIT_EXCEEDED") {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }
    if (message === "POST_NOT_FOUND") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
