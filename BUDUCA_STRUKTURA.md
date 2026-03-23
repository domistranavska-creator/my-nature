# Moja záhrada: budúca štruktúra appky

## Čo tá appka má byť

`Moja záhrada` už nemá byť len evidencia pestovania.

Budúca verzia má byť osobný sezónny priestor pre reálny život vonku:

- čo sa deje dnes
- čo som videl a zažil
- čo treba spraviť
- čo rastie, objavujem alebo zbieram
- čo z úrody alebo nálezov viem prakticky spracovať

Má pôsobiť viac ako živá mobilná appka a menej ako administrácia.
Záhrada zostáva jadrom, ale appka sa prirodzene rozšíri aj na denník, prírodu, prechádzky, huby, zvieratá, počasie a sezónne spracovanie.

## Z čoho už vieme stavať

To, čo už v koncepte existuje, je hodnotné a netreba to zahadzovať:

- `Spomienky` sú silný vizuálny vstup
- `Denník` je základ osobného obsahu
- `Plán práce` je praktická časť každodenného používania
- kategórie a odrody sú základ pre štruktúrované záznamy
- fotky, galérie a fullscreen náhľady už tvoria dobrý mobilný pocit

To znamená:

- netreba stavať úplne novú appku
- treba preusporiadať existujúce jadro
- nové oblasti dopĺňať ako prirodzené vrstvy nad tým, čo už funguje

## Prebuild z existujúcej appky

### 1. Dnes

Hlavná vstupná obrazovka.
Nevstupuje sa cez kategórie, ale cez aktuálny deň a sezónu.

Obsah:

- dnešné počasie a stručná sezónna nálada
- `Plán práce`
- posledné `Spomienky`
- posledný zápis v `Denníku`
- rýchle pridanie: fotka, zápis, pozorovanie, úloha

Z čoho to vznikne:

- `Spomienky` ponechať
- `Plán práce` ponechať
- `Denník` ponechať ako krátky náhľad
- doplniť iba blok `Počasie a sezóna`

Prečo je to správne:

- mobil začína tým, čo je živé teraz
- používateľ nemusí rozmýšľať, kam kliknúť
- appka hneď pôsobí osobnejšie a praktickejšie

### 2. Zápisky

Toto bude rozšírený dnešný `Denník`, nie len textový zoznam.

Obsah:

- denníkové zápisy
- fotky
- krátke pozorovania z prechádzky alebo záhrady
- nálezy húb, hmyzu, zvierat alebo sezónnych javov

Odporúčaný princíp:

- všetko sú `zápisky`
- zápis môže mať typ
- typ určuje, ako sa neskôr zobrazí v ďalších sekciách

Typy zápiskov:

- záhrada
- príroda
- huba
- zviera
- hmyz
- prechádzka
- úroda
- recept
- spracovanie
- voľný zápis

Prečo je to dôležité:

- nevznikne chaos z veľa samostatných modulov
- používateľ zapisuje prirodzene jedným spôsobom
- systém si potom vie obsah roztriediť sám

### 3. Objavy

Nová sekcia, ktorá vznikne inteligentným rozšírením dnešných kategórií.

Dnes:

- kategórie a odrody fungujú hlavne pre pestovanie

Do budúcna:

- kategórie sa zmenia na širšie `oblasti objavovania`

Navrhované oblasti:

- záhrada
- rastliny
- huby
- zvieratá
- hmyz
- sezónne javy
- miesta

Čo sem patrí:

- čo pestujem
- čo som našiel
- čo sa na mieste opakuje
- čo si chcem pamätať do ďalšej sezóny

Prebuild z toho, čo už máme:

- dnešné kategórie sa nechajú
- odrody zostanú ako podtyp pri sekcii `záhrada`
- nové oblasti neprerobia jadro silou, iba ho rozšíria

Praktický princíp:

- nie všetko musí mať detailnú kartu ako odroda
- niektoré veci stačí mať ako jednoduchý záznam s fotkou, dátumom a miestom

### 4. Prakticky

Sem patrí všetko, čo má užitok a opakovateľnosť.

Obsah:

- plán práce
- zber
- spracovanie úrody
- recepty
- sušenie
- zaváranie
- čaje
- tinktúry
- kompost
- domáce hnojivá

Toto nemá byť encyklopédia.
Má to byť praktická časť s jednoduchým používaním:

- čo urobiť
- z čoho
- kedy
- ako som to robil minule

Prebuild:

- dnešný `Plán práce` ostáva ako jadro
- neskôr sa doplnia `Recepty a spracovanie`
- až potom `Kompost a domáce hnojivá`

### 5. Rok

Táto sekcia dá celej appke zmysel v čase.

Obsah:

- jar, leto, jeseň, zima
- mesačné pohľady
- čo sa podarilo
- čo sa opakovalo
- čo si chcem pripomenúť budúci rok

Vznikne z prepojenia:

- denník
- fotky
- úlohy
- úroda
- pozorovania

Prečo ju mať:

- appka nebude len operatívna
- začne fungovať aj ako osobná kronika a sezónna pamäť

## Navrhovaná budúca hlavná navigácia

Silná a prehľadná verzia:

1. `Dnes`
2. `Zápisky`
3. `Objavy`
4. `Prakticky`
5. `Rok`

Toto je podľa mňa lepšie než mať v hlavnej navigácii naraz:

- záhrada
- huby
- zvieratá
- hmyz
- recepty
- počasie
- prechádzky
- denník
- spomienky

To by bolo príliš rozbité.

Lepší princíp je:

- hlavná navigácia podľa spôsobu používania
- vnútorné typy obsahu podľa oblasti

## Jadro a rozšírenia

### Jadro v1

Toto má byť prvá moderná verzia, ktorá dáva zmysel na každý deň:

- `Dnes`
- `Zápisky`
- `Plán práce`
- `Spomienky`
- základné `Objavy` pre záhradu
- fotky
- mobilné rýchle pridanie

### Rozšírenie v2

- typy zápiskov pre prírodu, huby, zvieratá, hmyz
- `Miesta`
- počasie pri zápisoch
- sezónne javy
- jednoduché zbery a úroda

### Rozšírenie v3

- recepty a spracovanie úrody
- sušenie, zaváranie, čaje, tinktúry
- kompostovanie
- domáce hnojivá
- sezónne porovnania medzi rokmi

## Mobilná logika

Budúca mobilná appka má stáť na týchto princípoch:

- spodná navigácia s 5 sekciami
- veľké vizuálne karty
- rýchly vstup cez `+`
- maximum akcií do 1 až 2 klikov
- fotka je rovnako dôležitá ako text

Na mobile bude najsilnejší tok:

1. otvorím `Dnes`
2. pridám fotku alebo zápis
3. označím typ
4. prípadne pridám úlohu alebo miesto

## Sync a dáta

Teraz ešte netreba implementovať finálne technické riešenie, ale už teraz je dobré rozmýšľať správne:

- textové dáta majú mať jednotný model
- fotky majú byť oddelené od textových záznamov
- zápis má byť hlavná entita
- ostatné sekcie sa majú z veľkej časti skladať zo zápisov, úloh a štruktúrovaných objektov

Praktický smer:

- web aj mobil majú pracovať nad rovnakými dátami
- fotky nesmú byť naviazané len na jedno zobrazenie
- kategórie nesmú byť navrhnuté tak úzko, aby blokovali rozšírenie mimo záhrady

## Čo teraz nerobiť

- nerozbiť stabilnú webovú verziu
- nezačať naraz riešiť všetky moduly
- nevytvoriť príliš veľa hlavných sekcií
- nepretlačiť všetko cez model odrôd a kategórií

To by viedlo k tomu, že appka bude pôsobiť komplikovane a ťažkopádne.

## Najlepší ďalší konkrétny krok

Ďalší správny krok nie je ešte sync ani databáza.

Najprv treba spraviť presnú mapu:

- čo z dnešnej appky patrí do `Dnes`
- čo patrí do `Zápisky`
- čo sa premení na `Objavy`
- čo zostane iba v záhradnej časti
- čo zatiaľ odložiť

Inými slovami:

ďalší krok je navrhnúť `obsahový model v1`, nie techniku.

## Návrh vety pre ďalšiu fázu

Budúca verzia `Moja záhrada` bude osobná sezónna appka, kde jadro tvoria `Dnes`, `Zápisky`, `Objavy`, `Prakticky` a `Rok`, pričom existujúce `Spomienky`, `Denník` a `Plán práce` zostanú zachované a stanú sa základom novej mobilnej štruktúry.
