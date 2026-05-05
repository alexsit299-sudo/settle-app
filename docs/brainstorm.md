# Settle — Brainstorm Session Notes

## Origin
Started from a broader question: what can AI create that appeals to all demographics and monetizes itself?

Narrowed to Millennials + Gen Z as the dominant digital consumer demographics (largest social media users, biggest digital spenders, trend-setters).

Identified their key pain points:
1. The "Saved Post Graveyard" — saved content never revisited
2. **Group Decision Paralysis** — "where should we eat?" ← THIS ONE
3. The Blank Page Problem — creativity dies before it starts
4. Reconnecting with Drifted Friends — don't know what to say

## Why Option 2 Won
- Fastest to monetize (commission on bookings)
- Easiest to demo to investors
- Zero behavior change required — problem already exists daily
- Clear B2B expansion path (Yelp, OpenTable, Resy)
- Everyone has felt this pain personally

## Core Product Vision
Restaurant matchmaking for your whole group. Not a directory. Not a search engine. A decisive AI that takes everyone's preferences and delivers one confident answer. Majority rules. No debate.

The app has three layers:
1. **Utility** — finding where to eat, settling group decisions
2. **Personalization** — AI that knows you and gets smarter over time
3. **Social** — a food identity platform where decisions become content

---

## Core Decisions Made

### Concept
- Restaurant matchmaking — like a dating app but for where you eat
- The reveal moment: "We matched you with..." is the magic
- AI picks ONE place. Confident. No hedging. Majority rules.

### Target
- Primary: Gen Z (18-29) and Millennials (30-44)
- Digital natives, decision-fatigued, socially driven

### Platform
- iOS and Android main app first
- iMessage plugin later (Phase 4) as condensed version
- All files on GitHub, deploy via Vercel

---

## Onboarding Flow — LOCKED

### Profile Creation (Screen 1)
- Name
- Username + AI randomize button
- Phone number
- Birth year (legal COPPA compliance, lighter than full birthday)
- TOS line at bottom: "By continuing you agree to our Terms of Service and Privacy Policy"

### Phone Verification (Screen 2)
- 6-digit SMS code sent immediately after profile
- Standard auth pattern (Uber, WhatsApp model)
- Required — no fake accounts, enables account recovery

### Dot 1 — Taste Profile
- Budget: $ / $$ / $$$ as visual tiles
- Cuisines: emoji tiles, pick up to 5 from 12 options max
- Dietary restrictions/allergies: toggle tiles (Vegetarian, Vegan, Gluten-free, Halal, No seafood, Nut allergy)
- **Diet and allergies are HARD CODED — never shift, always applied as invisible filters**
- AI starts working in background the moment Dot 1 is complete

### Dot 2 — Permissions
- Location toggle (off by default → slide on → native phone popup)
  - Copy: "So we know where to send you, not just vibes."
  - Fallback if denied: toggle snaps off, soft message appears, manual location input available per decision
- Distance preference (appears after location enabled): Walking / Short drive / Worth the trip
- Notifications toggle (off by default → slide on → native phone popup)
  - Copy: "We'll only bother you when it matters. Unlike your group chat."

### Dot 3 — Social
- Invite friends: contacts, iMessage, or shareable link
- Shows 3-5 suggested contacts, "+ more" option
- Skip option always visible — never gate Done behind invites
- Done button always visible at bottom

### Loading / Transition
- AI has been working since Dot 1
- If ready: instant transition to Explore
- If needs more time: loading screen with food-tossing-in-bowl animation
- Rotating one-liners during load:
  - "Consulting the algorithm. And our gut."
  - "Cross-referencing 847 restaurants with your vibe."
  - "Almost there. Good things take a second."
- Target: never more than 3-4 seconds

---

## Navigation — LOCKED

**5 tabs across the bottom. Sweet spot.**

```
🔍 Explore  |  🃏 Match  |  ⚡ Settle  |  👥 Friends  |  👤 Profile
```

- Profile is also accessible via a profile picture bubble in the top corner of every tab
- No 6th tab — if it doesn't fit in 5, it lives inside one of these

---

## Explore Tab — FULLY LOCKED

### What It Is
The main landing page. Pure recommendation engine — never asks questions (that's Match tab's job). Just watches and learns. Gets smarter over time.

### What Feeds It (in order of weight)
1. Match tab activity — questionnaire answers, vibe picks, cuisine choices over time
2. Past decisions — where you've actually settled and gone, bookmarks
3. Friend activity — what your network is settling on
4. Location + time of day
5. Trending data from Yelp/Google Places

### Top Bar
```
📍 River North, Chicago  ▾
[🔍 Search restaurants...        ] [⚙️]
```
- Location indicator tappable — change neighborhood for planning ahead
- Search bar: searches restaurants, cuisines, neighborhoods, friends
- Filter icon (⚙️) opens bottom sheet filter panel

### Filter Bottom Sheet
- Price: $ / $$ / $$$ / $$$$
- Distance: Walking / Short drive / Worth the trip
- Open now toggle
- Available to book toggle (OpenTable integration — major differentiator)
- Diet/allergy filters NOT shown here — always applied invisibly in background

### Content Format
**Vertical feed — continuous scroll. Visual first. Dopamine-driven.**
One unified scroll of restaurant cards ranked by AI relevance.
Each card tagged with the signal that surfaced it.

### The Card
```
┌─────────────────────────────┐
│                             │
│      [Restaurant Photo]     │
│       full bleed, warm      │
│       high quality (~65%)   │
│                             │
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│← dark gradient fade
│ 🤖 Matched to your taste    │← signal tag, small
│ Nobu Downtown               │← name, big bold white
│ Sushi · $$$ · ⭐4.8 · 0.4mi│← details, small white
└─────────────────────────────┘
```
- Photo takes 65% of card height — food/ambiance does the selling
- Zero buttons on the card — entire card is one tap
- Subtle fade + scale animation as card scrolls into view
- Slight spacing between cards — each feels like its own moment

### Signal Tags
| Tag | Trigger |
|---|---|
| 🤖 Matched to your taste | AI based on profile + Match activity |
| 👥 [Friend] settled here | Friend in network went recently |
| 🔥 Trending tonight | High settle volume in area right now |
| ⏰ Happy hour until 7pm | Time-sensitive, ends soon |
| 🆕 Just opened | New restaurant in area |
| 🔖 You bookmarked this | Saved but never visited — gentle nudge |

### Time-Aware Feed (automatic, no user input)
- 7am–11am → Breakfast, coffee, brunch
- 11am–3pm → Lunch, quick bites prominent
- 3pm–6pm → Happy hour section rises
- 6pm–10pm → Dinner focus, trending, special occasion
- 10pm+ → Late night spots, bars with food

### Full Restaurant Page (on tap)
```
← [Full photo, top]  🔖
Nobu Downtown
Sushi · $$$ · ⭐4.8
📍 0.4mi · River North
─────────────────────────────
🤖 Why Settle picked this
"Four of your friends have been here this month
and you love sushi. We don't make the rules."
─────────────────────────────
⏰ Open until 11pm
🪑 Tables available at 8pm
─────────────────────────────
📸 From your friends
[Sarah's post]  [Mike's post]
─────────────────────────────
[  🎯 Settle Here  ]   ← starts a decision at this restaurant
[  📅 Book a Table ]   ← OpenTable deep link
```
- Settle Here: pre-loads restaurant into Settle tab flow
- Book a Table: for solo diners who don't need group decision
- Friend posts: real social proof from trusted network

---

## Profile Tab — LOCKED

Profile is a rich social page — not just settings.

### Header
```
[Photo]  settle.  @username
         📍 Chicago
  124 decisions  |  38 friends  |  12 posts
  [Edit Profile]
```

### Sections Inside Profile
- **Posts** — auto-generated from settled decisions (user opts to share), photos + AI reasoning + who went
- **Saved** — bookmarked restaurants, private by default, organized by cuisine/neighborhood
- **Interests** — living taste profile, evolves over time, public-facing food personality
- **History** — every past Settle decision, auto-logged, solo and group
- **Settings** — account, privacy, dietary restrictions (hard-coded here), notifications, linked accounts

### Discoverability Setting (inside Settings)
```
Account Type
● Public — anyone can discover and follow you
○ Private — only approved friends see your activity
```
- Public: profile in search, posts visible to anyone, can build followers, surfaces in others' Explore
- Private: invisible to non-friends, must approve friend requests, nothing leaks to Explore

---

## Settled Moment — LOCKED

When a decision is made (solo or group):
1. Verdict card slams in — bold, full screen
2. Confetti erupts — brand colors (red and blue)
3. Half second of pure celebration — no prompts
4. Confetti settles, verdict stays visible
5. Bottom sheet rises: "Want to share this decision?"
6. If share → caption bubble with pre-written Settle-voice copy (editable)
7. Share options: Settle feed / Instagram Stories / iMessage

**Group decisions:** confetti hits harder, group members' names float up briefly

**Pre-written caption format:**
"settle. just matched us with [Restaurant] tonight. [funny specific line]. 🍽️"
User can edit or post as-is.

---

## Questions Still Open
- Match tab — full swipe/question flow
- Settle tab — group decision flow
- Friends tab — feed and social layer
- Restaurant card on Match tab vs Explore (same or different?)
- AI engine reasoning depth
- OpenTable/Resy partnership vs deep link approach
- Monetization model detail
- Competitor analysis
- Pitch deck build
