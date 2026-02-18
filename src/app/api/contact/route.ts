import { NextRequest, NextResponse } from "next/server";
import * as contactService from "@/services/contact.service";
import { z } from "zod";

const contactSchema = z.object({
  visitorName: z.string().min(1).max(128),
  visitorEmail: z.string().email().max(256),
  category: z.string().max(32).optional(),
  subject: z.string().max(256).optional(),
  content: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const message = await contactService.submitMessage(parsed.data);
  return NextResponse.json(message, { status: 201 });
}
