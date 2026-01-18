# Legacy HTML gearchiveerd

De legacy HTML-versie van de website is extern gearchiveerd en wordt bewust NIET opgenomen in deze repository.

Kort: de repository gebruikt nu uitsluitend JSON-content voor de Next.js-app.

Belangrijk:
- Actieve app-content staat in: `spaansetuinen-next/content/` (JSON-bestanden).
- Er bestaan nog migratie- en audit-artifacten in de repo (bewust behouden):
  - `website_audit/`
  - `website_final_texts/`
  - sommige bestanden en scripts verwijzen nog naar `website/` of `website/public` (bijv. scripts, README, fix_*.py). Deze verwijzingen zijn informatief en mogen pas verwijderd worden na expliciete goedkeuring.
  - sommige content JSON-bestanden bevatten nog velden `filename` en `html` met de oude .html inhoud; dit zijn migratie-artifacten en worden niet gebruikt door de content-engine.

Waarom:
- Voorkomt dubbele content en verwarring
- Verbetert veiligheid en compliance (geen oude, onvervangde HTML in repo)
- Maakt duidelijk dat content-engine JSON gebruikt

Aanbeveling:
- Verwijder of archiveer `website/` en andere legacy mappen pas na expliciete schriftelijke toestemming. Voor nu zijn only read-only artifacts behouden voor audit/doelstellingen.
- Als je wilt kan ik een lijst genereren van alle bestanden die nog expliciet verwijzen naar `website/`, `website/public` of `index.html`.

Datum: 2026-01-18
