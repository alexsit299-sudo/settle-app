# Settle — Product Spec

## Vision
An AI-powered group decision app that ends indecision with a single, confident verdict — delivered fast, with personality.

## Target Users
- **Primary**: Gen Z (18-29), Millennials (30-44)
- **Use case**: Any group of 2-10 people making a shared decision
- **Context**: Friends, couples, coworkers, family

---

## Phase 1 — Food MVP

### Core Features
- [ ] Create a decision (name, time, location, group)
- [ ] Invite group members (contacts or Settle friends)
- [ ] Preference input flow (budget, vibe, cuisine)
- [ ] AI decision engine (synthesize inputs → single restaurant pick)
- [ ] Majority-rules override system
- [ ] Booking integration (OpenTable / Resy API)
- [ ] Push notifications
- [ ] Decision history

### AI Decision Engine Requirements
- Takes: group preference inputs + location + time
- Cross-references: Google Places / Yelp API for ratings, hours, availability
- Outputs: single restaurant recommendation with reasoning
- Handles: ties (picks highest rated), no-shows (skips after timeout), dietary restrictions (filters hard)

### Personality / Voice
Settle has a consistent comedic voice across all microcopy:
- Impatient but loveable ("We've been waiting 4 minutes. Some of us have things to do.")
- Confident ("Trust us. This place is elite.")
- Roasts slow responders ("Tyler has entered the chat. 47 minutes later.")
- Hypes the verdict ("You're welcome. Dinner is handled.")

### Conflict / Edge Cases
| Scenario | Behavior |
|---|---|
| Someone doesn't respond | 10 min timeout, their vote skipped |
| Tie in preferences | AI picks highest rated option |
| Someone vetoes | Needs majority to override (3/5, 4/7, etc.) |
| No restaurants match | Settle widens radius or relaxes one filter |
| Group rejects verdict | Second pick served, no re-voting |

---

## Phase 2 — Activities
- Movies (Fandango API)
- Bars / nightlife
- Events (Eventbrite API)
- Same preference flow adapted per category

## Phase 3 — Trips
- Weekend getaways
- Day trips
- Multi-day planning
- Airbnb / hotel integrations

## Phase 4 — iMessage Plugin
- Condensed version of Food flow
- Lives inside existing iMessage group threads
- No app switch required
- Pulls from existing Settle preference profiles

---

## Tech Stack (Recommended)
- **Frontend**: React Native (iOS + Android from one codebase)
- **Backend**: Node.js / Express or Python / FastAPI
- **AI**: Claude API (Anthropic) for decision synthesis and copy generation
- **Database**: PostgreSQL (user data, preferences, decision history)
- **APIs**: Google Places, Yelp Fusion, OpenTable, Resy
- **Push Notifications**: Firebase Cloud Messaging
- **Auth**: Phone number (SMS OTP) — no email friction

---

## MVP Scope (Smallest Shippable Version)
To validate the core loop before building everything:

1. Create a food decision
2. Share a link (no app required for group members — web-based input)
3. AI picks a restaurant
4. Show the result

No booking integration, no accounts, no override system.
Just: does the core decision loop feel good?

---

## Metrics That Matter
- **Time to verdict**: target under 3 minutes from decision created
- **Completion rate**: % of decisions that reach a verdict (not abandoned)
- **Booking conversion**: % of verdicts that result in a booking
- **Group size average**: proxy for virality (bigger groups = more installs)
- **Return rate**: % of users who start a 2nd decision within 7 days
