"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Decision } from "@/lib/store";

const CUISINES = ["🍣 Sushi", "🍕 Pizza", "🌮 Tacos", "🍔 Burgers", "🍜 Noodles", "🥗 Salads", "🍗 Chicken", "🥩 Steakhouse"];

export default function VotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState<"$" | "$$" | "$$$" | "">("");
  const [vibe, setVibe] = useState<"chill" | "fancy" | "fast" | "">("");
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [step, setStep] = useState<"name" | "prefs" | "done">("name");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/decision/${id}`).then((r) => r.json()).then(setDecision);
  }, [id]);

  function toggleCuisine(c: string) {
    setCuisines((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  async function handleSubmit() {
    if (!budget || !vibe) return;
    setLoading(true);
    const selected = cuisines.length > 0 ? cuisines.map((c) => c.split(" ")[1].toLowerCase()) : ["any"];
    await fetch(`/api/decision/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, budget, vibe, cuisines: selected }),
    });
    setStep("done");
    setLoading(false);
  }

  if (!decision) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[#555]">Loading...</p>
      </main>
    );
  }

  if (step === "done") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-sm w-full">
          <h1 className="text-3xl font-black mb-2" style={{ color: "#E8294C" }}>settle.</h1>
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Vote locked in.</h2>
          <p className="text-[#555] mb-6">
            You&apos;re done. Settle will take it from here. Tell {decision.createdBy} everyone&apos;s voted.
          </p>
          <button
            onClick={() => router.push(`/decision/${id}`)}
            className="w-full py-4 rounded-2xl text-white font-bold"
            style={{ backgroundColor: "#1D6EE8" }}
          >
            See the decision board →
          </button>
        </div>
      </main>
    );
  }

  if (step === "name") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-black mb-1" style={{ color: "#E8294C" }}>settle.</h1>
          <h2 className="text-xl font-bold mt-4 mb-1">{decision.name}</h2>
          <p className="text-[#555] text-sm mb-8">Started by {decision.createdBy} · {decision.time} · {decision.location}</p>
          <label className="block text-sm font-semibold mb-2">What&apos;s your name?</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8294C] mb-4"
          />
          <button
            onClick={() => name.trim() && setStep("prefs")}
            disabled={!name.trim()}
            className="w-full py-4 rounded-2xl text-white font-bold disabled:opacity-40"
            style={{ backgroundColor: "#E8294C" }}
          >
            Let&apos;s go →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black mb-1" style={{ color: "#E8294C" }}>settle.</h1>
        <p className="text-[#555] text-sm mb-6">Quick — 10 seconds. Go.</p>

        <div className="mb-6">
          <p className="font-semibold mb-3">Budget?</p>
          <div className="grid grid-cols-3 gap-2">
            {(["$", "$$", "$$$"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBudget(b)}
                className={`py-3 rounded-xl font-bold border-2 transition-all ${
                  budget === b
                    ? "text-white border-transparent"
                    : "bg-white border-[#E0E0E0] text-[#1A1A1A]"
                }`}
                style={budget === b ? { backgroundColor: "#E8294C", borderColor: "#E8294C" } : {}}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-semibold mb-3">Vibe?</p>
          <div className="grid grid-cols-3 gap-2">
            {(["chill", "fancy", "fast"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVibe(v)}
                className={`py-3 rounded-xl font-bold border-2 capitalize transition-all ${
                  vibe === v
                    ? "text-white border-transparent"
                    : "bg-white border-[#E0E0E0] text-[#1A1A1A]"
                }`}
                style={vibe === v ? { backgroundColor: "#E8294C", borderColor: "#E8294C" } : {}}
              >
                {v === "chill" ? "😌 Chill" : v === "fancy" ? "✨ Fancy" : "⚡ Fast"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="font-semibold mb-1">Cuisine? <span className="font-normal text-[#555] text-sm">(pick any or skip)</span></p>
          <div className="grid grid-cols-2 gap-2">
            {CUISINES.map((c) => (
              <button
                key={c}
                onClick={() => toggleCuisine(c)}
                className={`py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all text-left ${
                  cuisines.includes(c)
                    ? "text-white border-transparent"
                    : "bg-white border-[#E0E0E0] text-[#1A1A1A]"
                }`}
                style={cuisines.includes(c) ? { backgroundColor: "#1D6EE8", borderColor: "#1D6EE8" } : {}}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!budget || !vibe || loading}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg disabled:opacity-40"
          style={{ backgroundColor: "#E8294C" }}
        >
          {loading ? "Locking in..." : "I'm done →"}
        </button>
      </div>
    </main>
  );
}
