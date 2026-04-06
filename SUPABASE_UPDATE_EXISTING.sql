-- Moja zahrada
-- Bezpecna migracia pre uz existujuci Supabase projekt.
-- Skript je idempotentny: mozes ho spustit aj opakovane.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  display_name text not null default '',
  avatar_path text not null default '',
  preferences jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text not null,
  parent_client_id text not null default '',
  name text not null default '',
  node_type text not null default 'kind',
  group_name text not null default '',
  order_index integer not null default 0,
  color text not null default '#7e9f4b',
  image_path text not null default '',
  notes text not null default '',
  recommended_sowing_window text not null default '',
  sowed_at text not null default '',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text not null,
  category_client_id text not null default '',
  entry_kind text not null default 'detail',
  card_type text not null default 'variety',
  name text not null default '',
  detail_type text not null default '',
  status text not null default '',
  notes text not null default '',
  place text not null default '',
  places jsonb not null default '[]'::jsonb,
  top boolean not null default false,
  rating integer not null default 0,
  image_path text not null default '',
  images jsonb not null default '[]'::jsonb,
  sowing_window text not null default '',
  sowing_window_auto boolean not null default false,
  sowed_at date,
  transplanted_at date,
  harvested_at date,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text not null,
  text text not null default '',
  due_on date,
  done boolean not null default false,
  source text not null default '',
  linked_category_ids jsonb not null default '[]'::jsonb,
  linked_variety_id text not null default '',
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  client_id text not null,
  title text not null default '',
  body text not null default '',
  entry_type text not null default 'note',
  entry_at timestamp not null default now(),
  mood text not null default '',
  place text not null default '',
  tags jsonb not null default '[]'::jsonb,
  weather jsonb not null default '{}'::jsonb,
  linked_category_ids jsonb not null default '[]'::jsonb,
  linked_variety_id text not null default '',
  linked_entity_name text not null default '',
  image_path text not null default '',
  images jsonb not null default '[]'::jsonb,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table if exists public.profiles
  add column if not exists email text,
  add column if not exists display_name text,
  add column if not exists avatar_path text,
  add column if not exists preferences jsonb,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.profiles
set
  email = coalesce(email, ''),
  display_name = coalesce(display_name, ''),
  avatar_path = coalesce(avatar_path, ''),
  preferences = case
    when preferences is null or jsonb_typeof(preferences) <> 'object' then '{}'::jsonb
    else preferences
  end,
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()));

alter table public.profiles alter column email set default '';
alter table public.profiles alter column display_name set default '';
alter table public.profiles alter column avatar_path set default '';
alter table public.profiles alter column preferences set default '{}'::jsonb;
alter table public.profiles alter column created_at set default timezone('utc', now());
alter table public.profiles alter column updated_at set default timezone('utc', now());
alter table public.profiles alter column email set not null;
alter table public.profiles alter column display_name set not null;
alter table public.profiles alter column avatar_path set not null;
alter table public.profiles alter column preferences set not null;
alter table public.profiles alter column created_at set not null;
alter table public.profiles alter column updated_at set not null;

alter table if exists public.categories
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists client_id text,
  add column if not exists parent_client_id text,
  add column if not exists name text,
  add column if not exists node_type text,
  add column if not exists group_name text,
  add column if not exists order_index integer,
  add column if not exists color text,
  add column if not exists image_path text,
  add column if not exists notes text,
  add column if not exists recommended_sowing_window text,
  add column if not exists sowed_at text,
  add column if not exists data jsonb,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.categories
set
  parent_client_id = coalesce(parent_client_id, ''),
  name = coalesce(name, ''),
  node_type = coalesce(nullif(node_type, ''), 'kind'),
  group_name = coalesce(group_name, ''),
  order_index = coalesce(order_index, 0),
  color = coalesce(nullif(color, ''), '#7e9f4b'),
  image_path = coalesce(image_path, ''),
  notes = coalesce(notes, ''),
  recommended_sowing_window = coalesce(recommended_sowing_window, ''),
  sowed_at = coalesce(sowed_at, ''),
  data = case
    when data is null or jsonb_typeof(data) <> 'object' then '{}'::jsonb
    else data
  end,
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()));

alter table public.categories alter column parent_client_id set default '';
alter table public.categories alter column name set default '';
alter table public.categories alter column node_type set default 'kind';
alter table public.categories alter column group_name set default '';
alter table public.categories alter column order_index set default 0;
alter table public.categories alter column color set default '#7e9f4b';
alter table public.categories alter column image_path set default '';
alter table public.categories alter column notes set default '';
alter table public.categories alter column recommended_sowing_window set default '';
alter table public.categories alter column sowed_at set default '';
alter table public.categories alter column data set default '{}'::jsonb;
alter table public.categories alter column created_at set default timezone('utc', now());
alter table public.categories alter column updated_at set default timezone('utc', now());

alter table if exists public.cards
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists client_id text,
  add column if not exists category_client_id text,
  add column if not exists entry_kind text,
  add column if not exists card_type text,
  add column if not exists name text,
  add column if not exists detail_type text,
  add column if not exists status text,
  add column if not exists notes text,
  add column if not exists place text,
  add column if not exists places jsonb,
  add column if not exists top boolean,
  add column if not exists rating integer,
  add column if not exists image_path text,
  add column if not exists images jsonb,
  add column if not exists sowing_window text,
  add column if not exists sowing_window_auto boolean,
  add column if not exists sowed_at date,
  add column if not exists transplanted_at date,
  add column if not exists harvested_at date,
  add column if not exists data jsonb,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.cards
set
  category_client_id = coalesce(category_client_id, ''),
  entry_kind = coalesce(nullif(entry_kind, ''), 'detail'),
  card_type = coalesce(nullif(card_type, ''), 'variety'),
  name = coalesce(name, ''),
  detail_type = coalesce(detail_type, ''),
  status = coalesce(status, ''),
  notes = coalesce(notes, ''),
  place = coalesce(place, ''),
  places = case
    when places is null or jsonb_typeof(places) <> 'array' then '[]'::jsonb
    else places
  end,
  top = coalesce(top, false),
  rating = coalesce(rating, 0),
  image_path = coalesce(image_path, ''),
  images = case
    when images is null or jsonb_typeof(images) <> 'array' then '[]'::jsonb
    else images
  end,
  sowing_window = coalesce(sowing_window, ''),
  sowing_window_auto = coalesce(sowing_window_auto, false),
  data = case
    when data is null or jsonb_typeof(data) <> 'object' then '{}'::jsonb
    else data
  end,
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()));

alter table public.cards alter column category_client_id set default '';
alter table public.cards alter column entry_kind set default 'detail';
alter table public.cards alter column card_type set default 'variety';
alter table public.cards alter column name set default '';
alter table public.cards alter column detail_type set default '';
alter table public.cards alter column status set default '';
alter table public.cards alter column notes set default '';
alter table public.cards alter column place set default '';
alter table public.cards alter column places set default '[]'::jsonb;
alter table public.cards alter column top set default false;
alter table public.cards alter column rating set default 0;
alter table public.cards alter column image_path set default '';
alter table public.cards alter column images set default '[]'::jsonb;
alter table public.cards alter column sowing_window set default '';
alter table public.cards alter column sowing_window_auto set default false;
alter table public.cards alter column data set default '{}'::jsonb;
alter table public.cards alter column created_at set default timezone('utc', now());
alter table public.cards alter column updated_at set default timezone('utc', now());

alter table if exists public.tasks
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists client_id text,
  add column if not exists text text,
  add column if not exists due_on date,
  add column if not exists done boolean,
  add column if not exists source text,
  add column if not exists linked_category_ids jsonb,
  add column if not exists linked_variety_id text,
  add column if not exists data jsonb,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.tasks
set
  text = coalesce(text, ''),
  done = coalesce(done, false),
  source = coalesce(source, ''),
  linked_category_ids = case
    when linked_category_ids is null or jsonb_typeof(linked_category_ids) <> 'array' then '[]'::jsonb
    else linked_category_ids
  end,
  linked_variety_id = coalesce(linked_variety_id, ''),
  data = case
    when data is null or jsonb_typeof(data) <> 'object' then '{}'::jsonb
    else data
  end,
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()));

alter table public.tasks alter column text set default '';
alter table public.tasks alter column done set default false;
alter table public.tasks alter column source set default '';
alter table public.tasks alter column linked_category_ids set default '[]'::jsonb;
alter table public.tasks alter column linked_variety_id set default '';
alter table public.tasks alter column data set default '{}'::jsonb;
alter table public.tasks alter column created_at set default timezone('utc', now());
alter table public.tasks alter column updated_at set default timezone('utc', now());

alter table if exists public.journal_entries
  add column if not exists user_id uuid references auth.users(id) on delete cascade,
  add column if not exists client_id text,
  add column if not exists title text,
  add column if not exists body text,
  add column if not exists entry_type text,
  add column if not exists entry_at timestamp,
  add column if not exists mood text,
  add column if not exists place text,
  add column if not exists tags jsonb,
  add column if not exists weather jsonb,
  add column if not exists linked_category_ids jsonb,
  add column if not exists linked_variety_id text,
  add column if not exists linked_entity_name text,
  add column if not exists image_path text,
  add column if not exists images jsonb,
  add column if not exists data jsonb,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.journal_entries
set
  title = coalesce(title, ''),
  body = coalesce(body, ''),
  entry_type = coalesce(nullif(entry_type, ''), 'note'),
  entry_at = coalesce(entry_at, now()),
  mood = coalesce(mood, ''),
  place = coalesce(place, ''),
  tags = case
    when tags is null or jsonb_typeof(tags) <> 'array' then '[]'::jsonb
    else tags
  end,
  weather = case
    when weather is null or jsonb_typeof(weather) <> 'object' then '{}'::jsonb
    else weather
  end,
  linked_category_ids = case
    when linked_category_ids is null or jsonb_typeof(linked_category_ids) <> 'array' then '[]'::jsonb
    else linked_category_ids
  end,
  linked_variety_id = coalesce(linked_variety_id, ''),
  linked_entity_name = coalesce(linked_entity_name, ''),
  image_path = coalesce(image_path, ''),
  images = case
    when images is null or jsonb_typeof(images) <> 'array' then '[]'::jsonb
    else images
  end,
  data = case
    when data is null or jsonb_typeof(data) <> 'object' then '{}'::jsonb
    else data
  end,
  created_at = coalesce(created_at, timezone('utc', now())),
  updated_at = coalesce(updated_at, timezone('utc', now()));

alter table public.journal_entries alter column title set default '';
alter table public.journal_entries alter column body set default '';
alter table public.journal_entries alter column entry_type set default 'note';
alter table public.journal_entries alter column entry_at set default now();
alter table public.journal_entries alter column mood set default '';
alter table public.journal_entries alter column place set default '';
alter table public.journal_entries alter column tags set default '[]'::jsonb;
alter table public.journal_entries alter column weather set default '{}'::jsonb;
alter table public.journal_entries alter column linked_category_ids set default '[]'::jsonb;
alter table public.journal_entries alter column linked_variety_id set default '';
alter table public.journal_entries alter column linked_entity_name set default '';
alter table public.journal_entries alter column image_path set default '';
alter table public.journal_entries alter column images set default '[]'::jsonb;
alter table public.journal_entries alter column data set default '{}'::jsonb;
alter table public.journal_entries alter column created_at set default timezone('utc', now());
alter table public.journal_entries alter column updated_at set default timezone('utc', now());

create unique index if not exists categories_user_client_unique
  on public.categories (user_id, client_id);

create unique index if not exists cards_user_client_unique
  on public.cards (user_id, client_id);

create unique index if not exists tasks_user_client_unique
  on public.tasks (user_id, client_id);

create unique index if not exists journal_entries_user_client_unique
  on public.journal_entries (user_id, client_id);

create index if not exists categories_user_parent_idx
  on public.categories (user_id, parent_client_id, order_index);

create index if not exists cards_user_category_idx
  on public.cards (user_id, category_client_id, card_type);

create index if not exists tasks_user_due_idx
  on public.tasks (user_id, due_on, done);

create index if not exists journal_entries_user_entry_at_idx
  on public.journal_entries (user_id, entry_at desc);

do $$
begin
  if to_regclass('public.profiles') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_preferences_is_object'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_preferences_is_object
      check (jsonb_typeof(preferences) = 'object');
  end if;

  if to_regclass('public.categories') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'categories_node_type_valid'
      and conrelid = 'public.categories'::regclass
  ) then
    alter table public.categories
      add constraint categories_node_type_valid
      check (node_type in ('parent', 'kind'));
  end if;

  if to_regclass('public.categories') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'categories_data_is_object'
      and conrelid = 'public.categories'::regclass
  ) then
    alter table public.categories
      add constraint categories_data_is_object
      check (jsonb_typeof(data) = 'object');
  end if;

  if to_regclass('public.cards') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'cards_places_is_array'
      and conrelid = 'public.cards'::regclass
  ) then
    alter table public.cards
      add constraint cards_places_is_array
      check (jsonb_typeof(places) = 'array');
  end if;

  if to_regclass('public.cards') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'cards_images_is_array'
      and conrelid = 'public.cards'::regclass
  ) then
    alter table public.cards
      add constraint cards_images_is_array
      check (jsonb_typeof(images) = 'array');
  end if;

  if to_regclass('public.cards') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'cards_data_is_object'
      and conrelid = 'public.cards'::regclass
  ) then
    alter table public.cards
      add constraint cards_data_is_object
      check (jsonb_typeof(data) = 'object');
  end if;

  if to_regclass('public.tasks') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'tasks_linked_category_ids_is_array'
      and conrelid = 'public.tasks'::regclass
  ) then
    alter table public.tasks
      add constraint tasks_linked_category_ids_is_array
      check (jsonb_typeof(linked_category_ids) = 'array');
  end if;

  if to_regclass('public.tasks') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'tasks_data_is_object'
      and conrelid = 'public.tasks'::regclass
  ) then
    alter table public.tasks
      add constraint tasks_data_is_object
      check (jsonb_typeof(data) = 'object');
  end if;

  if to_regclass('public.journal_entries') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'journal_entries_tags_is_array'
      and conrelid = 'public.journal_entries'::regclass
  ) then
    alter table public.journal_entries
      add constraint journal_entries_tags_is_array
      check (jsonb_typeof(tags) = 'array');
  end if;

  if to_regclass('public.journal_entries') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'journal_entries_weather_is_object'
      and conrelid = 'public.journal_entries'::regclass
  ) then
    alter table public.journal_entries
      add constraint journal_entries_weather_is_object
      check (jsonb_typeof(weather) = 'object');
  end if;

  if to_regclass('public.journal_entries') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'journal_entries_linked_category_ids_is_array'
      and conrelid = 'public.journal_entries'::regclass
  ) then
    alter table public.journal_entries
      add constraint journal_entries_linked_category_ids_is_array
      check (jsonb_typeof(linked_category_ids) = 'array');
  end if;

  if to_regclass('public.journal_entries') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'journal_entries_images_is_array'
      and conrelid = 'public.journal_entries'::regclass
  ) then
    alter table public.journal_entries
      add constraint journal_entries_images_is_array
      check (jsonb_typeof(images) = 'array');
  end if;

  if to_regclass('public.journal_entries') is not null and not exists (
    select 1
    from pg_constraint
    where conname = 'journal_entries_data_is_object'
      and conrelid = 'public.journal_entries'::regclass
  ) then
    alter table public.journal_entries
      add constraint journal_entries_data_is_object
      check (jsonb_typeof(data) = 'object');
  end if;
end
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
before update on public.categories
for each row
execute function public.set_updated_at();

drop trigger if exists set_cards_updated_at on public.cards;
create trigger set_cards_updated_at
before update on public.cards
for each row
execute function public.set_updated_at();

drop trigger if exists set_tasks_updated_at on public.tasks;
create trigger set_tasks_updated_at
before update on public.tasks
for each row
execute function public.set_updated_at();

drop trigger if exists set_journal_entries_updated_at on public.journal_entries;
create trigger set_journal_entries_updated_at
before update on public.journal_entries
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      ''
    )
  )
  on conflict (id) do update
    set email = excluded.email,
        display_name = case
          when public.profiles.display_name = '' then excluded.display_name
          else public.profiles.display_name
        end,
        updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

insert into public.profiles (id, email, display_name)
select
  users.id,
  coalesce(users.email, ''),
  coalesce(
    users.raw_user_meta_data ->> 'display_name',
    users.raw_user_meta_data ->> 'full_name',
    ''
  )
from auth.users as users
on conflict (id) do update
  set email = excluded.email,
      updated_at = timezone('utc', now());

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.cards enable row level security;
alter table public.tasks enable row level security;
alter table public.journal_entries enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "categories_select_own" on public.categories;
create policy "categories_select_own"
on public.categories
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "categories_insert_own" on public.categories;
create policy "categories_insert_own"
on public.categories
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "categories_update_own" on public.categories;
create policy "categories_update_own"
on public.categories
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "categories_delete_own" on public.categories;
create policy "categories_delete_own"
on public.categories
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "cards_select_own" on public.cards;
create policy "cards_select_own"
on public.cards
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "cards_insert_own" on public.cards;
create policy "cards_insert_own"
on public.cards
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "cards_update_own" on public.cards;
create policy "cards_update_own"
on public.cards
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "cards_delete_own" on public.cards;
create policy "cards_delete_own"
on public.cards
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "tasks_select_own" on public.tasks;
create policy "tasks_select_own"
on public.tasks
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "tasks_insert_own" on public.tasks;
create policy "tasks_insert_own"
on public.tasks
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "tasks_update_own" on public.tasks;
create policy "tasks_update_own"
on public.tasks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "tasks_delete_own" on public.tasks;
create policy "tasks_delete_own"
on public.tasks
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists "journal_entries_select_own" on public.journal_entries;
create policy "journal_entries_select_own"
on public.journal_entries
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "journal_entries_insert_own" on public.journal_entries;
create policy "journal_entries_insert_own"
on public.journal_entries
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "journal_entries_update_own" on public.journal_entries;
create policy "journal_entries_update_own"
on public.journal_entries
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "journal_entries_delete_own" on public.journal_entries;
create policy "journal_entries_delete_own"
on public.journal_entries
for delete
to authenticated
using (auth.uid() = user_id);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'mojazahrada-images',
  'mojazahrada-images',
  false,
  104857600,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "storage_select_own_mojazahrada_images" on storage.objects;
create policy "storage_select_own_mojazahrada_images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'mojazahrada-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "storage_insert_own_mojazahrada_images" on storage.objects;
create policy "storage_insert_own_mojazahrada_images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'mojazahrada-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "storage_update_own_mojazahrada_images" on storage.objects;
create policy "storage_update_own_mojazahrada_images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'mojazahrada-images'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'mojazahrada-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "storage_delete_own_mojazahrada_images" on storage.objects;
create policy "storage_delete_own_mojazahrada_images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'mojazahrada-images'
  and auth.uid()::text = (storage.foldername(name))[1]
);
