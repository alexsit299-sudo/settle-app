import { NextRequest, NextResponse } from "next/server";
import { addOverrideVote } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const decision = addOverrideVote(id, name);
  if (!decision) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(decision);
}
