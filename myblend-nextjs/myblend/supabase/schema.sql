-- MyBlend PostgreSQL schema for Supabase
-- Run this in Supabase SQL Editor after enabling email/password Auth.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Alex',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  icon text,
  description text
);

create table if not exists public.blends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id),
  name text not null,
  description text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  favorite boolean not null default false,
  archived boolean not null default false
);

create table if not exists public.blend_versions (
  id uuid primary key default gen_random_uuid(),
  blend_id uuid not null references public.blends(id) on delete cascade,
  version_number integer not null check (version_number > 0),
  version_name text not null,
  notes text,
  preparation text,
  created_at timestamptz not null default now(),
  is_best_version boolean not null default false,
  unique(blend_id, version_number)
);

create table if not exists public.ingredients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  category text,
  brand text,
  default_unit text,
  created_at timestamptz not null default now()
);

create table if not exists public.blend_ingredients (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.blend_versions(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id),
  amount numeric(12,3) not null default 0,
  unit text not null,
  preparation_note text,
  sort_order integer not null default 0
);

create table if not exists public.experiments (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.blend_versions(id) on delete cascade,
  experiment_number integer not null default 1,
  created_at timestamptz not null default now(),
  overall_rating numeric(3,1) not null check (overall_rating between 0 and 10),
  notes text,
  sweetness numeric(3,1) check (sweetness between 0 and 10),
  bitterness numeric(3,1) check (bitterness between 0 and 10),
  strength numeric(3,1) check (strength between 0 and 10),
  creaminess numeric(3,1) check (creaminess between 0 and 10),
  acidity numeric(3,1) check (acidity between 0 and 10),
  aroma numeric(3,1) check (aroma between 0 and 10),
  richness numeric(3,1) check (richness between 0 and 10),
  refreshing numeric(3,1) check (refreshing between 0 and 10),
  texture numeric(3,1) check (texture between 0 and 10),
  unique(version_id, experiment_number)
);

create table if not exists public.taste_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  sweetness numeric(3,1) default 5,
  strength numeric(3,1) default 5,
  creaminess numeric(3,1) default 5,
  richness numeric(3,1) default 5,
  refreshing numeric(3,1) default 5,
  bitterness numeric(3,1) default 5,
  acidity numeric(3,1) default 5,
  aroma numeric(3,1) default 5,
  texture numeric(3,1) default 5,
  updated_at timestamptz not null default now()
);

create table if not exists public.pantry_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id),
  quantity numeric(12,3) not null default 0,
  unit text not null,
  expiry_date date,
  low_stock_threshold numeric(12,3) not null default 0
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  experiment_id uuid not null references public.experiments(id) on delete cascade,
  recommendation_type text not null,
  message text not null,
  created_at timestamptz not null default now(),
  dismissed boolean not null default false
);

create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  blend_id uuid references public.blends(id) on delete cascade,
  version_id uuid references public.blend_versions(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (blend_id is not null or version_id is not null)
);

create index if not exists blends_user_id_idx on public.blends(user_id);
create index if not exists blend_versions_blend_id_idx on public.blend_versions(blend_id);
create index if not exists ingredients_user_id_idx on public.ingredients(user_id);
create index if not exists experiments_version_id_idx on public.experiments(version_id);
create index if not exists pantry_items_user_id_idx on public.pantry_items(user_id);
create index if not exists recommendations_experiment_id_idx on public.recommendations(experiment_id);

insert into public.categories(name,slug,icon,description) values
('Coffee','coffee','☕','Coffee experiments and espresso-based drinks.'),
('Matcha','matcha','🍵','Matcha, milk and layered tea experiments.'),
('Tea','tea','🫖','Tea-based blends and infusions.'),
('Boba','boba','🧋','Milk tea and tapioca-based experiments.'),
('Milk Drinks','milk-drinks','🥛','Creamy drinks built around milk.'),
('Smoothies','smoothies','🍓','Fruit-forward blended drinks.'),
('Mocktails','mocktails','🍹','Alcohol-free mixed drinks.'),
('Juices','juices','🧃','Fresh juice combinations.'),
('Other','other','🥤','Everything else.')
on conflict (slug) do nothing;

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.blends enable row level security;
alter table public.blend_versions enable row level security;
alter table public.ingredients enable row level security;
alter table public.blend_ingredients enable row level security;
alter table public.experiments enable row level security;
alter table public.taste_profiles enable row level security;
alter table public.pantry_items enable row level security;
alter table public.recommendations enable row level security;
alter table public.favorites enable row level security;

-- Profiles
create policy "profiles_self_select" on public.profiles for select using (id = auth.uid());
create policy "profiles_self_insert" on public.profiles for insert with check (id = auth.uid());
create policy "profiles_self_update" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- Blends
create policy "blends_owner_all" on public.blends for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Versions inherit ownership through blend
create policy "versions_owner_all" on public.blend_versions for all
using (exists (select 1 from public.blends b where b.id = blend_id and b.user_id = auth.uid()))
with check (exists (select 1 from public.blends b where b.id = blend_id and b.user_id = auth.uid()));

-- Ingredients
create policy "ingredients_owner_all" on public.ingredients for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Blend ingredients inherit through version -> blend
create policy "blend_ingredients_owner_all" on public.blend_ingredients for all
using (exists (select 1 from public.blend_versions v join public.blends b on b.id=v.blend_id where v.id=version_id and b.user_id=auth.uid()))
with check (exists (select 1 from public.blend_versions v join public.blends b on b.id=v.blend_id where v.id=version_id and b.user_id=auth.uid()));

-- Experiments inherit through version -> blend
create policy "experiments_owner_all" on public.experiments for all
using (exists (select 1 from public.blend_versions v join public.blends b on b.id=v.blend_id where v.id=version_id and b.user_id=auth.uid()))
with check (exists (select 1 from public.blend_versions v join public.blends b on b.id=v.blend_id where v.id=version_id and b.user_id=auth.uid()));

-- Taste profile
create policy "taste_profiles_owner_all" on public.taste_profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Pantry
create policy "pantry_owner_all" on public.pantry_items for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Recommendations inherit via experiment
create policy "recommendations_owner_all" on public.recommendations for all
using (exists (select 1 from public.experiments e join public.blend_versions v on v.id=e.version_id join public.blends b on b.id=v.blend_id where e.id=experiment_id and b.user_id=auth.uid()))
with check (exists (select 1 from public.experiments e join public.blend_versions v on v.id=e.version_id join public.blends b on b.id=v.blend_id where e.id=experiment_id and b.user_id=auth.uid()));

-- Favorites
create policy "favorites_owner_all" on public.favorites for all using (user_id = auth.uid()) with check (user_id = auth.uid());
