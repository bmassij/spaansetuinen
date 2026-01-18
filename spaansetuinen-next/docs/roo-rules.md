---

# Roo Rules — Spaanse Tuin & Zo (LEIDEND DOCUMENT)

## DOEL VAN DIT DOCUMENT
Dit document is de ENIGE bron van waarheid voor hoe Roo Code mag werken
binnen het project **spaansetuinen-next**.

Afwijken is NIET toegestaan.

---

## ALGEMENE PRINCIPES

- Dit project migreert een bestaande HTML-site naar Next.js
- De OUDE HTML is GEEN template meer
- Layout wordt CENTRAAL bepaald
- Content komt UITSLUITEND uit JSON-bestanden
- Er is altijd maar ÉÉN bron van waarheid

---

## VERBODEN ACTIES (ABSOLUUT)

Roo Code MAG NOOIT:

- HTML-pagina’s injecteren (dangerouslySetInnerHTML)
- Oude HTML lezen als layout-template
- Specifieke productpagina’s gebruiken als referentie
- Inline scripts of styles toevoegen
- Zelf structuur “verbeteren”
- Componenten herschrijven zonder expliciete opdracht
- Meerdere footers of navbars renderen
- Bestanden aanpassen die niet expliciet genoemd zijn
- Zelf routes bedenken
- Hash-links (#) of .html links gebruiken
- Meerdere exports in één component hebben

---

## TOEGESTANE STRUCTUUR

### Layout
- Eén centrale ProductLayout
- ProductLayout bepaalt ALLEEN structuur
- ProductLayout bevat:
  - Navbar (component)
  - Page content
  - HtmlFooter (component)

### Footer
- ALLEEN HtmlFooter.tsx gebruiken
- NOOIT footer-HTML in JSON
- NOOIT meerdere footers renderen

### Navbar
- CSS-only voor desktop dropdowns
- Mobile menu met minimale state (1 boolean)
- GEEN JS voor hover
- GEEN afwijkende links

---

## CONTENT REGELS

- Alle productcontent komt uit:
  spaansetuinen-next/content/{slug}.json
- JSON bevat ALLEEN content, geen layout
- Layout leest JSON, JSON stuurt layout NIET

---

## ROUTING REGELS (Next.js)

- Landing page: /
- Productpagina’s: /bomen/[slug]
- Over ons: /over-ons
- NOOIT:
  - index.html
  - .html extensies
  - hash-links

---

## WERKWIJZE BIJ ELKE OPDRACHT

1. Lees dit document
2. Voer exact de gevraagde taak uit
3. Pas alleen genoemde bestanden aan
4. Stop direct na uitvoering
5. Rapporteer:
   - Welke bestanden aangepast
   - Wat is veranderd
   - Wat is NIET veranderd

---

## STOPREGEL

Na afronden van een taak:
- STOP
- DOE NIETS MEER UIT JEZELF
- WACHT OP VOLGENDE INSTRUCTIE

---

EINDE DOCUMENT

---

RAPPORTAGE (KORT):
- Bestand aangemaakt: JA/NEE
- Pad correct: JA/NEE

STOP.
