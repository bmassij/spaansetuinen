# Logo experiment — documentatie

Bestanden aangepast/aangemaakt

- `plans/logo-experiment.css` — nieuw: experimentele CSS-regels toegepast
- `spaansetuinen-next/app/layout.tsx` — tijdelijke import toegevoegd: `../../plans/logo-experiment.css`

Exacte CSS-regels (gekopieerd uit `plans/logo-experiment.css`)

```css
/* Logo container: preserve original footprint (140x140) so header height is unchanged */
nav .flex.items-center.h-full > a[aria-label="Home"] {
  display: block;
  position: relative; /* anchor for absolute img */
  width: 140px;
  height: 140px;
  flex: 0 0 140px; /* keep in flex flow as original */
  z-index: 20; /* below menu (menu will use higher z-index) */
}

/* Logo image: remove from layout flow, visually scale, keep top-left anchor */
nav .flex.items-center.h-full > a[aria-label="Home"] img {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: top left;
  transform: scale(3); /* 3x; adjust to 4 if needed */
  will-change: transform;
  pointer-events: none; /* do not block menu clicks */
  z-index: 10; /* underneath menu which will have higher z-index */
}

/* Ensure the nav/menu remains on top and unaffected */
nav {
  position: relative;
  z-index: 40;
}

/* Constrain right-side menu container: never allow it to start left of 2/3 viewport */
@media (min-width: 1024px) {
  nav .flex.justify-between > .flex.items-start.ml-auto {
    max-width: calc(66.6666667vw);
    margin-left: auto;
    box-sizing: border-box;
  }

  nav [role="menubar"] {
    white-space: nowrap;
    position: relative;
    z-index: 60;
  }
}

/* Mobile: reduce scale to avoid excessive overlap */
@media (max-width: 1023px) {
  nav .flex.items-center.h-full > a[aria-label="Home"] img {
    transform: scale(1.6);
  }

  nav .flex.justify-between > .flex.items-start.ml-auto {
    max-width: none;
  }
}
```

Wat is gedaan (kort)

- CSS-bestand `plans/logo-experiment.css` aangemaakt met regels die:
  - het logo visueel opschalen via `transform: scale(...)` en positioneren via `position:absolute` binnen de bestaande anchor
  - ervoor zorgen dat de logo-container haar originele footprint behoudt (geen layout-shift)
  - het vergrote logo pointer-events uitschakelt zodat menu-kliks niet worden geblokkeerd
  - de menu-ruimte beperkt met `max-width: calc(66.6666667vw)` zodat de linkergrens van het menu nooit voorbij 2/3 van de viewport komt
- tijdelijke import toegevoegd in `spaansetuinen-next/app/layout.tsx` zodat de CSS lokaal geladen wordt voor experiment

Wat werkte / beoordeling (objectief)

- De CSS is aanwezig en correct geplaatst in de codebase.
- Regels zijn CSS-only en voldoen aan de technische randvoorwaarden (geen JS).
- De aanpak gebruikt transform/absolute positioning waardoor het logo visueel dominant wordt zonder layout-space toe te nemen (conform verwachting).

Problemen / beperkingen bij verificatie

- Bij het starten van de dev-server traden interne Next.js bundler-fouten op (React Client Manifest: ontbrekende modules). Hierdoor kon de pagina niet volledig gerenderd worden in de lokale dev-server en kon ik de visuele resultaten niet live verifiëren.
- Zonder succesvolle lokale render is het niet met 100% zekerheid vast te stellen of er bij alle viewports geen overlap/klikproblemen optreden.

Conclusie (feitelijk)

- De toegepaste CSS volgt het gevraagde experiment: vergroot het logo visueel, behoudt header flow en beperkt de menubreedte met een harde linkerstop op 2/3 viewport.
- Door bundlerfouten kon ik de laatste visuele checks niet uitvoeren; daarom is er nog geen definitieve bevestiging dat alle acceptatiecriteria (geen overlap, menu-items altijd klikbaar op alle viewports, geen layout shifts tijdens resize) gehaald zijn.

Volgende stappen (niet uitgevoerd)

- Reproduceer de lokale bundlerfout oplossen en herstart dev-server
- Controleer desktop + responsive viewports (test klikbaarheid, geen layout-shift)
- Indien bevestigd: commit lokaal op branch `experiment/logo-scale` en lever diff/patch aan

-- einde --
