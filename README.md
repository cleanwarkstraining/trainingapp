# Clean Warks Training

A multilingual Progressive Web App for training Clean Warks cleaning workers. Built on free-tier infrastructure (Vercel + Supabase + YouTube + Web Speech API). Supports 8 languages: English, Hindi, Malayalam, Tamil, Bengali, Nepali, Assamese, and Odia.

## Quick Start

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (optional for Phase 1)

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

**Demo PIN: `1234`**

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add environment variables from `.env.example`
4. Deploy

## Set Up Supabase (Phase 2)

1. Create a free project at [supabase.com](https://supabase.com)
2. Run the migration: `supabase/migrations/20240507000001_initial_schema.sql`
3. Run the seed: `supabase/seed.sql`
4. Copy the project URL and anon key to `.env.local`

## What's in Phase 1

- Language picker with 8 languages (EN, HI, ML translated; 5 others are English placeholders)
- Profile picker with 6 mock workers
- PIN authentication (hardcoded `1234`)
- Home dashboard with progress ring, streak, badges
- Module library with 4 categories (8 modules, 1 fully realized)
- Complete Bathroom Standard module: Watch / Practice (7 steps) / Checklist (8 items) / Quiz (3 questions) / Certificate
- Field Mode with dark theme, quick actions, cloth color reference, QR scan button (stub)
- Profile page with language switcher, audio test, logout
- ListenButton with TTS + MP3 + "Audio coming soon" fallback
- PWA manifest and service worker (production only)
- Worker progress saved to localStorage

## What's Mocked in Phase 1

- **Auth**: Hardcoded PIN check (`1234`), no real Supabase auth
- **Progress sync**: localStorage only, no backend sync
- **Modules**: Only Bathroom Standard has full content; other 7 are locked placeholders
- **Translations**: EN, HI, ML have real translations; TA, BN, NE, AS, OR use English placeholders
- **QR scanner**: Button exists but does nothing
- **Admin panel**: Not built yet

## What Phase 2 Will Add

- Admin panel for supervisors (worker management, module CRUD, translation editor)
- Real Supabase auth with bcrypt-hashed PINs
- Progress sync to Supabase
- Pre-recorded MP3 upload for Malayalam, Assamese, Odia audio
- Full content for all 8 modules
- Translations for Tamil, Bengali, Nepali
- QR code scanner for room-specific procedures

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS 3.4
- next-intl 3.x (i18n)
- @ducanh2912/next-pwa (service worker)
- Supabase JS client 2.x (Phase 2)
- lucide-react (icons)
- pnpm (package manager)

## Project Structure

```
app/(worker)/          # Worker app routes
  page.tsx             # Language picker
  login/               # Profile picker + PIN
  home/                # Dashboard
  modules/             # Module library + flows
  field/               # Field Mode (dark theme)
  me/                  # Profile + settings
components/worker/     # Shared UI components
lib/i18n/              # Languages, speech, translations
lib/data/              # Mock modules and workers
supabase/              # Migration SQL + seed data
```
