# BESLISSINGSDOCUMENT — Content Migratie

**Project:** spaansetuinen-next (Next.js rebuild)  
**Status:** Bindend document  
**Fase:** Afsluiting analyse → start gecontroleerde migratie

---

## 1. Doel van dit document
Dit document legt definitief vast:
- welke content technisch **onacceptabel** is;
- welke content **tijdelijk toegestaan** is;
- welke **strategische keuzes** leidend zijn voor de verdere migratie.

Zonder dit document worden **geen conversies** uitgevoerd.

---

## 2. Definities

### ❌ Verboden binnen Fase 3
- Volledige HTML-documenten in JSON:
  - `<!doctype>`
  - `<html>`, `<head>`, `<body>`
  - `<script>`, `<style>`
  - CDN-verwijzingen
  - popup-, tracking- of layoutlogica

### ⚠️ Tijdelijk toegestaan binnen Fase 3
- HTML-fragmenten uitsluitend voor content:
  - `<h2>`, `<h3>`, `<p>`, `<ul>`, `<section>`
  - **geen** scripts
  - **geen** styles
  - **geen** layout- of gedragslogica

Deze fragmenten worden **pas in Fase 4** opgeschoond.

---

## 3. Categorisatie content

### 🔴 Categorie A — ONACCEPTABEL (verplicht strippen)
Bestanden die volledige HTML-documenten bevatten en de content-engine omzeilen.

**Deze bestanden moeten worden geconverteerd naar gestructureerde JSON:**

- `olea-europea.json`
- `olea-europea-andalusia.json`
- `olea-europea-tubo.json`
- `olea-europea-tarrina.json`
- `olea-europea-plato.json`
- `olea-europea-piel-vieja.json`
- `olea-europea-piel-joven.json`
- `olea-europea-pata-bola.json`
- `olea-europea-multi-bola-multi-plato.json`
- `olea-europea-lechin.json`
- `olea-europea-hoija-blanca.json`
- `olea-europea-copa.json`
- `olea-europea-bonsai-ramif.json`
- `olea-europea-bonsai-doble.json`
- `ficus-carica.json`
- `cycca-revoluta.json`
- `bonsai-olijfboom.json`
- `granaatappelbomen.json`
- `hojia-blanca.json`

**Bindende afspraak:**
- HTML wordt **niet hergebruikt**
- Alleen **inhoudelijke tekst** wordt geëxtraheerd
- Layout, scripts, styles en popups worden **volledig genegeerd**

---

### 🟡 Categorie B — TIJDELIJK TOEGESTAAN (fragment-HTML)
Bestanden met HTML-fragmenten bedoeld als content-inhoud.

**Deze bestanden blijven ongewijzigd tot Fase 4:**

- `bezorgen.json`
- `verhuur.json`
- `bloembakken.json`
- `bloembakken-klaar-voor-beplanting.json`
- `plant-en-voedingstips.json`
- `mediterrane-voeding.json`
- `mediterrane-potgrond.json`
- `hydrokorrels.json`
- `boomschors.json`
- `contact.json`
- `over-ons.json`

**Bindende afspraak:**
- Geen uitbreiding
- Geen herschrijving
- Geen conversie in deze fase

---

## 4. Strategische keuze — Olea Europea varianten

### Vaststelling
Alle `olea-europea-*` bestanden:
- hebben identieke HTML-structuur;
- verschillen hoofdzakelijk in tekst of naam;
- vormen technisch één familie.

### Besluit
- Olea Europea wordt behandeld als **één productstructuur**;
- varianten worden **data**, geen losse pagina’s.

Geen losse layouts of HTML-migraties per variant.

---

## 5. Scrape-bronnen
- `scrape_full_dump/*.html` geldt als **bronmateriaal**;
- niets wordt verwijderd;
- niets wordt automatisch gemigreerd;
- scrape dient uitsluitend als **inhoudsreferentie**.

---

## 6. Wat expliciet niet mag
- ❌ HTML → JSON conversie zonder dit document
- ❌ Automatisch herschrijven van teksten
- ❌ Layout- of component-aanpassingen
- ❌ Ad-hoc fixes buiten vastgestelde stappen

---

## 7. Volgende stap (nog niet uitvoeren)
Na acceptatie van dit document:

- Per **Categorie A-bestand** een **voorstel voor gestructureerde JSON** genereren;
- voorstellen worden **niet automatisch toegepast**.

---

## 8. Status
- Analysefase: **afgerond**
- Besluitvorming: **vastgelegd**
- Migratie: **nog niet gestart**

---

*Dit document is leidend voor alle vervolgacties binnen het project `spaansetuinen-next`.*

