-- =========================================
-- WORKERS & AUTH (no SMS, custom PIN auth)
-- =========================================
create table workers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  photo_url     text,
  role          text not null check (role in ('cleaner','team_lead','machine_op','supervisor')),
  language      text not null default 'en',
  state         text,
  pin_hash      text not null,
  active        boolean not null default true,
  created_at    timestamptz default now(),
  last_login    timestamptz
);

-- =========================================
-- CONTENT — modules, steps, checklist, quiz
-- =========================================
create table modules (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  category      text not null,
  display_order int not null default 100,
  duration_min  int,
  required_role text[] default '{cleaner}',
  prereq_ids    uuid[] default '{}',
  video_url     text,
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
  audio_url     text,
  primary key (module_id, lang)
);

create table steps (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid references modules(id) on delete cascade,
  step_order    int not null,
  image_url     text,
  icon_name     text,
  chip_label    text,
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
  value         text not null,
  image_url     text,
  color_hex     text
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
  badge_slug    text not null,
  module_id     uuid references modules(id),
  awarded_at    timestamptz default now(),
  primary key (worker_id, badge_slug)
);

-- =========================================
-- REFERENCE TABLES
-- =========================================
create table chemicals (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  name_en       text not null,
  dilution      text,
  hazard_level  text,
  ppe_required  text[]
);

create table tools (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  cloth_color   text
);

-- =========================================
-- ROW LEVEL SECURITY
-- =========================================
alter table worker_progress enable row level security;
create policy "workers_own_progress"
  on worker_progress for all
  using (worker_id = auth.uid()::uuid);

alter table modules enable row level security;
create policy "modules_read_all" on modules for select using (published = true);
create policy "modules_admin_write" on modules for all
  using (exists (select 1 from workers where id = auth.uid()::uuid and role = 'supervisor'));
