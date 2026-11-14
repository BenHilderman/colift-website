# CoLift website deployment

This is a static HTML/CSS/JS site. It has no dependency install or application build step.

## Production

- Public domain: `https://colift.fit/`.
- Source: `BenHilderman/colift-website`, branch `main`.
- Cloudflare Workers Builds is connected to the repository. Preserve the service name and assets configuration in `wrangler.jsonc`.
- GitHub Pages also builds `main` at the repository root. Preserve `CNAME`, `.nojekyll`, the universal-link files and existing invite paths.
- Commit and push validated changes to `main`. Inspect the `Workers Builds: colift-website` check, then verify the live domain and its referenced assets. A successful GitHub Pages mirror alone does not verify the custom-domain deployment.

## Local review

Run `python3 -m http.server 8802 --bind 127.0.0.1` from the repository root.

Review the homepage at phone and desktop widths, screenshot enlargement, FAQ controls and download links. Check `/i/` with a valid replay payload and with untrusted display text; input must remain text, not HTML. Check support and legal links. No waitlist submission, account creation or purchase is needed for QA.

## Content and assets

- `index.html` and `marketing.css`: current workout-loop marketing page.
- `styles.css`: shared styling retained for support, legal and invite pages.
- `app.js`: App Store/campaign links, existing invite-page compatibility and auth-return cleanup; homepage screenshot dialog.
- `assets/screens/2026-11-preview/`: captures of actual current app UI. Sample and illustrative content is labelled; these preview an upcoming update.
- `_handoff/screenshot-provenance.json`: capture provenance and asset hashes.
- `_handoff/og-workout-loop.html`: source layout for the social preview PNG.
- `assets/og-workout-loop-20261114.png`: versioned Open Graph/Twitter image.

## Availability and data

The public App Store app is available for iPhone. Homepage calls to action are ordinary working links even without JavaScript. Do not restore an early-access email form on the homepage while the app is already available.

Video imports and new subscription purchases remain disabled. The site identifies these as upcoming and distinguishes preview screens from the current App Store version. It does not publish the app, enable backend flags or change subscription products.

Keep privacy, terms, deletion and safety links intact. The marketing update adds no advertising SDK, visitor tracking or email collection.
