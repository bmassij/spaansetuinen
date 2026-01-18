# Pagina-inventarisatie — Spaanse Tuin & Zo (Next.js)

> Bronmappen gebruikt voor analyse: [`spaansetuinen-next/app/`](spaansetuinen-next/app/page.tsx:9) en [`spaansetuinen-next/content/`](spaansetuinen-next/content:1)

---

## 1) Route-overzicht

- /  — page: [`spaansetuinen-next/app/page.tsx`](spaansetuinen-next/app/page.tsx:9)
  - JSON: [`spaansetuinen-next/content/home.json`](spaansetuinen-next/content/home.json:1) ✅

- /assortiment  — page: [`spaansetuinen-next/app/assortiment/page.tsx`](spaansetuinen-next/app/assortiment/page.tsx:5)
  - JSON: [`spaansetuinen-next/content/olea-europea.json`](spaansetuinen-next/content/olea-europea.json:1) ✅ (html)

- /over-ons  — page: [`spaansetuinen-next/app/over-ons/page.tsx`](spaansetuinen-next/app/over-ons/page.tsx:4)
  - JSON: [`spaansetuinen-next/content/over-ons.json`](spaansetuinen-next/content/over-ons.json:1) ✅ (sectionHtml)

- /contact  — page: [`spaansetuinen-next/app/contact/page.tsx`](spaansetuinen-next/app/contact/page.tsx:4)
  - JSON: [`spaansetuinen-next/content/contact.json`](spaansetuinen-next/content/contact.json:1) ✅ (contactHtml)

- /bomen  — (geen index pagina aanwezig in `spaansetuinen-next/app/bomen/`)
  - dynamic product route: [`spaansetuinen-next/app/bomen/[slug]/page.tsx`](spaansetuinen-next/app/bomen/[slug]/page.tsx:6)
    - laadt bestand: `spaansetuinen-next/content/{slug}.json` (voor elk product) ✅

---

## 2) Content-inventarisatie (per JSON)

Format: Bestandsnaam — bedoelde pagina (af te leiden) — aanwezige velden — ontbrekende/lege velden (✅ / 🟥)

- `home.json` — Home pagina — velden: heroTitle ✅, heroSubtitle ✅, intro ✅, blocks (array) ✅, usp (array) ✅, aboutTeaser ✅, footerText ✅
  - Status: ✅ volledig aanwezig (gebruikbaar door `/`)

- `contact.json` — Contact pagina — velden: contactHtml ✅
  - Status: ✅ aanwezig

- `over-ons.json` — Over ons pagina — velden: sectionHtml ✅
  - Status: ✅ aanwezig

- `olea-europea.json` — Assortiment (assortiment-pagina) — velden: slug ✅, filename ✅, html ✅
  - Andere product-schema velden (title, intro, image, etc.): 🟥 niet aanwezig (html-document aanwezig)

Voor alle volgende bestanden: veel zijn gemigreerde legacy-pagina's en bevatten een enkel veld `html` (volledige HTML-pagina). Dat veld is aanwezig (✅). Gestructureerde productvelden (title, heroText, image(url), intro, kenmerken[array], verzorging, plaatsing, cta, short_description, long_description) zijn meestal afwezig of anders gestructureerd — hieronder per bestand exact aangegeven.

- `bonsai-olijfboom.json` — product pagina (legacy html) — velden: html ✅ — overige gestructureerde velden: 🟥
- `cycca-revoluta.json` — product pagina (legacy html) — velden: html ✅ — overige gestructureerde velden: 🟥
- `ficus-carica.json` — product pagina (legacy html) — velden: html ✅ — overige gestructureerde velden: 🟥
- `granaatappelbomen.json` — product pagina (legacy html) — html ✅ — overige gestructureerd: 🟥
- `hojia-blanca.json` — product pagina (legacy html) — html ✅ — overige: 🟥

- `olea-europea-andalusia.json` — product (legacy html) — html ✅ — overige gestructureerd: 🟥
- `olea-europea-bonsai-doble.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-bonsai-ramif.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-copa.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-hoija-blanca.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-lechin.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-multi-bola-multi-plato.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-pata-bola.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-piel-joven.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-piel-vieja.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-plato.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-tarrina.json` — product (legacy html) — html ✅ — overige: 🟥
- `olea-europea-tubo.json` — product (legacy html) — html ✅ — overige: 🟥

- `chamaerops-humilis.json` — product (/bomen/[slug]) — aanwezige velden:
  - title ✅
  - heroText ✅
  - intro ✅
  - description ✅
  - kenmerken (object: heading, content, list) ✅ (LET OP: object met `list` — niet direct een array op root `kenmerken`) 
  - image (object) present maar image.url == "" 🟥 (lege URL)
  - verzorging (object met sections) ✅
  - plaatsing (object) ✅
  - cta (object) ✅
  - breadcrumbs ✅
  - Status: inhoudelijk grotendeels aanwezig, maar image.url is leeg (🟥) en structuur van `kenmerken` is object (niet direct Array) — voor `ProductLayout` kan dat relevant zijn.

- `phoenix-canariensis.json` — product — velden: title ✅, heroText ✅, intro ✅, kenmerken (object with list) ✅, image {url: ""} 🟥, verzorging ✅, plaatsing ✅, cta ✅, breadcrumbs ✅
  - Status:zelfde opmerkingen als hierboven (image leeg)

- `prunus-laurocerasus.json` — product — velden: title ✅, heroText ✅, intro ✅, description ✅, kenmerken (object with list) ✅, image.url == "" 🟥, verzorging ✅, plaatsing ✅, cta ✅, breadcrumbs ✅
  - Status: image leeg 🟥

- `trachycarpus-fortunei.json` — product — velden:
  - intro ✅
  - kenmerken (array) ✅
  - verzorging (object with keys snoeien, winter, water, voeding) ✅
  - plaatsing (object) ✅
  - locatie ✅
  - cta (string) ✅
  - title / heroText / image: 🟥 afwezig
  - Status: deel-structured; title/hero/image ontbreken (🟥)

- `washingtonia-robusta.json` — product — velden: title ✅, heroText ✅, intro ✅, description ✅, kenmerken (object) ✅, image.url == "" 🟥, verzorging ✅, plaatsing ✅, cta ✅, breadcrumbs ✅
  - Status: image leeg 🟥


### Samenvatting JSON-velden (algemene observaties)
- Twee groepen content terug te vinden:
  1) Gemigreerde legacy HTML-bestanden: veel `*_*.json` bevatten één veld `html` met volledige HTML-pagina (✅). Deze zijn bruikbaar als HTML, maar niet als gestructureerde product-JSON voor `ProductLayout` (🟥 ontbrekende gestructureerde velden).
  2) Gestructureerde product-JSONs (bv. `chamaerops-humilis.json`, `phoenix-canariensis.json`, `prunus-laurocerasus.json`, `washingtonia-robusta.json`, `trachycarpus-fortunei.json`): bevatten productteksten, kenmerken, verzorging, plaatsing, cta. Veel van deze bestanden hebben:
    - `image` aanwezig als object maar vaak met lege `url` → 🟥
    - `kenmerken` soms als object met `list` ipv directe array → aanwezig maar niet exact in het formaat dat `ProductLayout` verwacht (let op) ✅/⚠

---

## 3) Productpagina's (/bomen/[slug]) — compleetheid per product t.o.v. `ProductLayout`

Referentie component: [`spaansetuinen-next/components/ProductLayout.tsx`](spaansetuinen-next/components/ProductLayout.tsx:1)
- Vereiste/verwachte velden door `ProductLayout`: `title`, `heroText`, `image` (string), `intro`, `kenmerken` (Array), `verzorging`, `plaatsing`, `cta`, `short_description`, `long_description`.

Per product (kort):

- `chamaerops-humilis.json` — title ✅, heroText ✅, image.url "" 🟥, intro ✅, kenmerken aanwezig maar als object (list) ⚠, verzorging ✅, plaatsing ✅, cta ✅, short_description/long_description 🟥 (niet aanwezig)
  - Conclusie: inhoudelijke tekst grotendeels aanwezig; ontbrekende/lege image + geen short/long beschrijving voor specifieke layout-rendering.

- `phoenix-canariensis.json` — image.url "" 🟥; overige velden tekstueel aanwezig (title/hero/intro/kenmerken/verzorging/plaatsing/cta) ✅; short/long beschrijving 🟥

- `prunus-laurocerasus.json` — image.url "" 🟥; overige relevante velden aanwezig ✅; short/long 🟥

- `washingtonia-robusta.json` — image.url "" 🟥; overige tekstvelden aanwezig ✅; short/long 🟥

- `trachycarpus-fortunei.json` — title 🟥, heroText 🟥, image 🟥; wel: intro ✅, kenmerken (array) ✅, verzorging/plaatsing ✅, cta ✅
  - Conclusie: ontbrekende title/hero/image → pagina wordt door `ProductLayout` mogelijk onvolledig of notFound afhankelijk van implementatie.

- Voor alle legacy-`html` JSON bestanden (bv. `bonsai-olijfboom.json`, `ficus-carica.json`, `olea-europea-*.json`, etc): `ProductLayout` verwacht gestructureerde velden; deze bestanden bieden alleen `html` → voor rendering via [`/bomen/[slug]`] deze bestanden zijn NIET direct compatibel met `ProductLayout` (velden zoals `title`, `image`, `intro`, `kenmerken` ontbreken) → markeer als 🟥 voor compleetheid t.o.v. `ProductLayout`.

---

## 4) Afbeeldingen — signalering

- JSON-bestanden met expliciete image-velden (voorbeeld):
  - `chamaerops-humilis.json` — `image` object met `url: ""` (lege waarde) 🟥
  - `phoenix-canariensis.json` — `image.url` == "" 🟥
  - `prunus-laurocerasus.json` — `image.url` == "" 🟥
  - `washingtonia-robusta.json` — `image.url` == "" 🟥
  - Diverse legacy-HTML JSONs bevatten directe `<img src="assets/...">` en `background-image:url('assets/...')` verwijzingen (zie `bonsai-olijfboom.json`, `ficus-carica.json`, `cycca-revoluta.json`, etc.)

- Public folder status: `spaansetuinen-next/public/` is niet aanwezig in workspace (geen `public/` vermeld door listing). Daardoor kan ik bestandsbestaan van genoemde afbeeldingen niet verifiëren. Conclusie:
  - Alle in JSON genoemde afbeeldingspaden kunnen niet worden gevalideerd tegen een `public/`-map in deze repository — behandeling: markeer als 🟥 (niet geleverd / niet verifieerbaar).

- Praktische output (signalering):
  - Alle JSON image fields waar `url` leeg zijn: 🟥
  - Alle legacy-html assets (paden in `html` strings, bijv. `assets/impressie/fotoswebsite/...`) — bestanden niet geverifieerd (public/ niet aanwezig) 🟥

---

## Kort overzicht / aanbeveling voor content-aanlevering (uitsluitend inventaris)

- Globale prioriteiten (op basis van inventaris):
  - Voor productpagina's die door `ProductLayout` worden gebruikt: zorg dat elk product-JSON minimaal bevat: `title`, `heroText`, `image` (werkende url), `intro`, `kenmerken` (array), `verzorging`, `plaatsing`, `cta`.
  - Voor legacy-`html` JSONs: beslissen of ze worden geconverteerd naar gestructureerde JSON of gebruikt blijven als volledige html-pagina's. (opmerking: geen advies/actie in deze inventaris — enkel constateren)
  - Afbeeldingen: veel `image.url` zijn leeg en er is geen `public/` om assets te verifiëren → afbeeldingen moeten worden aangeleverd en paden toegevoegd in JSON.

---

Einde inventarisatie. Stop.
