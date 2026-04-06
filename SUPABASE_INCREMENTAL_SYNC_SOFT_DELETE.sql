-- Moja zahrada
-- Mala bezpecna migracia pre incremental sync a soft delete tombstones.
-- Nici existujuce constraints ani updated_at triggre.

alter table if exists public.categories
  add column if not exists deleted_at timestamptz null;

alter table if exists public.cards
  add column if not exists deleted_at timestamptz null;

alter table if exists public.tasks
  add column if not exists deleted_at timestamptz null;

alter table if exists public.journal_entries
  add column if not exists deleted_at timestamptz null;
