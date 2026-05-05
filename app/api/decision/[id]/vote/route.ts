import { NextRequest, NextResponse } from "next/server";
import { submitVote } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { name, budget, vibe, cuisines } = body;

  if (!name || !budget || !vibe || !cuisines) {
    return NextResponse.json({ error: "Missing vote fields" }, { status: 400 });
  }

  const decision = submitVote(id, { name, budget, vibe, cuisines });
  if (!decision) {
    return NextResponse.json({ error: "Decision not found or already settled" }, { status: 404 });
  }

  return NextResponse.json(decision);
}
