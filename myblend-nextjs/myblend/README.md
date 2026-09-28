# MyBlend

**Blend it. Rate it. Remember it.**

MyBlend is a portfolio-level personal drink experimentation lab. It combines a recipe journal, version history, experiment log, pantry tracker, taste profile, comparison mode, and data-driven recommendations.

## What changed from the original prototype

The attached HTML prototype used a compact mobile/localStorage experience with basic blend cards, simple ratings, pantry items, and variation modals. This rebuild keeps those useful concepts but redesigns the experience around a wider desktop workbench, persistent version timelines, recipe sheets, Blend DNA, analytics, comparison mode, one-variable experiments, and a deterministic recommendation engine.

The uploaded coffee site screenshot was treated strictly as visual direction: warm cream, espresso brown, caramel accents, editorial typography, premium cards, and coffee-shop warmth. MyBlend is intentionally **not** an e-commerce catalog.

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts
- React Hook Form / Zod ready
- Supabase PostgreSQL + Auth + Storage ready
- Deterministic recommendation engine with optional AI enhancement later

## Run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The app seeds a realistic demo dataset into `localStorage`, so it works without Supabase credentials.

## Supabase

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Run `supabase/schema.sql` in the Supabase SQL editor.
5. Add Auth providers as desired.
6. Replace demo persistence calls with Supabase queries using the included client/server helpers.

The schema enables Row Level Security so each authenticated user can access only their own recipes, versions, experiments, pantry, profile, favorites, and recommendations.

## Recommendation engine

The core engine is deterministic and continues to work when no AI key exists. It compares the latest experiment with prior versions, looks at lower taste dimensions, checks pantry availability, and recommends one or two focused next experiments. It uses cautious wording and does not claim causation from a single change.

Optional AI output can later transform the structured recommendation into more natural language without replacing the rule-based fallback.

## Main flows included

- Dashboard / Blend Lab
- Create Blend wizard
- My Blends with search, category filter, favorites, and sorting
- Blend detail with recipe sheet, Blend DNA, version timeline, change log, and comparison
- Create Variation without overwriting older versions
- Make Again / Experiment logging with 0–10 rating and taste sliders
- Deterministic recommendations
- Experiments history
- Pantry with low-stock and expiry indicators
- Insights with Recharts
- Settings / taste profile
- Responsive desktop sidebar + mobile bottom navigation
- Demo auth pages for future Supabase Auth wiring

## Portfolio note

For a portfolio presentation, the strongest story is the version-control metaphor: **recipe → experiment → observation → variation → better-informed next experiment**. That is the core product differentiator of MyBlend.
