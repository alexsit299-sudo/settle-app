import { NextRequest, NextResponse } from "next/server";
import { getDecision, settleDecision } from "@/lib/store";
import { pickRestaurant } from "@/lib/ai";
import { searchRestaurants } from "@/lib/yelp";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const decision = getDecision(id);
  if (!decision) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (decision.status === "settled") return NextResponse.json(decision);

  const votes = Object.values(decision.votes);
  if (votes.length === 0) {
    return NextResponse.json({ error: "No votes yet" }, { status: 400 });
  }

  // tally majority budget and cuisine for Yelp search
  const budgetCount: Record<string, number> = {};
  const cuisineCount: Record<string, number> = {};
  votes.forEach((v) => {
    budgetCount[v.budget] = (budgetCount[v.budget] ?? 0) + 1;
    v.cuisines.forEach((c) => {
      cuisineCount[c] = (cuisineCount[c] ?? 0) + 1;
    });
  });
  const topBudget = Object.entries(budgetCount).sort((a, b) => b[1] - a[1])[0][0];
  const topCuisine = Object.entries(cuisineCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "any";

  const yelpResults = await searchRestaurants(decision.location, topBudget, topCuisine);
  const result = await pickRestaurant(votes, decision.location, decision.time, yelpResults);

  const settled = settleDecision(id, result);
  return NextResponse.json(settled);
}
