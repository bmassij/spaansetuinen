Roo Rules — Spaanse Tuin & Zo (LEIDEND DOCUMENT)
DOEL VAN DIT DOCUMENT
Dit document is de ENIGE bron van waarheid voor hoe Roo Code mag werken
binnen het project spaansetuinen-next.
Afwijken is NIET toegestaan.
________________________________________
PROJECTCONTEXT
•	Dit project migreert een bestaande HTML-website naar Next.js
•	De oude HTML-site is GEEN template, GEEN fallback en GEEN bron
•	De nieuwe site is:
o	component-based
o	content-gestuurd
o	schaalbaar
•	Layout, content en assets zijn strikt gescheiden
Er is altijd maar één bron van waarheid per type.
________________________________________
ALGEMENE PRINCIPES
•	Layout ≠ content ≠ assets ≠ audits
•	Roo voert alleen expliciet gevraagde taken uit
•	Roo neemt NOOIT initiatief
•	Roo stopt altijd na afronden van de opdracht
•	Wat niet expliciet is toegestaan, is verboden
________________________________________
VERBODEN ACTIES (ABSOLUUT)
Roo Code MAG NOOIT:
•	HTML renderen of injecteren (dangerouslySetInnerHTML)
•	Legacy HTML lezen als content- of layoutbron
•	.html links of hash-links (#) gebruiken
•	Oude HTML-pagina’s gebruiken als referentie
•	Audit-bestanden renderen of hergebruiken
•	Teksten herschrijven zonder expliciete opdracht
•	Layout aanpassen zonder heropening van de fase
•	Zelf routes bedenken
•	Componenten “verbeteren”
•	Meerdere navbars of footers renderen
•	Inline scripts of styles toevoegen
•	Afbeeldingen automatisch koppelen
•	Bestanden aanpassen die niet expliciet genoemd zijn
•	Meerdere exports in één component gebruiken
________________________________________
TOEGESTANE STRUCTUUR
Runtime-app (ENIGE actieve applicatie)
spaansetuinen-next/
Alles buiten deze map is GEEN runtime.
________________________________________
LAYOUT REGELS
Algemene layout
•	Layout bepaalt ALLEEN structuur
•	Layout bevat GEEN content
•	Layout leest JSON, JSON stuurt layout NIET
ProductLayout
•	Er is één ProductLayout
•	Alle productpagina’s gebruiken ProductLayout
•	ProductLayout bevat:
o	Navbar
o	Page content
o	HtmlFooter
________________________________________
FOOTER REGELS
•	ALLEEN HtmlFooter.tsx gebruiken
•	NOOIT footer-HTML in JSON
•	NOOIT meerdere footers renderen
•	Footer bevat GEEN contentlogica
________________________________________
NAVBAR REGELS
•	CSS-only hover voor desktop
•	Mobile menu:
o	maximaal 1 boolean state
•	GEEN JS voor hover
•	GEEN afwijkende of geïmproviseerde links
•	NOOIT .html links
•	NOOIT hash-links (#)
________________________________________
CONTENT REGELS (ZEER BELANGRIJK)
•	ALLE renderbare content komt UITSLUITEND uit:
spaansetuinen-next/content/*.json
•	JSON bevat:
o	alleen tekstuele content
o	GEEN HTML
o	GEEN layout
o	GEEN styles
•	Content wordt:
o	1-op-1 gemigreerd
o	PAS NA migratie verbeterd (indien gevraagd)
________________________________________
ROUTING REGELS (Next.js App Router)
Toegestane routes:
•	/ → home
•	/assortiment
•	/over-ons
•	/contact
•	/bomen
•	/bomen/[slug]
NOOIT toegestaan:
•	index.html
•	.html extensies
•	hash-links (#)
•	alternatieve paden
________________________________________
AFBEELDINGEN & ASSETS (STRICT)
Roo Code MAG GEEN afbeeldingen gebruiken, verplaatsen of koppelen uit:
•	opdrachten/
•	screenshots/
•	website_audit/
•	website_final_texts/
•	losse .png, .jpg, .webp buiten Next.js
Toegestaan
•	Afbeeldingen uitsluitend in:
spaansetuinen-next/public/
Regels
•	Afbeeldingen worden NOOIT hardcoded in JSX
•	Afbeeldingen worden NOOIT automatisch gekoppeld
•	JSON mag hoogstens een image-id bevatten
•	Afbeeldingen worden PAS toegevoegd na expliciete opdracht
________________________________________
AUDITS & DOCUMENTATIE (HARD AFGESCHERMD)
De volgende mappen/bestanden zijn ANALYSE-ONLY:
•	opdrachten/
•	website_audit/
•	website_final_texts/
•	screenshots/
•	docs/
•	*.docx
•	*.md (behalve Roo Rules zelf)
Deze mogen:
•	gelezen worden
•	geanalyseerd worden
•	samengevat worden
Deze mogen NOOIT:
•	gerenderd worden
•	geïmporteerd worden in app/ of components/
•	dienen als fallback
•	automatisch worden hergebruikt
________________________________________
LEGACY HTML (VOLLEDIG VERBODEN)
•	Legacy HTML bestaat NIET binnen deze repo
•	HTML is extern gearchiveerd
•	Roo mag HTML NOOIT:
o	lezen
o	parsen
o	renderen
o	hergebruiken
HTML mag alleen terugkomen na expliciete, handmatige toestemming.
________________________________________
WERKWIJZE BIJ ELKE OPDRACHT
Roo moet ALTIJD:
1.	Dit document lezen
2.	De opdracht exact uitvoeren
3.	Alleen expliciet genoemde bestanden aanpassen
4.	Stoppen na afronding
5.	Rapporteren:
o	Welke bestanden zijn aangepast
o	Wat is veranderd
o	Wat is NIET veranderd
________________________________________
STOPREGEL (ABSOLUUT)
Na afronding van een taak:
•	STOP
•	DOE NIETS MEER UIT JEZELF
•	WACHT OP VOLGENDE INSTRUCTIE
________________________________________
RAPPORTAGEFORMAT (KORT)
•	Bestand aangemaakt: JA / NEE
•	Pad correct: JA / NEE
•	Legacy HTML gebruikt: NEE
•	Audit-bron gebruikt: NEE
________________________________________
EINDE DOCUMENT

