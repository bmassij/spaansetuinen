# Kenmerken Component Refactoring

**Datum**: 2026-01-23  
**Doel**: Centraliseren van Kenmerken-blok in herbruikbare component

## Uitgevoerde Wijzigingen

### 1. Nieuw Component: TreeKenmerken.tsx
**Locatie**: `components/TreeKenmerken.tsx`

**Props**:
- `items: string[]` - lijst van kenmerken (verplicht)
- `heading?: string` - optionele heading (default: "BELANGRIJKE EIGENSCHAPPEN")
- `content?: string` - optionele beschrijving voor Format B data
- `variant?: 'white' | 'blue'` - kleurvariant (default: 'white')

**Functionaliteit**:
- Rendert kenmerken-lijst met checkmarks
- Ondersteunt beide dataformaten (A: alleen list, B: list + content)
- Class-based kleurvariant systeem (geen inline Tailwind colors)
- Pixel-identieke output aan originele implementatie

### 2. ProductLayout.tsx Aanpassingen
**Wijzigingen**:
- Extract `kenmerken.heading` en `kenmerken.content` uit JSON
- Doorgeven als aparte props aan ProductTemplate
- Zowel voor tree-pages als non-tree pages

**Voor tree pages**:
```typescript
kenmerkenHeading: page?.kenmerken?.heading ?? undefined,
kenmerkenContent: page?.kenmerken?.content ?? undefined,
```

**Voor non-tree pages**:
```typescript
kenmerkenHeading: (page?.kenmerken && typeof page.kenmerken === 'object' && !Array.isArray(page.kenmerken)) ? page.kenmerken.heading : undefined,
kenmerkenContent: (page?.kenmerken && typeof page.kenmerken === 'object' && !Array.isArray(page.kenmerken)) ? page.kenmerken.content : undefined,
```

### 3. ProductTemplate.tsx Refactoring
**Wijzigingen**:
- Import van TreeKenmerken component
- Uitbreiding ProductProps type met `kenmerkenHeading?` en `kenmerkenContent?`
- Verwijdering van 2x gedupliceerde inline JSX (regels 248-259 en 500-512)
- Vervanging door TreeKenmerken component calls

**Tree page mode** (regel ~248):
```tsx
<TreeKenmerken 
  items={kenmerken || []} 
  heading={kenmerkenHeading}
  content={kenmerkenContent}
  variant="white"
/>
```

**Non-tree page mode** (regel ~500):
```tsx
{hasKenmerken && (
  <TreeKenmerken 
    items={kenmerken || []} 
    heading={kenmerkenHeading || 'Kenmerken'}
    content={kenmerkenContent}
    variant="white"
  />
)}
```

## Dataformaten Support

### Format A (meeste bomenpagina's)
```json
{
  "kenmerken": {
    "heading": "BELANGRIJKE EIGENSCHAPPEN",
    "list": ["Winterhard tot -15 °C", "Grijsgroene bladeren"]
  }
}
```

### Format B (enkele palm-pagina's)
```json
{
  "kenmerken": {
    "heading": "Kenmerken",
    "content": "Beschrijvende tekst",
    "list": ["Waaiervormig blad", "Meerdere stammen"]
  }
}
```

Beide formaten worden nu correct verwerkt.

## Kleurvariant Systeem

**Huidige implementatie**:
- `variant="white"` → `bg-emerald-50` (huidige groene tint)
- `variant="blue"` → `bg-blue-50` (toekomstige optie)

**Gebruik**:
Om kleur te wijzigen: alleen `variant` prop aanpassen, geen content wijzigingen nodig.

```tsx
<TreeKenmerken items={...} variant="blue" />
```

## Voordelen

1. **DRY Principe**: Geen duplicatie meer van rendering logic
2. **Single Responsibility**: Kenmerken-rendering gescheiden van template orchestratie
3. **Configureerbaar**: Heading en content via data, niet hardcoded
4. **Onderhoudbaar**: Eén component = één bron van waarheid
5. **Toekomstbestendig**: Kleurvariant systeem zonder code-wijzigingen
6. **Backward Compatible**: Bestaande output blijft pixel-identiek

## Validatie

- ✅ Visuele output identiek aan origineel
- ✅ Geen wijzigingen aan content JSON files
- ✅ Beide dataformaten ondersteund
- ✅ Template LOCKED status gerespecteerd
- ✅ Duplicatie verwijderd

## Niet Gewijzigd

- Individuele JSON content bestanden
- Layout structuur van ProductTemplate
- DOM volgorde van secties
- Styling van andere componenten
- Page routing of data loading
