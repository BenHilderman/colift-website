# CoLift — Brand & Design Tokens (for the website)

These are pulled directly from the live app so the site matches it 1:1.

## Logo / wordmark
- `assets/logo.png` — the icon + **COLIFT** wordmark lockup (gradient, transparent bg). Use in the top-left nav and the footer.
- `assets/icon.png` — 1024px app icon. Use for favicon, `apple-touch-icon`, and the OG/Twitter share image base.
- Wordmark is always uppercase **COLIFT**. Never recolor it solid; it carries the brand gradient.

## Color
Dark theme only (the app is dark-mode only — the site should be too).
- Background base: `#0E0E14` → `#08080B` (vertical gradient). Page bg:
  `radial-gradient(125% 85% at 50% -12%, rgba(119,0,255,0.12), rgba(119,0,255,0) 55%), linear-gradient(180deg,#0E0E14,#08080B)`
- Text: white `#FFFFFF`; dim `rgba(255,255,255,0.68)`; faint `rgba(255,255,255,0.48)`.
- Card surface: `rgba(255,255,255,0.065)` with border `0.5px solid rgba(255,255,255,0.20)`.

## Brand gradient (the signature)
- Primary CTA / accents: `linear-gradient(135deg, #FF00DD, #CC00FF 52%, #7700FF)`
- Gradient text (headlines accent): `linear-gradient(180deg, #BB00FF, #FF00DD)` via `background-clip:text`.
- Logo gradient: `linear-gradient(180deg, #7700FF, #CC00FF, #FF00DD)`
- Accent hexes: magenta `#FF00DD`, mid `#CC00FF`, purple `#7700FF`.
- Button glow (under primary CTAs): `0 6px 22px rgba(204,0,255,0.45)`.

## Type
- Body / UI: **Barlow** (weights 400,500,600,700,800).
- Display / numbers / hero: **Barlow Condensed** (weights 700,800,900) — used for big headlines & stat numbers.
- Google Fonts: `https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap`
- Headlines: Barlow Condensed 800–900, tight letter-spacing (-0.5px), large.

## App screenshots (phone mockups) — `assets/screens/`
All 1206×2622 (@3x, iPhone 16 Pro frame-less). Drop into a phone frame or use bare with rounded corners + soft shadow.
- `home.png` — THE hero. Shows live presence ("Tyler's lifting now · Join"), friends rail, and a shared workout post. Lead with this.
- `dashboard.png` — CoLift+ analytics (streak, consistency, 8-week heatmap, PRs).
- `weight.png` — weight trend graph with goal line.
- `goals.png` — goal customization.
- `food.png` — food / macro logging.

## Voice
Warm, plain, non-coercive. Presence over performance. Never shamey, never hustle-culture. Short sentences. Lowercase-friendly but headlines can be bold. Examples in the app: "Better with a friend on it", "don't break the chain", "trust the trend".

## Vibe target
Minimal like the BeReal site: near-black, one strong gradient accent, huge type, lots of negative space, one or two phone mockups, a single clear CTA. No stock photos, no clutter, no carousels.
