# Clean Warks Training System — Architecture & Handoff

A scalable, multilingual training platform for cleaning workers, built on **free-tier infrastructure**. Total monthly cost at 100 workers: ₹0.

---

## 1. The thinking behind the design

This is not an LMS. It's three distinct products sharing one backend:

1. **Onboarding mode** — guided sequential learning, used in the first 1–2 weeks.
2. **Field Mode** — the killer feature. Used forever, opens in 2 taps, closes in 60 seconds.
3. **Admin / CMS** — for you and supervisors. Different physics — built for editing.

Most training platforms collapse these into "the app with filters." That's the wrong instinct. Workers in onboarding need slow, confidence-building flow. Workers on-site at 11am with one wet glove need a chemical ratio in 5 seconds. The interfaces should feel different in the hand.

### Design principles that drive every screen

- **Thumb test** — every screen passes this: can a worker who can't read English or Hindi well still complete the action using only icons, colours, photos, and audio? Text is decoration that confirms what the icons already said.
- **Cloth colour code is the visual spine** — Red toilet, Yellow general, Blue glass, Green kitchen, White high-touch. Industry-standard housekeeping. Becomes a recurring motif (chips, borders, badges) so workers recognise screens before reading them.
- **Audio is primary, not optional** — every step, every checklist item, every warning has a Listen button. Browser TTS handles English/Hindi/Tamil/Bengali/Nepali for free. Malayalam needs pre-recorded MP3s (browser TTS is rough — you record once on your phone).
- **Offline-first** — service worker pre-caches assigned modules on Wi-Fi. Worker entering a basement parking with no signal still has everything.

---

## 2. The zero-cost stack

| Layer | Service | Free tier limit | Your usage at 100 workers |
|---|---|---|---|
| Hosting | Vercel | Unlimited personal projects, 100 GB bandwidth/mo | Negligible |
| Backend (DB, auth, storage) | Supabase | 500 MB DB, 1 GB storage, 50K MAU | ~5 MB DB, ~200 MB storage |
| Video | YouTube Unlisted | Unlimited | 30–60 short modules |
| Audio (English, Hindi, Tamil, Bengali, Nepali) | Web Speech API on device | Free, unlimited | Runs on the phone |
| Audio (Malayalam) | Pre-recorded MP3s in Supabase Storage | Inside 1 GB free | ~50 MB total |
| Domain | Optional, e.g. `learn.cleanwarks.com` via Namecheap | ~₹600/year (if you want a vanity URL) | Optional |

**Auth: profile picker + 4-digit PIN.** No SMS, no OTP, no cost. Supervisor creates worker profiles with photo + name. On first open, worker taps their face from a grid and sets a PIN. Familiar (it's how Netflix works), accessible to non-readers, and free.

---

## 3. Folder structure

```
cleanwarks-training/
├── app/                              # Next.js 14 App Router
│   ├── (worker)/                     # Worker app routes
│   │   ├── layout.tsx                # PWA shell, language provider
│   │   ├── page.tsx                  # Home dashboard
│   │   ├── login/page.tsx            # Profile picker + PIN
│   │   ├── modules/
│   │   │   ├── page.tsx              # Module library
│   │   │   └── [slug]/
│   │   │       ├── page.tsx          # Module detail (Watch tab)
│   │   │       ├── practice/page.tsx
│   │   │       ├── checklist/page.tsx
│   │   │       └── quiz/page.tsx
│   │   ├── field/page.tsx            # Field Mode
│   │   ├── field/[room]/page.tsx     # QR-scanned room view
│   │   └── me/page.tsx               # Profile, language, logout
│   ├── (admin)/admin/                # Admin CMS (separate auth)
│   │   ├── layout.tsx
│   │   ├── page.tsx                  # Dashboard
│   │   ├── workers/                  # CRUD workers, assign paths
│   │   ├── modules/                  # CRUD modules and steps
│   │   ├── translations/             # Side-by-side translation editor
│   │   └── analytics/                # Progress, weak spots
│   └── api/
│       ├── progress/route.ts         # POST progress, sync
│       └── tts/route.ts              # (optional) generate audio
├── components/
│   ├── worker/                       # PhoneFrame, ListenButton, etc.
│   ├── admin/
│   └── ui/                           # shadcn primitives
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── types.ts                  # Generated from schema
│   ├── i18n/
│   │   ├── config.ts                 # Available languages
│   │   ├── messages/                 # UI strings (ship in code)
│   │   │   ├── en.json
│   │   │   ├── ml.json
│   │   │   ├── hi.json
│   │   │   ├── ta.json
│   │   │   ├── bn.json
│   │   │   └── ne.json
│   │   └── speech.ts                 # SpeechSynthesis helpers
│   └── pwa/
│       └── register.ts               # Service worker registration
├── public/
│   ├── manifest.json                 # PWA manifest
│   ├── sw.js                         # Service worker (precache)
│   └── icons/
├── content/                          # Optional: seed/fallback content
│   └── modules/
│       └── bathroom-standard.json
├── supabase/
│   ├── migrations/                   # SQL migrations
│   └── seed.sql
├── next.config.js
├── tailwind.config.ts
└── package.json
```

**Why this structure:** worker and admin are sibling route groups, sharing components but with different auth gates. UI strings ship as JSON in `lib/i18n/messages/` — fast, no DB hit, cacheable. Content strings (module titles, step bodies) live in Supabase so supervisors can edit without a deploy.

---

## 4. Database schema

The schema separates **structure** from **translations** from **media** so that adding Bengali in 6 months means inserting rows, not changing tables.

```sql
-- =========================================
-- WORKERS & AUTH (no SMS, custom PIN auth)
-- =========================================
create table workers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  photo_url     text,
  role          text not null check (role in ('cleaner','team_lead','machine_op','supervisor')),
  language      text not null default 'en',
  state         text,                              -- KL, TN, WB, etc.
  pin_hash      text not null,                    -- bcrypt(4-digit pin + salt)
  active        boolean not null default true,
  created_at    timestamptz default now(),
  last_login    timestamptz
);

-- =========================================
-- CONTENT — modules, steps, checklist, quiz
-- =========================================
create table modules (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,             -- 'bathroom-standard'
  category      text not null,                    -- 'basics','rooms','machines','special'
  display_order int not null default 100,
  duration_min  int,
  required_role text[] default '{cleaner}',       -- which roles see this
  prereq_ids    uuid[] default '{}',              -- locked until these are complete
  video_url     text,                             -- YouTube unlisted URL
  cover_color   text default '#4B8EC8',
  published     boolean not null default false,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table module_translations (
  module_id     uuid references modules(id) on delete cascade,
  lang          text not null,
  title         text not null,
  description   text,
  audio_url     text,                             -- optional pre-recorded narration
  primary key (module_id, lang)
);

create table steps (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid references modules(id) on delete cascade,
  step_order    int not null,
  image_url     text,
  icon_name     text,                             -- lucide icon as fallback
  chip_label    text,                             -- '1:10', '5 min', 'RED'
  chip_color    text
);

create table step_translations (
  step_id       uuid references steps(id) on delete cascade,
  lang          text not null,
  title         text not null,
  body          text not null,
  audio_url     text,
  primary key (step_id, lang)
);

create table checklist_items (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid references modules(id) on delete cascade,
  item_order    int not null
);

create table checklist_translations (
  item_id       uuid references checklist_items(id) on delete cascade,
  lang          text not null,
  text          text not null,
  primary key (item_id, lang)
);

create table quiz_questions (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid references modules(id) on delete cascade,
  q_type        text not null check (q_type in ('image_choice','true_false')),
  image_url     text,
  correct_value text not null
);

create table quiz_options (
  id            uuid primary key default gen_random_uuid(),
  question_id   uuid references quiz_questions(id) on delete cascade,
  value         text not null,                    -- 'red','yellow' or 'true'/'false'
  image_url     text,                             -- optional image option
  color_hex     text                              -- for cloth-colour questions
);

create table quiz_translations (
  question_id   uuid references quiz_questions(id) on delete cascade,
  lang          text not null,
  question_text text not null,
  primary key (question_id, lang)
);

create table quiz_option_translations (
  option_id     uuid references quiz_options(id) on delete cascade,
  lang          text not null,
  label         text not null,
  primary key (option_id, lang)
);

-- =========================================
-- WORKER PROGRESS (per worker per module)
-- =========================================
create table worker_progress (
  worker_id     uuid references workers(id) on delete cascade,
  module_id     uuid references modules(id) on delete cascade,
  status        text not null default 'not_started'
                check (status in ('not_started','in_progress','completed')),
  stage         text default 'watch'
                check (stage in ('watch','practice','checklist','quiz','done')),
  quiz_score    int,
  started_at    timestamptz,
  completed_at  timestamptz,
  primary key (worker_id, module_id)
);

create table badges_awarded (
  worker_id     uuid references workers(id) on delete cascade,
  badge_slug    text not null,                    -- e.g. 'bathroom-certified'
  module_id     uuid references modules(id),
  awarded_at    timestamptz default now(),
  primary key (worker_id, badge_slug)
);

-- =========================================
-- REFERENCE TABLES
-- =========================================
create table chemicals (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,             -- 'R1','R2','R6'
  name_en       text not null,
  dilution      text,                             -- '1:10'
  hazard_level  text,                             -- 'low','medium','high'
  ppe_required  text[]
);

create table tools (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  cloth_color   text                              -- 'red','yellow','blue','green','white'
);

-- =========================================
-- ROW LEVEL SECURITY
-- =========================================
-- Workers can only read their own progress
alter table worker_progress enable row level security;
create policy "workers_own_progress"
  on worker_progress for all
  using (worker_id = auth.uid()::uuid);

-- All content is publicly readable (it's training, not secret)
-- but only admins can write
alter table modules enable row level security;
create policy "modules_read_all" on modules for select using (published = true);
create policy "modules_admin_write" on modules for all
  using (exists (select 1 from workers where id = auth.uid()::uuid and role = 'supervisor'));
```

**Why translations as separate tables instead of JSONB:** supervisors edit translations one row at a time in the admin panel. Separate rows mean they can edit one field without risk of corrupting the JSON for the whole module. They also let you query "which steps don't have a Tamil translation yet" with a simple LEFT JOIN.

---

## 5. The i18n architecture

### Two layers

**Layer A — UI strings** (buttons, labels, navigation): ship as JSON in the codebase.

```
lib/i18n/messages/en.json
lib/i18n/messages/ml.json
lib/i18n/messages/hi.json
lib/i18n/messages/ta.json    ← add this file = adds Tamil
lib/i18n/messages/bn.json
lib/i18n/messages/ne.json
```

These are static, fast, cacheable. Add a language by adding a JSON file. Use `next-intl` for the runtime.

**Layer B — Content strings** (module titles, step bodies, checklist items): live in Supabase translation tables. Editable by supervisors via the admin without redeploying.

### Adding a new language end-to-end

1. Add `lib/i18n/messages/ta.json` with all the UI keys translated.
2. Add `'ta'` to the `LANG_LIST` constant.
3. Open admin → Translations → select Tamil. The UI shows side-by-side: English source on the left, empty Tamil input on the right for every module/step/checklist/question.
4. Translate as time permits. The system gracefully falls back to English for anything not yet translated, with a small "needs translation" indicator visible only in admin.
5. For Tamil/Hindi/Bengali/Nepali audio: nothing to do, browser TTS handles it.
6. For Malayalam audio: record yourself once per step, upload MP3 to Supabase Storage, link in the translation row.

### Audio strategy in detail

```ts
// lib/i18n/speech.ts
export function speak(text: string, lang: string, audioUrl?: string) {
  // 1. If we have a pre-recorded MP3, play that (best quality).
  if (audioUrl) return new Audio(audioUrl).play();

  // 2. Otherwise use the browser's TTS engine for that language.
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANG_BCP47[lang]; // 'ml-IN', 'hi-IN', 'ta-IN', etc.
  u.rate = 0.92;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
```

This means audio Just Works in every language the worker's phone supports, and you can incrementally upgrade the most-watched modules to human-recorded audio over time.

---

## 6. Content authoring workflow

The admin you saw in the prototype (🖥 Admin tab) is the supervisor's home.

**Adding a new module — the supervisor's path:**

1. **Record the video on your phone.** 30 seconds to 3 minutes. Single take. Show, don't narrate — workers watch with sound off.
2. **Upload to YouTube as Unlisted.** Free, unlimited, auto-degrades quality on slow connections. Copy the URL.
3. **Open admin → Modules → Add module.** Paste the YouTube URL, pick a category, set duration estimate, choose which roles can see it.
4. **Write the steps in English first.** Big number, short title (≤5 words), one-sentence body. No paragraphs. Add a chip if there's a critical value (1:10, 5 min, RED).
5. **Add checklist items** — what the worker self-confirms before the quiz unlocks.
6. **Add 2–3 quiz questions** — image-based where possible, picking from the pre-loaded cloth/PPE/tool images.
7. **Save as draft.** The module is now visible in admin but not assigned to anyone.
8. **Open Translations panel.** Side-by-side editor. Either translate yourself or send the English source to a translator. Save. Repeat per language.
9. **Publish + assign.** Pick the worker roles or specific workers. Module appears in their app on their next open (or instantly if they're online).

**Time budget for a typical room module:** 25 minutes for the video, 30 minutes to write English content, 15 minutes per language for translation. ~2 hours to fully launch a new module in 3 languages.

---

## 7. Field Mode — the killer feature, in detail

This is the one you must not under-build. Onboarding is used twice; Field Mode is used twice a day, forever.

**Design pillars:**

- **Two-tap rule.** Worker opens app, taps Field Mode tile, is in. Always.
- **High contrast dark theme.** The worker is in a bright bathroom, not a desk chair. Dark UI + bright chips read in any lighting.
- **No text on first screen.** Search, big tile actions, recent items. Recognition over recall.
- **QR codes for rooms.** Print a small QR sticker for each unique room/site type. Worker scans → app opens directly to that room's procedure summary. (You generate these in admin; one QR per module.)
- **30-second refresher videos.** Cut your full 2-minute training video down to a 30-second "just the moves" version. This is what gets watched on-site.
- **Always-visible reference cards.** Cloth colour codes and chemical ratios are pinned at the top of Field Mode — no navigation required.

---

## 8. Offline-first PWA

```js
// public/sw.js — service worker
const CACHE = 'cw-v1';
const PRECACHE = ['/', '/login', '/field', '/manifest.json', '/icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
});

self.addEventListener('fetch', e => {
  // Network first for API; cache first for assets
  if (e.request.url.includes('/api/')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(cache => cache.put(e.request, copy));
      return r;
    })));
  }
});
```

**Pre-cache strategy:** when a worker logs in for the first time, the app pre-fetches every assigned module's step images and translations and caches them locally. The worker's daily learning works offline. YouTube videos remain online-only (they stream from YouTube), but for true offline you can pre-record a short MP4 backup per module and stash it in Supabase Storage.

**Progress queue:** completed quizzes, checked items, etc. queue in `localStorage` while offline and POST when the network returns.

---

## 9. Phased rollout — what to build when

### Phase 1 — Walking skeleton (week 1–2)
- Profile picker + PIN auth
- 3 modules in English only (PPE, Cloth Coding, Bathroom Standard)
- Watch / Practice / Checklist / Quiz / Done flow for those 3
- Field Mode with cloth colour reference + chemical ratio table
- Web Speech API audio
- Deploy to Vercel, test with 3 of your most patient workers

### Phase 2 — Multilingual + scale content (week 3–6)
- Add Malayalam and Hindi translations for the 3 modules
- Record Malayalam audio for the 3 modules (you, on your phone)
- Build 7 more modules: 4 rooms (Bedroom, Kitchen, Hall, Balcony), 1 machine (Vacuum), 2 special (Glass Polish, Mattress)
- Roll out to 10 workers
- Watch what they actually use

### Phase 3 — Admin + analytics (week 7–10)
- Build the supervisor admin: workers, modules CRUD, translation editor, basic analytics
- Add Tamil and Bengali translations
- QR codes for top 5 site types
- Roll out to all workers

### Phase 4 — Polish and growth (month 3+)
- Pre-recorded human audio replacing TTS for most-watched modules
- Nepali (your last language)
- WhatsApp integration: supervisor gets a message when worker completes a module or fails a quiz twice
- Attendance + GPS check-in (if you actually need it — most companies don't)
- Customer feedback loop: customer rates the cleaning, low scores trigger refresher assignments

### Phase 5 — Things you might never need
- AI voice translation
- Auto dubbing
- AI trainer chatbot
- All of these are tempting but solve problems you don't have. Build them when a worker explicitly asks for them, not before.

---

## 10. What this prototype demonstrates vs production gaps

| Demo prototype shows | Production needs |
|---|---|
| Profile picker UI | Real worker records in Supabase, photo upload from supervisor |
| PIN entry (1234) | bcrypt-hashed PIN, rate limiting on attempts |
| Live language switching | next-intl provider, JSON message files, fallback chain |
| Audio (browser TTS) | Same TTS + uploaded MP3s for Malayalam |
| Static demo modules | Full module CRUD in admin, content in Postgres |
| Mock quiz | Real quiz questions in DB, score persisted, badge auto-awarded |
| Mock progress | Worker progress synced via Supabase Realtime |
| Network toggle | Real service worker, IndexedDB for progress queue |
| Mock admin | Full admin app with proper auth (supervisor role check) |
| YouTube placeholder | Actual `<iframe>` embed of unlisted video |

---

## 11. Accounts you'll need to create

All free. Set up in this order on day 1:

1. **GitHub** — repo for the code.
2. **Vercel** — deploy from GitHub, free, custom domain optional.
3. **Supabase** — free tier project. Note the project URL and anon key.
4. **Google account for YouTube** — separate from your personal one if you prefer, for uploading training videos as Unlisted.
5. **Optional: Namecheap or your existing domain registrar** — `learn.cleanwarks.com` subdomain pointing to Vercel.

Total setup time: 30 minutes.

---

## 12. The honest trade-offs of going free-tier

**What you give up:**
- YouTube Unlisted videos are not truly private (anyone with URL can view). For cleaning training, this is fine.
- Browser TTS quality varies by Android version. A worker on a 2018 phone may get a robotic voice.
- Supabase free tier pauses your project after 7 days of zero activity — first request after that takes ~5 seconds to spin up. Set a free uptime monitor (UptimeRobot) to ping it daily.
- 50K MAU sounds infinite but if you ever cross 500 active workers, you'll need to move to Supabase Pro (₹2,000/month).

**What you don't give up:**
- Functionality. The prototype shows you can build everything described in your brief on this stack.
- Speed. PWA + Vercel edge + service worker cache = faster than most native apps.
- Control. Open source stack, your data in your Supabase, can move anywhere later.

---

## 13. One non-obvious recommendation

Build the admin first, even though it's less exciting than the worker app.

Most training platforms fail because the content goes stale. The supervisor stops adding new modules because the admin is painful, and within 6 months the whole thing is a museum exhibit. If editing a module is a 30-second job, content stays fresh. If it's a 30-minute job involving CSV imports and redeploys, content dies.

Spend the polish budget on the translation editor and the "add module in 5 minutes" flow. The worker app can be ugly for a while — a worker uses it because their job depends on it. The supervisor uses it because it's pleasant.
