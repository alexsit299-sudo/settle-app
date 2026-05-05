import { v4 as uuidv4 } from "uuid";

export type Vote = {
  name: string;
  budget: "$" | "$$" | "$$$";
  vibe: "chill" | "fancy" | "fast";
  cuisines: string[];
};

export type Restaurant = {
  name: string;
  rating: number;
  price: string;
  cuisine: string;
  address: string;
  reasoning: string;
  yelpUrl?: string;
};

export type Decision = {
  id: string;
  name: string;
  time: string;
  location: string;
  createdBy: string;
  members: string[];
  votes: Record<string, Vote>;
  status: "waiting" | "settled";
  result?: Restaurant;
  overrideVotes: string[];
  createdAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __settle_store: Map<string, Decision> | undefined;
}

const store: Map<string, Decision> =
  globalThis.__settle_store ?? (globalThis.__settle_store = new Map());

export function createDecision(data: {
  name: string;
  time: string;
  location: string;
  createdBy: string;
  members: string[];
}): Decision {
  const decision: Decision = {
    id: uuidv4(),
    ...data,
    votes: {},
    status: "waiting",
    overrideVotes: [],
    createdAt: Date.now(),
  };
  store.set(decision.id, decision);
  return decision;
}

export function getDecision(id: string): Decision | undefined {
  return store.get(id);
}

export function submitVote(id: string, vote: Vote): Decision | null {
  const decision = store.get(id);
  if (!decision || decision.status === "settled") return null;
  decision.votes[vote.name] = vote;
  store.set(id, decision);
  return decision;
}

export function settleDecision(id: string, result: Restaurant): Decision | null {
  const decision = store.get(id);
  if (!decision) return null;
  decision.status = "settled";
  decision.result = result;
  store.set(id, decision);
  return decision;
}

export function addOverrideVote(id: string, name: string): Decision | null {
  const decision = store.get(id);
  if (!decision || decision.status !== "settled") return null;
  if (!decision.overrideVotes.includes(name)) {
    decision.overrideVotes.push(name);
  }
  store.set(id, decision);
  return decision;
}
