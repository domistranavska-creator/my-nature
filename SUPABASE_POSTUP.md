# Supabase postup pre tento projekt

Tento projekt dnes funguje lokálne a cloud účet už máš pripravený cez Supabase Auth.

Backend základ som navrhol tak, aby:

- nemenil dnešný frontend model násilne
- sedel na existujúce `categories`, `varieties`, `customTasks`, `journal`
- používal tabuľku `cards` ako cloudový názov pre dnešné frontendové karty
- držal RLS striktne po používateľovi
- vedel bezpečne uložiť aj budúce polia cez `data jsonb`

## Čo presne ideš vložiť

Použi súbor:

- `C:\Users\domis\Desktop\moja zahrada\koncept-buducnost\SUPABASE_SETUP.sql`

Tento jeden skript spraví naraz:

- tabuľku `profiles`
- tabuľku `categories`
- tabuľku `cards`
- tabuľku `tasks`
- tabuľku `journal_entries`
- indexy
- trigger na `updated_at`
- trigger na vytvorenie profilu pri novom `auth.users`
- backfill profilov pre už existujúcich používateľov
- RLS policy pre všetky tabuľky
- private storage bucket `mojazahrada-images`
- storage policy, aby každý používateľ videl len svoj priečinok

## Krok za krokom v Supabase

1. Otvor svoj Supabase projekt.
2. V ľavom menu klikni na `SQL Editor`.
3. Klikni `New query`.
4. Otvor lokálny súbor `C:\Users\domis\Desktop\moja zahrada\koncept-buducnost\SUPABASE_SETUP.sql`.
5. Skopíruj celý obsah súboru do nového query okna v Supabase.
6. Klikni `Run`.

Ak skript prebehne bez chyby, pokračuj takto:

7. Otvor `Table Editor`.
8. Skontroluj, že v schéme `public` vidíš:
   - `profiles`
   - `categories`
   - `cards`
   - `tasks`
   - `journal_entries`
9. Otvor tabuľku `profiles`.
10. Skontroluj, že tam už je riadok pre tvoj aktuálny cloud účet.

Potom storage:

11. Otvor `Storage`.
12. Skontroluj, že existuje bucket `mojazahrada-images`.
13. Bucket má zostať `private`.

## Prečo je návrh takto

### `profiles`

- viazané priamo na `auth.users.id`
- každý človek má presne jeden profil

### `categories`

- používa `client_id`, aby sme vedeli zachovať dnešné ID z appky, napríklad `cat-papriky`
- `parent_client_id` necháva strom kategórií bez násilného premapovania

### `cards`

- je to cloudová vrstva nad dnešnými frontendovými kartami v `state.varieties`
- `card_type` už dnes sedí na tvoje typy kariet
- `data jsonb` drží aj polia, ktoré nechceme zatiaľ rozbiť prílišnou normalizáciou

### `tasks`

- sedí na dnešné `customTasks`
- prepojenia ostávajú cez `linked_category_ids` a `linked_variety_id`

### `journal_entries`

- sedí na dnešný denník
- necháva `entry_type`, `tags`, `weather`, `images`, `linked_category_ids`

### Storage bucket

- každý obrázok sa bude ukladať do priečinka začínajúceho `auth.uid()`
- tým pádom storage policy ostane jednoduchá a bezpečná

## Dôležitá poznámka k prvému syncu

Prvý sync som pripravil ako bezpečný ručný upload z appky do Supabase:

- nič lokálne nemaže
- nič lokálne neprepína na cloud ako jediný zdroj
- len nahrá aktuálny stav do tabuliek a fotky do bucketu

To je zámerne opatrný prvý krok, aby sme nič nerozbili.
