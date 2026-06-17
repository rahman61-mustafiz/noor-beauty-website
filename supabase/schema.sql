-- =====================================================================
-- NOOR Beauty Salon — admin panel database schema (Supabase / Postgres)
-- Paste this whole file into Supabase > SQL Editor > New query > Run.
-- It creates the tables and security rules. (Data is seeded separately.)
-- =====================================================================

-- ---------- CONTENT TABLES ----------

-- Service categories (Hair Cut, Facial, Body Spa, Bridal Packages, ...)
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  subtitle    text,
  note        text,
  kind        text not null check (kind in ('simple','tiered','packages')),
  tier_labels text[] not null default '{}',
  sort_order  int not null default 0
);

-- Simple + tiered services. Use `price` for simple; `prices` for tiered.
create table if not exists services (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name        text not null,
  price       int,
  prices      int[] not null default '{}',
  note        text,
  sort_order  int not null default 0
);

-- Bundled packages (with an included-items list and a total price).
create table if not exists packages (
  id            uuid primary key default gen_random_uuid(),
  category_id   uuid not null references categories(id) on delete cascade,
  name          text not null,
  occasion      text,
  price         int not null,
  regular_price int,
  includes      text[] not null default '{}',
  note          text,
  sort_order    int not null default 0
);

-- Gallery images (file lives in the Storage bucket; src = its public URL).
create table if not exists gallery_images (
  id         uuid primary key default gen_random_uuid(),
  category   text not null,
  src        text not null,
  caption    text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Client testimonials shown on the homepage.
create table if not exists testimonials (
  id         uuid primary key default gen_random_uuid(),
  initials   text not null,
  name       text not null,
  service    text,
  rating     int not null default 5 check (rating between 1 and 5),
  body       text not null,
  sort_order int not null default 0
);

-- Single-row site settings (contact details, hours, socials, hero text).
create table if not exists site_settings (
  id            int primary key default 1 check (id = 1),
  name          text,
  full_name     text,
  tagline       text,
  description   text,
  phone         text,
  phone_display text,
  whatsapp      text,
  address       text,
  hours         text,
  facebook            text,
  instagram           text,
  hero_image          text,
  hero_video          text,
  meta_title          text,
  meta_description    text,
  google_verification text,
  updated_at          timestamptz not null default now()
);

-- ---------- BOOKINGS (from the public booking form) ----------
create table if not exists bookings (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  phone          text not null,
  service        text,
  message        text,
  preferred_date date,
  status         text not null default 'new' check (status in ('new','confirmed','done','cancelled')),
  created_at     timestamptz not null default now()
);

-- =====================================================================
-- ROW LEVEL SECURITY
-- Public site = read-only on content. Admin writes happen server-side
-- with the service_role key, which bypasses RLS. The booking form is the
-- only place the public is allowed to WRITE (insert a booking).
-- =====================================================================

alter table categories     enable row level security;
alter table services       enable row level security;
alter table packages       enable row level security;
alter table gallery_images enable row level security;
alter table testimonials   enable row level security;
alter table site_settings  enable row level security;
alter table bookings       enable row level security;

create policy "public read categories"     on categories     for select using (true);
create policy "public read services"        on services       for select using (true);
create policy "public read packages"        on packages       for select using (true);
create policy "public read gallery"         on gallery_images for select using (true);
create policy "public read testimonials"    on testimonials   for select using (true);
create policy "public read site_settings"   on site_settings  for select using (true);

-- Anyone can submit a booking; nobody (except the admin via service_role) can read them.
create policy "anyone can create a booking" on bookings for insert with check (true);
