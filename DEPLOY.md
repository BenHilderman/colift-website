# Ship CoLift.app — deploy notes

The site is a static folder. Nothing to build. To go live:

## 1. Fill 3 placeholders (in `app.js`, top of file)
- `WEB3FORMS_ACCESS_KEY` — free key from https://web3forms.com (paste your access key). Until then the waitlist will fail gracefully and tell people to email.
- `APP_STORE_LIVE` — leave `false` to show the waitlist. Flip to `true` (and set `APP_STORE_URL`) once the app is approved → the CTA becomes a Download-on-the-App-Store button everywhere automatically.
- `INSTAGRAM_URL` / `TIKTOK_URL` — your real handles (footer links).
- `CNAME` file — currently `colift.app`; change to whatever domain you buy.

## 2. Deploy to GitHub Pages
- Put this folder's contents in a repo (or a `/docs` folder / `gh-pages` branch).
- Repo → Settings → Pages → Source = your branch, root. Enable "Enforce HTTPS".
- Point your domain's DNS at GitHub Pages and keep the `CNAME` file. Done — auto-HTTPS.

## 3. Before App Store submission
- Paste these URLs into App Store Connect: Privacy Policy = `/privacy.html`, Support = `/support.html`. EULA/subscription terms live in `/terms.html`; account deletion at `/delete-account.html`.
- Have a human/lawyer review the 4 legal pages (they're marked DRAFT).

## App Store badge (when live)
The live-mode CTA uses a plain styled link as a placeholder. Apple **requires** you use their official downloadable badge (don't recreate it) — grab the SVG from developer.apple.com/app-store/marketing/guidelines and drop it into the `#store-badges` link in `index.html`.

## Note on assets
Screenshots use the app's **real bundled media** (gym moment photos, Maya) — re-captured from the live prototype, not placeholders. Step icons = Lucide; social icons = Lucide (Instagram) + Simple Icons (TikTok). Fonts = self-hosted Barlow. Scroll motion (hero load-in, reveals, subtle phone parallax, drifting hero glow) is all CSS/vanilla-JS and disabled under `prefers-reduced-motion`.

## What's where
- `index.html` `styles.css` `app.js` — the one-page site.
- `privacy/terms/support/delete-account.html` — required legal pages.
- `assets/` — `icon.png` (favicon/app icon), `og.png` (social share), `screens/` (real app shots), `fonts/` (self-hosted Barlow).
- `PLAN.md` / `BUILD_PROMPT.md` / `BRAND.md` — the research-backed plan, the original build prompt, and design tokens.
