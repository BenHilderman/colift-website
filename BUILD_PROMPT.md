# Build prompt — paste this into a fresh Claude Code session

> Open Claude Code with the working directory set to this folder (`~/Downloads/colift-website/`), then paste everything below the line. Everything it needs (brand tokens, logo, app icon, real app screenshots) is already in `assets/`.

---

Build the official marketing website for **CoLift**, a social fitness iOS app where you "train with a friend" asynchronously — like BeReal, but for the gym. Make it **very simple and minimal, in the style of the BeReal website** (bereal.com): a single page, near-black background, one vivid gradient accent, huge type, generous whitespace, real phone screenshots, and ONE clear call-to-action. No clutter, no carousels, no stock photos, no feature tables, no fabricated numbers.

## Use these assets (already in `assets/`)
- `assets/BRAND.md` — read this first. All colors, the brand gradient, fonts, and voice. Match the app 1:1.
- `assets/logo.png` — COLIFT wordmark lockup (nav + footer).
- `assets/icon.png` — 1024px app icon → favicon, apple-touch-icon, and base for the OG image.
- `assets/maya.jpg` — the in-app coach (optional, for a "meet your coach" touch — don't overuse).
- `assets/screens/` — real app screenshots @3x (1206×2622): `home.png` (hero — live presence + friends + shared post), `dashboard.png` (streak/heatmap/PRs), `weight.png` (trend graph), `goals.png`, `food.png`. Show them in subtle rounded "phone" frames with a soft shadow; never stretch.

## Tech (keep it dead simple)
- **Plain static HTML + CSS. No framework, no build step, no node_modules.** One `index.html` + one `styles.css` (+ legal pages). It must deploy to **GitHub Pages** as-is.
- **Self-host the fonts** (download Barlow + Barlow Condensed woff2 into `assets/fonts/` and `@font-face` them — do NOT rely on the Google Fonts network request; the app had WKWebView font issues).
- Dark theme only. Mobile-first, fully responsive (looks great at 380px and on desktop). Target Lighthouse ~100.
- Tiny vanilla JS only where needed (sticky-nav shadow on scroll, FAQ `<details>`, smooth-scroll). No dependencies.

## Page structure (single page, in this order)
1. **Sticky mini-nav:** COLIFT wordmark left; right = "FAQ" text link + a small gradient "Join the waitlist" button. No hamburger.
2. **Hero (above the fold):**
   - Headline (Barlow Condensed, huge, with the brand gradient on the key words): **"Never train alone."**
   - Subhead: "CoLift pairs you with a friend so every workout is shared — even when you're miles and hours apart."
   - Primary CTA: a **waitlist email field + button** wired to **Web3Forms** (see below). Put an `APP_STORE_LIVE` boolean/flag at the top of the JS: when true, hide the waitlist and show the official **"Download on the App Store" badge** linking to `APP_STORE_URL` (leave a placeholder constant). Secondary text link: "How it works ↓" (smooth-scroll).
   - Reassurance line under the CTA: "No ads. No fake friends."
   - The `home.png` mockup beside/below the copy.
3. **Feature beat — Presence:** big line "Just show up." + one line + `home.png` (or a cropped detail showing "Tyler's lifting now · Join").
4. **Feature beat — Async:** "Train on your own time, together." + one line + a feed/post screenshot.
5. **Feature beat — Accountability:** "Harder to skip when someone's counting on you." + one line + `dashboard.png`.
6. **CoLift+ (one compact row, NOT a pricing page):** "Go deeper when you're ready." + one line + a small trio of `weight.png` / `goals.png` / `food.png`. Mention "free 14-day trial, no card" in small text. Do not build a pricing table.
7. **Social proof (honest — NO fake metrics):** a single line like "Built by lifters who hated training alone." + the waitlist note. Leave a clearly-marked TODO block to swap in the real App Store rating badge once it exists.
8. **Closing CTA:** repeat the waitlist field / App Store badge + one warm line.
9. **FAQ:** 5–7 collapsible `<details>` items — use the copy in `PLAN.md`.
10. **Footer:** wordmark + a **Legal** column (Privacy, Terms, Support, Delete account) + a contact email (`colift.app.official@gmail.com`) + social placeholders. Tiny "© 2026 CoLift".

## Waitlist (Web3Forms)
Use a Web3Forms POST form (static-host friendly). Put `WEB3FORMS_ACCESS_KEY` as a clearly-labeled placeholder constant the founder will fill in. On submit, show an inline success state ("You're on the list 🎟️ — we'll email you when CoLift opens."). No page reload, graceful error handling.

## Required legal/support pages (build these as separate files — Apple will reject the app without them)
Create `privacy.html`, `terms.html`, `support.html`, `delete-account.html` sharing the site's header/footer + a simple readable text layout. Write solid, honest **starter** copy (clearly marked "DRAFT — review before submission"):
- **privacy.html** — what's collected (account, workouts, optional photos, food/weight logs), how it's used, who sees what (user-controlled), no selling data, contact, deletion link.
- **terms.html** — usage terms, user-generated-content rules, and a **CoLift+ subscription section**: auto-renewing, the price/period, "billed through your Apple Account, cancel anytime in iOS Settings ≥24h before renewal." Include a short EULA.
- **support.html** — contact email + a few troubleshooting FAQs + "manage/cancel CoLift+ in iOS Settings."
- **delete-account.html** — exact steps to delete in-app (Settings ⚙ → Delete account → type DELETE) and what gets erased; note it's permanent.
(Optional: `guidelines.html` community guidelines — strengthens the UGC review.)

## SEO / sharing / polish
- `<title>` "CoLift — Never train alone" + meta description.
- Open Graph + Twitter card tags; create one **1200×630 `assets/og.png`** (dark bg + brand gradient + COLIFT wordmark + "Never train alone.").
- favicon + apple-touch-icon from `icon.png`; `robots.txt` + `sitemap.xml`; a `CNAME` file placeholder for the custom domain.
- Respect `prefers-reduced-motion`. Subtle only: a faint radial purple glow behind the hero (matches the app's `--app-bg`), gentle fade-ins on scroll. Nothing flashy.

## Verify before done
Open `index.html` in a browser at 390px (mobile) and ~1280px (desktop), screenshot both, and confirm: hero headline + single CTA visible above the fold, gradient reads purple→magenta, screenshots crisp in their frames, FAQ expands, footer legal links resolve to the four pages, waitlist form is present. List anything still needing the founder (Web3Forms key, App Store URL, custom domain, legal review).

Keep the whole thing tight, fast, and unmistakably CoLift. When in doubt, do LESS — match BeReal's restraint.
