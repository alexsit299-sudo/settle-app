"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import type { Decision } from "@/lib/store";

const ROASTS = [
  "Waiting on the slow ones. You know who you are.",
  "The suspense is killing us. Okay, not really.",
  "Still waiting. We've lit a candle.",
  "Tap the link. It's 10 seconds. We believe in you.",
];

export default function DecisionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [settling, setSettling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/decision/${id}/vote`
    : "";

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/decision/${id}`);
      if (res.ok) setDecision(await res.json());
    }
    load();
    const interval = setInterval(load, 4000);
    return () => clearInterval(interval);
  }, [id]);

  async function handleSettle() {
    setSettling(true);
    setError("");
    const res = await fetch(`/api/decision/${id}/settle`, { method: "POST" });
    if (res.ok) {
      setDecision(await res.json());
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    }
    setSettling(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!decision) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[#555]">Loading...</p>
      </main>
    );
  }

  const voteCount = Object.keys(decision.votes).length;
  const totalMembers = decision.members.length || voteCount;
  const roast = ROASTS[voteCount % ROASTS.length];

  if (decision.status === "settled" && decision.result) {
    const result = decision.result;
    const overrideNeeded = Math.ceil(totalMembers / 2) + 1;
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <a href="/" className="text-3xl font-black" style={{ color: "#E8294C" }}>settle.</a>
          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <div
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "#E8294C" }}
            >
              🎉 Settled.
            </div>
            <h2 className="text-3xl font-black mb-1">{result.name}</h2>
            <p className="text-[#555] text-sm mb-4">
              {result.rating}★ · {result.price} · {result.cuisine}
            </p>
            <p className="text-sm text-[#1A1A1A] mb-4">{result.address}</p>
            <div
              className="rounded-xl p-4 text-sm italic text-[#1A1A1A] mb-6"
              style={{ backgroundColor: "#F8F8F8" }}
            >
              &ldquo;{result.reasoning}&rdquo;
            </div>
            {result.yelpUrl && (
              <a
                href={result.yelpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl text-white font-bold mb-3"
                style={{ backgroundColor: "#1D6EE8" }}
              >
                View on Yelp →
              </a>
            )}
            <p className="text-center text-xs text-[#555] mt-4">
              {decision.overrideVotes.length}/{overrideNeeded} votes to override
              {decision.overrideVotes.length > 0 && ` — ${decision.overrideVotes.join(", ")} pushed back`}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <a href="/" className="text-3xl font-black" style={{ color: "#E8294C" }}>settle.</a>
        <h2 className="text-2xl font-bold mt-4 mb-1">{decision.name}</h2>
        <p className="text-[#555] text-sm mb-6">
          {decision.time} · {decision.location}
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-sm font-semibold mb-3">
            {voteCount} of {totalMembers || "?"} voted
          </p>
          {decision.members.map((m) => (
            <div key={m} className="flex items-center gap-2 py-1 text-sm">
              {decision.votes[m] ? (
                <span className="text-green-500">✅</span>
              ) : (
                <span className="text-[#E0E0E0]">⏳</span>
              )}
              <span>{m}</span>
            </div>
          ))}
          {voteCount > 0 && (
            <p className="text-xs text-[#555] mt-3 italic">{roast}</p>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-sm font-semibold mb-2">Share this link with your group</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl}
              className="flex-1 text-xs border border-[#E0E0E0] rounded-lg px-3 py-2 bg-[#F8F8F8] truncate"
            />
            <button
              onClick={copyLink}
              className="px-3 py-2 rounded-lg text-white text-xs font-bold"
              style={{ backgroundColor: "#1D6EE8" }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {error && <p className="text-[#E8294C] text-sm mb-3">{error}</p>}

        <button
          onClick={handleSettle}
          disabled={settling || voteCount === 0}
          className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ backgroundColor: "#E8294C" }}
        >
          {settling ? "Asking the AI gods..." : "Settle This →"}
        </button>
        <p className="text-center text-xs text-[#555] mt-2">
          {voteCount === 0
            ? "Wait for at least one vote first"
            : "Settle whenever you're ready — majority rules"}
        </p>

        <div className="mt-4 text-center">
          <Link
            href={`/decision/${id}/vote`}
            className="text-sm font-semibold underline"
            style={{ color: "#1D6EE8" }}
          >
            Vote yourself →
          </Link>
        </div>
      </div>
    </main>
  );
}
