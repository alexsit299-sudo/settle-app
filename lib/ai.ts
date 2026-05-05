import Anthropic from "@anthropic-ai/sdk";
import type { Vote, Restaurant } from "./store";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function pickRestaurant(
  votes: Vote[],
  location: string,
  time: string,
  yelpResults?: string
): Promise<Restaurant> {
  const votesSummary = votes
    .map(
      (v) =>
        `${v.name}: budget=${v.budget}, vibe=${v.vibe}, cuisines=[${v.cuisines.join(", ")}]`
    )
    .join("\n");

  const prompt = `You are Settle — a decisive, funny AI that ends group indecision. Your job: pick ONE restaurant. Be confident. No hedging.

GROUP INFO:
Location: ${location}
Time: ${time}
Votes:
${votesSummary}

${yelpResults ? `REAL NEARBY RESTAURANTS (prefer these):\n${yelpResults}\n` : ""}

RULES:
- Pick the single best restaurant given everyone's preferences
- Majority budget/vibe/cuisine wins ties
- Be specific — real restaurant name, real address if possible
- Write your reasoning in Settle's voice: funny, confident, slightly impatient

Respond ONLY with valid JSON in this exact shape:
{
  "name": "Restaurant Name",
  "rating": 4.5,
  "price": "$$",
  "cuisine": "Japanese",
  "address": "123 Main St, City",
  "reasoning": "Settle's funny one-liner for why this place won"
}`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI returned invalid response");
  return JSON.parse(jsonMatch[0]) as Restaurant;
}
