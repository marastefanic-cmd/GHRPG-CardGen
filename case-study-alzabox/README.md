# Obchodní kalkulátor: Pošli to AlzaBoxem

Interaktivní prototyp pro obchodní jednání s e-shopy, které zvažují zapojení do
dopravní služby **Pošli to AlzaBoxem**. Vznikl jako řešení case study pro roli
Key Account Managera.

**Živá aplikace:** otevřete `index.html` v prohlížeči, nebo použijte nasazenou
verzi na GitHub Pages (odkaz v popisu repozitáře).

---

## 1. Jak nad obchodním přínosem služby přemýšlím

Služba má pro e-shop **tři nezávislé zdroje hodnoty**, které lze v jednání
obhájit každý zvlášť — a přesně tak je kalkulátor počítá i prezentuje:

1. **Úspora na dopravě** – rozdíl ceny za zásilku mezi současným dopravcem a
   AlzaBoxem, násobený počtem zásilek, které přes AlzaBox reálně půjdou.
2. **Úspora na zpracování** – jednodušší příprava zásilky znamená ušetřené
   minuty skladníka na každé zásilce; minuty × hodinová sazba = peníze.
3. **Marže z nových objednávek** – doručení druhý den brzy ráno a o víkendech
   je konverzní argument: i konzervativní růst objednávek v jednotkách procent
   znamená při běžné marži významnou částku ročně. Růst se počítá pouze ze
   zásilek doručovaných AlzaBoxem – při nulové adopci je nulový.

Model je **záměrně konzervativní**: počítá jen s hrubou maržou (ne s tržbami)
a sekundární efekty (vyšší retence, méně nedoručených zásilek, méně vratek,
úspora obalového materiálu) nechává stranou jako „bonus navrch“. Zároveň
transparentně přiznává, s čím nepočítá (struktura dopravních kanálů, dopravné
přenášené na zákazníka, DPH, kapacitní povaha časových úspor) – v jednání je
vždy silnější slibovat méně a doručit více.

## 2. Jaké faktory ovlivňují rozhodnutí e-shopu

Kalkulátor je má přímo jako vstupní parametry, aby se o nich dalo mluvit:

| Faktor | Kde v nástroji |
|---|---|
| Objem objednávek, hodnota košíku, marže | sekce „Váš e-shop“ |
| Cena dopravy dnes vs. u AlzaBoxu | sekce „Současná logistika“ / „Se službou“ |
| Pracnost přípravy zásilek | minuty na zásilku × sazba skladu |
| Kolik zákazníků si AlzaBox reálně zvolí (adopce) | posuvník „Podíl zásilek přes AlzaBox“ |
| Vliv rychlosti doručení na konverzi | posuvník „Růst objednávek díky rychlosti“ |
| Jednorázové náklady na integraci a jejich návratnost | vstup + KPI „Návratnost zapojení“ |
| Riziko „co když to bude méně?“ | citlivostní analýza (adopce × růst) |
| Faktory mimo čísla (rozměry zásilek, vratky, dobírka, integrace, zvyk zákazníků) | sekce „Na co se partner zeptá“ |

## 3. Jak bych partnerovi vysvětlil hodnotu služby

Nástroj je stavěný na scénář reálné schůzky:

- **Partner diktuje vlastní čísla** a výsledek se přepočítává okamžitě — čísla
  jsou pak „jeho“, ne moje. To je nejsilnější vyjednávací pozice.
- Hlavní sdělení je jedno velké číslo: **celkový přínos v prvním roce** po
  odečtení nákladů na zapojení. Vše ostatní ho jen dokládá.
- **Citlivostní tabulka** odpovídá na námitku „a co když adopce bude nižší?“
  dřív, než zazní — i nejopatrnější scénář zůstává kladný.
- Sekce **„Argumenty pro jednání“** generuje hotové formulace s dosazenými
  čísly, včetně kvalitativních argumentů (víkendové doručení, zákaznická
  zkušenost), které model záměrně nepočítá.
- Sekce **„Jak kalkulačka počítá“** přiznává vzorce, předpoklady i limity —
  transparentnost buduje důvěru.

## 4. Jak jsem při řešení využil AI

Celý prototyp vznikl ve spolupráci s AI (Claude), workflow „AI jako tým“:

1. **Analýza zadání** – AI přečetla PDF se zadáním a rozpadla ho na požadavky.
2. **Návrh obchodního modelu** – struktura tří zdrojů hodnoty, volba vstupních
   proměnných, konzervativní předpoklady a modelové scénáře (malý/střední/velký
   e-shop).
3. **Návrh a implementace aplikace** – jediný HTML soubor bez závislostí,
   grafy v SVG, tmavý/světlý režim, tisková jednostránka, sdílení odkazem.
   Barevná paleta grafů prošla automatickou validací přístupnosti (kontrast,
   barvoslepost).
4. **Automatizované testování** – aplikace byla ověřena v headless prohlížeči
   (výpočty proti ručně spočítaným hodnotám, interakce, mobilní zobrazení,
   tisk, krajní případy).
5. **Vícenásobná AI revize** – paralelní nezávislé revize (správnost modelu,
   čeština, chyby v kódu, UX/přístupnost, soulad se zadáním), každý nález
   adversariálně ověřen druhým AI agentem, potvrzené nálezy opraveny.
6. **Nasazení** – GitHub Pages přes GitHub Actions.

## 5. Použití v reálném obchodním jednání

- **Před schůzkou:** předvyplním čísla partnera (z veřejných dat či dotazníku)
  a pošlu mu odkaz — parametry se nesou v URL, nic se nikam neodesílá.
- **Na schůzce:** živé modelování scénářů („a co když adopce jen 20 %?“),
  citlivostní tabulka jako pojistka proti námitkám.
- **Po schůzce:** tlačítko *Vytisknout shrnutí* vygeneruje jednostránkový
  podklad, *Zkopírovat shrnutí pro e-mail* připraví textovou rekapitulaci
  s odkazem na kalkulačku s dohodnutými čísly.

---

## Technické poznámky

- Jediný soubor `index.html` — žádný build, žádné externí závislosti, funguje
  i offline z disku.
- Grafy jsou ručně kreslené SVG s tooltipovou vrstvou; paleta validovaná pro
  světlý i tmavý režim a barvoslepost (CVD).
- Všechny hodnoty jsou modelové; ceny dopravy se upravují přímo v nástroji
  podle konkrétní nabídky.

> **Disclaimer:** Prototyp pro case study. Nejde o oficiální nástroj ani ceník
> Alza.cz.
