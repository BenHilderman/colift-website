# CoLift Official Website — Plan (research-backed)

Goal: a **very simple, BeReal-style** official site for CoLift. Single page, near-black, one gradient accent, huge type, one or two phone mockups, one clear CTA.

## Decisions (locked)
- **One page** (`index.html`) + a few legal pages. No framework, no build step — plain HTML + CSS.
- **Host:** GitHub Pages (you already use it) on a custom domain (you'll provide the URL). Auto-HTTPS via repo settings + `CNAME`.
- **Waitlist/email:** Web3Forms (you already use it) — a hidden-input POST that works on static hosts. Primary CTA is the **waitlist** until the app is live, then swap in the **App Store badge** (the markup supports both; just flip one flag).
- **Theme:** dark only (matches the app). Brand gradient `#FF00DD → #CC00FF → #7700FF`. Fonts **Barlow** + **Barlow Condensed** (self-hosted woff2 to avoid the WKWebView font issue we hit before).
- Real app screenshots as the visuals (in `assets/screens/`). No stock photos.

## Why BeReal-style (research)
BeReal/Cal AI/Partiful sites are all **single-page, ~6–8 blocks**: a 2–3-word hero headline + one-line subhead + ONE CTA above the fold, then 3–5 feature beats (one phrase + one screenshot each), one honest social-proof unit, a slim footer whose only required column is Legal. They **cut** feature tables, pricing grids, blogs, multi-page nav, hamburger menus, and fabricated metrics. Sells a feeling, not a spec sheet.

## Sitemap — single page, in order
1. **Sticky mini-nav** — COLIFT wordmark left; right = "FAQ" link + small "Get the app / Join" button. No hamburger.
2. **Hero** — headline + one-line subhead + primary CTA (waitlist field → App Store badge later) + the `home.png` phone mockup. One reassurance line: "No ads. No fake friends."
3. **Feature beat — Presence:** "Just show up." → `home.png` (live "Tyler's lifting now · Join").
4. **Feature beat — Async:** "Train on your own time, together." → a post/feed screenshot.
5. **Feature beat — Accountability:** "Harder to skip when someone's counting on you." → `dashboard.png` (streak/heatmap).
6. **CoLift+ (optional mini-beat):** "Go deeper when you're ready." → `weight.png` / `goals.png` / `food.png`. Keep it one row; do NOT make a pricing page.
7. **Social proof** — ONE honest unit (no fake numbers): founder line "Built by lifters who hated training alone" + waitlist note; swap to the real App Store rating badge once it exists.
8. **Closing CTA** — repeat waitlist/App Store + one warm line.
9. **FAQ** — 5–7 collapsible `<details>` items (list below).
10. **Footer** — wordmark + **Legal** column + contact email + socials.

## Required pages for App Store approval (separate URLs — build these too)
Apple will reject without these; they must be live + linked in the footer + pasted into App Store Connect:
- `/privacy.html` — Privacy Policy (required for every app).
- `/terms.html` — Terms of Use / EULA (required: CoLift+ is auto-renewing; also covers user content).
- `/support.html` — Support/contact with a real method (required support URL).
- `/delete-account.html` — account-deletion page (Apple requires in-app deletion since Jun 30 2022; the web page documents/links it).
- Subscription terms (price, period, auto-renew, cancel) can live inside `/terms.html` or a CoLift+ section.
- Optional easy win: `/guidelines.html` (community guidelines) — helps the UGC-safety review.
> I'll stub these with solid starter copy in the build prompt; have a human/lawyer review before submission.

## Copy
**Value prop:** "CoLift is the social fitness app where you train with a friend — even at different gyms, at different times."

**Hero (recommended — option A):**
- Headline: **Never train alone.**
- Subhead: "CoLift pairs you with a friend so every workout is shared — even when you're miles and hours apart."
- (Alternates if you prefer: "Train together. Apart." / "Harder to skip when someone's counting on you." / "It's not about the numbers. It's about showing up.")

**Primary CTA:** waitlist field ("Join the waitlist" → "Be first in when CoLift opens") now; official App Store badge when live. Secondary: "How it works ↓".

**FAQ:**
1. What is CoLift? — Social fitness app where you train with a friend asynchronously — like BeReal, but for the gym.
2. Do we have to work out at the same time/place? — No, it's async: different gyms, different times.
3. Is it free? — Yes for the core (presence, invites, feed, streaks). CoLift+ unlocks tracking/analytics/food + weight logging (~$60/yr, 14-day free trial, no card).
4. What's "presence over performance"? — It rewards showing up, not your weights or PRs.
5. Is my data private? — You control who sees your workouts. (link Privacy)
6. How do I cancel CoLift+ / delete my account? — Cancel in iOS Settings; delete in-app (link `/delete-account`).
7. When does it launch? — Join the waitlist / download on the App Store.

## Assets (in `assets/`)
- `logo.png` (icon + COLIFT wordmark, transparent), `icon.png` (1024px app icon → favicon/apple-touch/OG base), `maya.jpg` (the coach), `BRAND.md` (all tokens), `screens/` (home, dashboard, weight, goals, food — 1206×2622 @3x).

## Acceptance criteria
Mobile-first responsive; Lighthouse ~100; valid OG/Twitter tags + one 1200×630 og-image; favicon + apple-touch-icon; self-hosted fonts; all 4 legal pages live + linked; waitlist form posts to Web3Forms; single primary-CTA color; no fabricated stats.
