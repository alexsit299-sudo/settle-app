import { NextRequest, NextResponse } from "next/server";
import { createDecision } from "@/lib/store";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, time, location, createdBy, members } = body;

  if (!name || !location || !createdBy) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const decision = createDecision({
    name,
    time: time || "Tonight",
    location,
    createdBy,
    members: members || [],
  });

  return NextResponse.json(decision, { status: 201 });
}
