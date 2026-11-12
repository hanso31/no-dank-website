# no dank. — Farbpalette (final, Website nodank.ch)

Stand: 2026-11-12 · Verwendet in `styles.css` (`:root`-Tokens) und allen Assets.
Das echte Logo (`assets/logo.svg`, `assets/icon.svg`) verwendet ausschliesslich
die Markenfarben 1–4 — die Erweiterungen 5–7 harmonieren damit.

## Markenfarben (Original, unverändert)

| # | Name   | Hex       | Verwendung                                              |
|---|--------|-----------|---------------------------------------------------------|
| 1 | Rauch  | `#6B645A` | Wortmarke „no", Sekundärtext, Icons, Illustrationen     |
| 2 | Stein  | `#948B7E` | Wortmarke „dank", dezente Flächen, Granulat-Illustration|
| 3 | Lime   | `#D8FF3E` | Akzent (~5 %): Gestankpunkte, Logo-Punkt, Highlights, CTA|
| 4 | Papier | `#EFEAE0` | Seitenhintergrund                                       |

## Erweiterungen (neu, für die Website)

| # | Name        | Hex                    | Begründung / Verwendung                                    |
|---|-------------|------------------------|------------------------------------------------------------|
| 5 | Kohle       | `#2B2723`              | **Einzige neue Farbe.** Vertieftes Rauch-Schwarz für Fliesstext, Headlines und die dunkle Sicherheits-Sektion. Reine Abdunklung von Rauch — keine neue Farbfamilie, kein reines Schwarz (weicher zu Papier). |
| 6 | Papier-2    | `#E7E1D6`              | Abgeleitet aus Papier: alternierende Sektionen, Kartenfüllungen. |
| 7 | Stein-hell  | `#C9C2B7`              | Abgeleitet aus Stein: Hairlines, Borders, dezente Icons.    |

Dazu kommen zwei transparente Ableitungen (keine eigenen Farben):
`--rauch-tint: rgba(107,100,90,.08)` für Chips/Hoverflächen und
`rgba(216,255,62,.16)` für die Lime-Callouts.

## Regeln

- Lime max. ~5 % der Fläche, nie als Hintergrund grossflächig, nie als Text auf Papier (nur auf Kohle oder als Grafik).
- Kein Grün, kein Hanf-Grün, kein Rauch-Verlauf — Stimmung: dezent, trocken, wissenschaftlich.
- Text auf Papier: Kohle (Kontrast ≈ 13:1) oder Rauch für Sekundäres.
- Text auf Kohle: Papier; Akzente nur Lime oder Stein-hell.
