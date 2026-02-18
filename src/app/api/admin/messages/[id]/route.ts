import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import * as contactService from "@/services/contact.service";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  if (body.reply) {
    const msg = await contactService.replyToMessage(Number(id), body.reply);
    if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(msg);
  }

  const msg = await contactService.markAsRead(Number(id));
  if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(msg);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const deleted = await contactService.deleteMessage(Number(id));
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
