-- Moja záhrada
-- Základná Supabase schéma + RLS + storage bucket
-- Script je pripravený tak, aby sa dal spustiť aj opakovane.

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
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_preferences_is_object check (jsonb_typeof(preferences) = 'object')
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
  updated_at timestamptz not null default timezone('utc', now()),
  constraint categories_user_client_unique unique (user_id, client_id),
  constraint categories_node_type_valid check (node_type in ('parent', 'kind')),
  constraint categories_data_is_object check (jsonb_typeof(data) = 'object')
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
  updated_at timestamptz not null default timezone('utc', now()),
  constraint cards_user_client_unique unique (user_id, client_id),
  constraint cards_places_is_array check (jsonb_typeof(places) = 'array'),
  constraint cards_images_is_array check (jsonb_typeof(images) = 'array'),
  constraint cards_data_is_object check (jsonb_typeof(data) = 'object')
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
  updated_at timestamptz not null default timezone('utc', now()),
  constraint tasks_user_client_unique unique (user_id, client_id),
  constraint tasks_linked_category_ids_is_array check (jsonb_typeof(linked_category_ids) = 'array'),
  constraint tasks_data_is_object check (jsonb_typeof(data) = 'object')
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
  updated_at timestamptz not null default timezone('utc', now()),
  constraint journal_entries_user_client_unique unique (user_id, client_id),
  constraint journal_entries_tags_is_array check (jsonb_typeof(tags) = 'array'),
  constraint journal_entries_weather_is_object check (jsonb_typeof(weather) = 'object'),
  constraint journal_entries_linked_category_ids_is_array check (jsonb_typeof(linked_category_ids) = 'array'),
  constraint journal_entries_images_is_array check (jsonb_typeof(images) = 'array'),
  constraint journal_entries_data_is_object check (jsonb_typeof(data) = 'object')
);

create index if not exists categories_user_parent_idx
  on public.categories (user_id, parent_client_id, order_index);

create index if not exists cards_user_category_idx
  on public.cards (user_id, category_client_id, card_type);

create index if not exists tasks_user_due_idx
  on public.tasks (user_id, due_on, done);

create index if not exists journal_entries_user_entry_at_idx
  on public.journal_entries (user_id, entry_at desc);

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
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'video/mp4', 'video/webm', 'video/quicktime']
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
