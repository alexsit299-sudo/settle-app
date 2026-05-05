"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DecidePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    time: "",
    location: "",
    createdBy: "",
    members: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const members = form.members
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean);

    const res = await fetch("/api/decision", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        time: form.time || "Tonight",
        location: form.location,
        createdBy: form.createdBy,
        members,
      }),
    });

    if (!res.ok) {
      setError("Something went wrong. Try again.");
      setLoading(false);
      return;
    }

    const decision = await res.json();
    router.push(`/decision/${decision.id}`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <a href="/" className="text-3xl font-black" style={{ color: "#E8294C" }}>
          settle.
        </a>
        <h2 className="text-2xl font-bold mt-4 mb-1">Start a decision</h2>
        <p className="text-[#555] mb-8">
          Fill this out, share the link. We&apos;ll handle the rest.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Your name</label>
            <input
              type="text"
              placeholder="Alex"
              required
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8294C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">What are we deciding?</label>
            <input
              type="text"
              placeholder="Dinner tonight"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8294C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">When?</label>
            <input
              type="text"
              placeholder="Tonight 7pm"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8294C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Where? (city or neighborhood)</label>
            <input
              type="text"
              placeholder="Downtown Chicago"
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8294C]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Who&apos;s in? <span className="font-normal text-[#555]">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="Sarah, Mike, Jordan"
              value={form.members}
              onChange={(e) => setForm({ ...form, members: e.target.value })}
              className="w-full border border-[#E0E0E0] rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#E8294C]"
            />
          </div>

          {error && <p className="text-[#E8294C] text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#E8294C" }}
          >
            {loading ? "Creating..." : "Create Decision →"}
          </button>
        </form>
      </div>
    </main>
  );
}
