import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <div className="max-w-md w-full">
        <h1 className="text-6xl font-black tracking-tight mb-2" style={{ color: "#E8294C" }}>
          settle.
        </h1>
        <p className="text-xl font-medium text-[#1A1A1A] mb-2">
          Stop asking. Start eating.
        </p>
        <p className="text-[#555] mb-10 text-base leading-relaxed">
          No more &ldquo;idk, what do you want?&rdquo; — Settle reads your group&apos;s
          preferences and delivers one confident answer. Majority rules. No debate.
        </p>

        <Link
          href="/decide"
          className="block w-full py-4 rounded-2xl text-white font-bold text-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#E8294C" }}
        >
          Start a Decision →
        </Link>

        <div className="mt-12 grid grid-cols-3 gap-4 text-sm">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">⚡</div>
            <div className="font-semibold">10 seconds</div>
            <div className="text-[#555]">per person to vote</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">🗳️</div>
            <div className="font-semibold">Majority rules</div>
            <div className="text-[#555]">no endless debate</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl mb-1">✅</div>
            <div className="font-semibold">One answer</div>
            <div className="text-[#555]">delivered with confidence</div>
          </div>
        </div>
      </div>
    </main>
  );
}
