# Settle — UI Flows

## App Structure
5 main tabs:
- 🏠 Home
- 🍕 Food (Phase 1 focus)
- 🎬 Activities (Phase 2)
- ✈️ Trips (Phase 3)
- 👤 Profile

---

## Food Flow (Phase 1)

### Screen 1 — Home
```
──────────────────────────
  Settle                 🔔
──────────────────────────

  Good evening, Alex 👋
  You have 2 active decisions

  ──────────────────────
  🍕 Dinner Friday
  Started by Sarah · 3/5 responded
  [View]

  🎬 Movie this weekend
  Started by you · 5/5 · SETTLED ✅
  Parasite 2 @ AMC 7pm Sat
  ──────────────────────

  + Start a Decision

──────────────────────────
🏠  🍕  🎬  ✈️  👤
```

### Screen 2 — Start a Decision
```
──────────────────────────
  ← New Decision
──────────────────────────

  What are we deciding?
  ● Food
  ○ Activity
  ○ Trip

  What's the occasion?
  [Dinner tonight          ]

  When?
  [Tonight  ▾]  [7:00 PM  ▾]

  Where?
  [Use my location  📍]

  Who's in?
  [+ Add friends]
  😀 Sarah  😀 Mike  😀 Jordan

  [Let's Settle This →]
──────────────────────────
```

### Screen 3 — Preference Input (each member sees this)
```
──────────────────────────
  Sarah wants to know:
  Dinner tonight 🍽️
  Quick — 10 seconds, go.
──────────────────────────

  Budget?
  [$ Cheap]  [$$ Mid]  [$$$ Fancy]

  Vibe?
  [😌 Chill]  [✨ Fancy]  [⚡ Fast]

  Cuisine?
  🍣  🍕  🌮  🍔  🍜  🥗
  [Anything, I'm easy]

  [I'm Done →]
──────────────────────────
  Settle is judging you for
  taking this long. Tap faster.
```

### Screen 4 — Waiting State
```
──────────────────────────
  Dinner tonight 🍽️
──────────────────────────

  Waiting on:
  ✅ Sarah
  ✅ You
  ✅ Mike
  ⏳ Jordan
  ⏳ Tyler

  "Tyler has been known to
  take 45 mins to reply.
  We've started a prayer circle."

  [Remind them 👋]  [Skip & Settle]

──────────────────────────
```

### Screen 5 — The Verdict
```
──────────────────────────
  🎉 SETTLED.
──────────────────────────

  Nobu Downtown
  ⭐ 4.8 · $$$ · 0.8mi away
  Japanese · Sushi

  Tonight at 7:30 PM
  Table for 5

  Why Settle picked this:
  4/5 said mid-high budget
  3/5 said chill or fancy
  Sushi won the cuisine vote

  [Book Now 📅]  [Get Directions 📍]

  ──────────────────────
  Not feeling it?
  Tyler voted to override.
  Need 3 more votes to change.
  [Override]  [Stick with it ✅]
──────────────────────────
```

### Override Screen (if triggered)
```
──────────────────────────
  Tyler wants to override 🙄
──────────────────────────

  Current pick: Nobu Downtown
  Tyler's suggestion: Anywhere cheaper

  Votes to override: 1/3 needed

  [Support Override]  [Nah, Nobu it is]

  "Majority rules. Democracy
  is alive and well in your
  friend group. Barely."
──────────────────────────
```

---

## Profile Tab
```
──────────────────────────
  👤 Your Profile
──────────────────────────

  Taste Profile (learned over time)
  Budget sweet spot: $$
  Favorite cuisines: Sushi, Mexican
  Vibe: Chill > Fancy

  Decision History
  Last 30 days: 12 decisions
  You started: 4
  You caused a delay: 3 times
  (We're not mad, just disappointed)

  Your Groups
  🏠 The Crew (5 people)
  💼 Work Lunch Gang (4 people)

  Preferences
  Dietary restrictions
  Location radius
  Notification settings
──────────────────────────
```

---

## Key UX Principles
- **10-second rule**: every input screen should take under 10 seconds
- **One thumb**: all interactions reachable with one thumb
- **Personality everywhere**: Settle has a voice — use it in microcopy
- **No dead ends**: always give the group a path forward
- **Majority rules**: built into every conflict state
