# Audit a plan: koncept-buducnost

## Strucny audit aktualneho stavu

### Projektova struktura

- hlavna stabilna verzia je v koreni projektu
- experiment je oddeleny v `koncept-buducnost`
- koncept je jednoducha lokalna frontend appka bez build procesu

### Frontend stack

- `index.html`
- `styles.css`
- `app.js`
- data sa ukladaju cez `localStorage`
- fotky sa ukladaju priamo do prehliadaca ako data URL

### Co uz v koncepte funguje

- hlavne menu kategorií
- prehlad odrod a podkategorii
- detail a editacia odrod
- `Plán práce`
- `Denník`
- `Spomienky`
- fullscreen fotky
- batch akcie

### Aktualny datovy model

Najdolezitejsie casti:

- `categories`
- `varieties`
- `customTasks`
- `journal`

Povodny koncept bol silne orientovany na:

- kategorie
- odrody
- zahradny dennik

### Co sa da znovu pouzit

- skoro cely vizual
- karty
- modal flow
- upload fotiek
- dennik ako jadro osobnych zapisov
- spomienky ako emocionalny vstup
- plan prace ako prakticka vrstva

## Nova architektura nad tym, co uz je

Nebudujeme novu appku od nuly.
Staviame novu vrstvu nad sucasnym jadrom.

### 1. Entry

Zakladna jednotka osobneho sveta.

Kazdy zapis moze mat:

- `id`
- `title`
- `text`
- `date`
- `images`
- `entryType`
- `tags`
- `linkedCategoryId`
- `linkedVarietyId`
- `linkedEntityName`
- `place`
- `weather`

### 2. Things / Entities

Veci vznikaju z dvoch zdrojov:

- strukturovane kategorie
- prepojene veci z dennikovych zapisov

To znamena, ze appka vie zobrazit:

- zahradne sekcie
- rastliny
- problemy
- miesta
- nazvane prirodne pozorovania

bez nutnosti robit okamzite komplikovanu samostatnu databazu entit.

### 3. Gallery item

Galeria nie je samostatna databaza, ale odvodena vrstva nad fotkami zo zapisov.

Kazda fotka tak automaticky dedi:

- datum
- zapis
- textovy kontext
- tagy
- prepojene veci
- pocasie dna, ak existuje

### 4. Weather snapshot

Pocasie je jediny externy inteligentny kontext, ktory ma zmysel pridavat.

V tejto faze je pripraveny datovy model:

- `temperature`
- `condition`
- `rain`
- `wind`

Neskor ho vieme napojit automaticky bez prepisu architektury.

### 5. Relations

Prepojenia v appke teraz vedia vznikat cez:

- datum
- kategoriu
- odrodu
- nazov veci
- tagy

To je dobry zaklad pre osobny memory graph bez toho, aby sa appka zmenila na komplikovany system.

## Implementacny plan

### Faza 1: bezpecne rozsirena domovska vrstva

- domovsky pohlad `Dnes`
- karta posledneho zapisu
- karta pocasia
- sezonna spomienka
- sekcia galeria
- sekcia veci
- jednotne `Pridat`

### Faza 2: prepojene zapisovanie

- rozsirene entry typy
- tagy
- prepojene veci
- miesto
- priprava na pocasie

### Faza 3: prehlad veci

- browser vsetkych veci
- detail veci
- timeline zapisov
- fotky k veci

### Faza 4: specializovane vrstvy

- skodcovia a problemy
- udalosti pocasia
- sezonne spomienky
- neskor sync a finalne ulozisko

## Co som uz implementoval v tejto iteracii

- novy domovsky dashboard v hlavnom pohlade
- jednotne `Pridat zapis`
- rozsireny model dennikovych zapisov
- prepojene `Veci`
- galeriu odvodenu zo zapisov
- pripravu na pocasie pri zapisoch

## Co zatial ostalo zachovane

- povodne kategorie
- odrody
- plan prace
- dennik
- spomienky
- detailne karty a modalny styl

To znamena, ze koncept sa rozsiruje, ale nerozpadava.
