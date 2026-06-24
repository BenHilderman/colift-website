# CoLift website — design-perfection prompt (paste into Claude)

> Open Claude Code with the working directory at this folder (`~/Downloads/colift-website/`), then paste everything below the line. The site is already built and deployed (colift.fit, GitHub Pages); your job is to make it visually flawless and fully on-strategy — refine, don't rebuild.

---

You are perfecting the **CoLift** marketing website to the visual quality of the **BeReal** and **Cal AI** sites. Be a ruthless visual critic: serve the site, take **full-resolution** screenshots at desktop (1280) and mobile (390) at 2× DPR, view crops at ~1:1, fix every spacing/alignment/type/contrast issue, and **repeat until there is nothing left to fix.** Refine the existing files — do not start from scratch.

## The product you're selling
CoLift is a social fitness app — you "train with a friend" asynchronously (BeReal, but for the gym). The MVP loop: **train with a friend (live or replay) → capture & share real moments → keep a streak together.** Philosophy: **presence over performance.** Free social core + a paid "CoLift+" tracking tier.

## Files (edit these — static HTML/CSS/vanilla-JS, no framework, no build)
`index.html`, `styles.css`, `app.js`, `privacy.html`, `terms.html`, `support.html`, `delete-account.html`, `guidelines.html`, `assets/`. Serve locally with `python3 -m http.server 5200` in this folder. Deploys to GitHub Pages at **colift.fit**.

## STRATEGY it must align with (non-negotiable)
1. **Cal AI skeleton + BeReal soul.** CoLift is new and may run creator ads, so it needs *conversion structure* (single page; the primary CTA repeated ~4×; ONE instantly-legible feature loop; an honest social-proof slot to fill post-launch; a creator-UGC slot for ad→site continuity) — dressed in **BeReal's authenticity voice** (manifesto, anti-highlight-reel). Why: BeReal grew organically so its site is a minimal manifesto; Cal AI converts warm ad traffic with proof + repeated installs. CoLift needs both.
2. **Highlight the MVP in this order — never bury Replay or Moments:** Live ("your friend's lifting now") → **Shared moments** (capture mid-set, front+back, unfiltered) → **Replay** (async — replay their exact workout) → Accountability (streak) → CoLift+ (tracking).
3. **Voice:** short, declarative, presence > performance. Name the enemy (the performative fitness highlight reel / training alone). No hype adjectives, no "crush it" bro-energy, no leaderboard/Strava framing. Warm and human.
4. **Honesty:** NO fabricated numbers, ratings, or testimonials (pre-launch). Use principle lines ("No ads. No fake friends. No leaderboards.") + a founder line. Swap in the real App Store rating only once it exists.
5. **CTA:** ONE primary action, repeated ~4× (nav, hero, mid-page, footer). "Get early access" → email waitlist (Web3Forms) now; it auto-swaps to the **official Apple App Store badge** when `APP_STORE_LIVE = true` in app.js.

## Brand & design system (match the app exactly)
- **Dark only.** Background `#000` with a soft radial purple glow behind the hero.
- **Accent gradient** `linear-gradient(135deg,#FF00DD,#CC00FF 52%,#7700FF)`; gradient text `linear-gradient(120deg,#FF3DEB,#B06CFF)`. Use the accent **sparingly** — one word per headline + the CTA.
- Text: `#fff` / `rgba(255,255,255,.68)` / `.48`.
- **Logo: use the REAL app logo lockup `assets/logo.png`** (mark + COLIFT gradient wordmark) in nav + footer. NEVER recreate "COLIFT" in a font. `assets/icon.png` is favicon / app-icon / mobile-bar only.
- **Fonts: self-hosted Barlow (body) + Barlow Condensed 800/900 (display).** Hero `clamp(58px,12vw,140px)`, line-height ~.9.

## Specs distilled from the real BeReal + Cal AI files (apply these exact values)
- **Frosted-glass sticky nav:** transparent over the hero → on scroll `rgba(0,0,0,.72)` + `backdrop-filter:blur(14px)` + 1px hairline border. ~64px tall.
- **Airy-but-tight vertical rhythm:** section padding **64–80px** (NOT 120 = looks empty; NOT <48 = cramped). Max content width 1100–1280px.
- **Gradient pill CTAs:** padding ~13×24px, radius 999px (or 16px), weight 800, soft glow shadow.
- **Bare phone screenshots, NO device frames:** rounded **28–32px** + shadow `0 22px 60px rgba(0,0,0,.5)`. **Uniform** — same size, same shadow, all **straight (no tilt)**. One per feature row, alternating left/right.
- **Motion (minimal, modern):** IntersectionObserver fade+rise (opacity 0→1, translateY 24→0, .6–.7s, `cubic-bezier(.22,1,.36,1)`), staggered ~100ms; gentle hero load-in; subtle phone parallax (±~20px). **Honor `prefers-reduced-motion` (disable all motion).** No heavy parallax.
- **Avoid:** feature tables, more than one CTA color, walls of text, stock photos, tilt gimmicks, large empty black gaps.

## Assets (in `assets/`)
`logo.png` (real lockup — nav/footer), `icon.png` (favicon), `og.png` (1200×630 share), `maya.jpg`, `fonts/` (Barlow woff2), `screens/` (real app shots with real gym photos): `home` (hero), `lobby` (live), `moments` (share/recap = shared moments), `replay` (Replay-together CTA), `us` (streak), `dashboard`/`weight`/`goals`/`food` (CoLift+).

## Section order (current — keep, refine)
Sticky nav → Hero (headline + sub + waitlist CTA + "Free. No card." + `home.png`) → "One workout. Two people." (3 steps w/ Lucide icons) → Live → Shared moments → Replay → Accountability → CoLift+ → Manifesto (+ "No ads. No fake friends. No leaderboards.") → FAQ accordions → Footer CTA ("Your friend's waiting. Get COLIFT.") → Footer (real logo, legal column, IG/TikTok icons).

## App Store / legal (must exist + be linked in the footer)
`privacy.html`, `terms.html` (incl. CoLift+ auto-renew subscription terms + EULA), `support.html`, `delete-account.html`, `guidelines.html` — all exist; keep them linked. (The app links to these from Settings + the paywall.)

## Constraints
Static HTML/CSS/vanilla-JS, **no dependencies/CDNs** (self-host fonts + icons). GitHub Pages + colift.fit + Web3Forms waitlist. Lighthouse ~100. Mobile-first (≈68% of traffic) with a sticky mobile download bar. Placeholders to leave for the founder (all in `app.js`): `WEB3FORMS_ACCESS_KEY`, `APP_STORE_LIVE` + `APP_STORE_URL`, `INSTAGRAM_URL`, `TIKTOK_URL`.

## Verify every iteration (this is the job)
1. Serve the folder; screenshot **desktop (1280)** + **mobile (390)** at 2× DPR.
2. For full-page screenshots, **force-load the lazy images first** (`img.loading='eager'; reassign src`) or they capture blank.
3. View crops at ~1:1 and critique strictly: alignment, spacing rhythm, type scale, gradient reads magenta→purple, screenshots crisp + uniform, nav/footer use `logo.png`, nothing overflows, **no JS/console errors, no failed asset requests**.
4. Test `prefers-reduced-motion`. Loop until flawless on both breakpoints.

## Pitfalls already learned (don't repeat them)
- Don't recreate the wordmark in a font — use `logo.png`.
- Don't leave big black gaps (reads as unfinished) — airy but tight.
- Keep phone mockups uniform and straight; no tilt.
- `colift.app.official@gmail.com` is the support EMAIL, not the domain — never domain-swap it. The domain is **colift.fit**.
- Real screenshots only (the app's actual screens with real gym photos are already in `assets/screens/`).
