# Pawly — session memory

Shopify theme for **Pawly** · `getpawly.co.il` · Basic plan · **ILS (₪)** · Israel only · **Hebrew, RTL only**.

Read this before touching anything.

---

## 1. The anti-loss protocol — highest priority

The merchant has lost their work twice. Same five causes both times.

### No React. Ever.
This is a Liquid theme. There is no React runtime, no Tailwind build, no `next/image`.
Any component supplied as React/JSX is a **spec of behaviour**, not code to paste.
Zero JSX, zero `framer-motion`, zero `motion/react`, zero Tailwind classes anywhere in `theme/`.

### No ZIP uploads.
A ZIP upload creates a *new* theme with default settings and abandons every Theme Editor
customisation. Deploy with the CLI only:

```bash
npm i -g @shopify/cli @shopify/theme
shopify theme pull --store getpawly.myshopify.com --theme <UNPUBLISHED_ID>   # ALWAYS first
shopify theme dev  --store getpawly.myshopify.com                            # verify visually
shopify theme push --store getpawly.myshopify.com --theme <UNPUBLISHED_ID>   # never --live
```

### Pull before every editing session.
The Theme Editor rewrites `templates/*.json` and `config/settings_data.json` server-side.
Those paths are in `theme/.shopifyignore` and are pushed **once**, on first deploy, never again.

### Nothing is hardcoded.
Every heading, image, CTA label and colour is a `{% schema %}` setting or a key in
`locales/he.default.json`. Hardcoding is what forces destructive re-pushes.

### No CDN dependencies.
GSAP, ScrollTrigger and both fonts are self-hosted in `theme/assets/`.
There is no third-party `<script src="https://...">` in this theme. Keep it that way.

### Git.
Commit per verified section. Tag deploys `deploy-YYYY-MM-DD-N`.
Working branch: `claude/pawly-storefront-rebuild-dy04do`.

---

## 2. Themes — what is safe to write to

Verified live against the store on 2026-07-25:

| Theme ID | Name | Role |
|---|---|---|
| `161055899886` | Pawly rebuild 2026-07-25 | **the build target — write here** |
| `161040367854` | pawlytheme | **MAIN (live) — NEVER WRITE** |
| `161036828910` | pawly-shopify-theme | unpublished |
| `160739885294` | pawly-shopify-theme | unpublished *(the brief called this "live"; it is not, any more)* |
| `160748077294` | pawly-shopify-theme | unpublished |
| `160739426542` | pawly-shopify-theme | unpublished |

`161055899886` is a duplicate of live carrying this rebuild. It is NOT published.
Publishing is the merchant's call, and `themePublish` is blocked by the API anyway.

Two schema rules Shopify enforces but `theme check` does not catch — both
invalidate the whole file silently:
- a `range` default must sit on the `min`/`step` grid;
- `"default": ""` is rejected outright. Omit the key instead.

`themeFilesUpsert` swallows these errors on `URL` bodies and reports success.
Re-push the file with a `TEXT` body to see the real error.

---

## 3. Brand system — do not change without asking the merchant

| Token | Hex | Role |
|---|---|---|
| `--pawly-clay` | `#AE5930` | Brand mark, headings, borders |
| `--pawly-cream` | `#F1EBD5` | Page background |
| `--pawly-ink` | `#2A211C` | Body text (warm near-black, **never** `#1A1A1A`) |
| `--pawly-action` | `#FF7A59` | **CTAs only** — buttons, prices, cart badge |
| `--pawly-sky` | `#4FC3F7` | Sparingly — focus rings, in-stock ticks, scanline |
| `--pawly-sand` | `#E4D8BC` | Card surfaces, dividers, input borders |

All six are Theme Editor colour settings injected as custom properties in `theme.liquid`.

**Type:** `Suez One` display (headings, sparingly) + `Assistant` body — both self-hosted woff2.
Never Heebo. `line-height` 1.6 body / 1.15 display. **`letter-spacing` never negative** — negative
tracking destroys Hebrew legibility.

**Warning:** cream + terracotta + serif is the single most common AI-generated web look.
Differentiate on structure and motion, and use `--pawly-action` boldly so the page isn't monochrome clay.

---

## 4. Copy rules

Write like a dog owner talking to another dog owner. Short sentences. Concrete nouns.

- No metaphor-stacking, no personified body parts, no "חוויה", no "פתרון מושלם", no "איכות שתרגישו".
- No English loanwords where Hebrew exists.
- **Never invent facts** — no stats, no certifications, no "אלחוטי" for a USB-charged device.
- Unknowns stay as `[דרוש מידע: …]` in `he.default.json` and get listed in `HANDOFF.md`.
- Testimonials are all prefixed `[דוגמה — להחלפה]`. Publishing invented reviews breaks חוק הגנת הצרכן.

### Locked facts
- Guarantee: **החזר כספי מלא תוך 90 יום** — the phrase `אחריות לשנה` must appear **nowhere**.
- Shipping: **משלוח חינם בהזמנה מעל ₪150, לכל הארץ**
- Delivery: **10–16 ימי עסקים**
- Prices always via Shopify `money` filters. Never a hardcoded price string.

---

## 5. Catalogue — read-only

Six products, all `DRAFT`, vendor `Pawly`, type `אביזרים לחיות מחמד`, **no images**.
Do not create, edit, reprice, add images to, or publish any of them.

| Product ID | Title | ₪ |
|---|---|---|
| 9435182498030 | משטח שריטות לחתולים | 54.90 / 79.90 / 124.90 |
| 9435173814510 | מברשת חשמלית | 74.90 |
| 9435174633710 | מכשיר לניקוי הרגליים | 99.90 / 109.90 |
| 9435174764782 | מכונה לשיוף וגילוח כפות | 149.90 |
| 9435174863086 | תכשיר הניקוי | 69.90 |
| 9435175026926 | משחת לחות 30ג — **upsell** | 49.90 |

Upsell variant: `48383836881134`. Exposed as a theme setting, **not** hardcoded as the only path.

Every card and gallery must render correctly **with no image** — branded cream placeholder with
the paw mark at 30% opacity. Never a broken-image icon, never a collapsed grid cell.

---

## 6. Motion rules

- GSAP + ScrollTrigger only, self-hosted. No Lenis / Locomotive / AOS — they fight checkout redirects.
- Never more than two animated effects in one viewport.
- Animate `transform` and `opacity` only. Never `width`/`height`/`top`/`left`/`box-shadow`/`filter`.
- Every scroll effect needs a touch guard, a `prefers-reduced-motion` guard, and a no-JS fallback.
- RTL: compute translate directions from `document.dir === 'rtl'`. Never hardcode a sign.
- Targets: LCP < 2.5s, CLS < 0.05, Lighthouse mobile Perf ≥ 85 / A11y ≥ 95.

---

## 7. Known trap — the white block on zoom-out

The previous build showed a white block covering the left of the viewport at browser zoom 50–67%.
Cause: `100vw` (or a fixed width) inside an RTL container with `overflow-x` unmanaged —
`100vw` includes the scrollbar gutter, and in RTL the overflow lands on the left.

**Rule: never use `100vw`. Use `100%`.** The page wrapper carries `overflow-x: clip`.
Verify at zoom 50% and 67% before calling anything done.

---

## 8. Out of scope

Creating/editing/repricing products · adding product images · publishing the theme ·
flipping products to ACTIVE · installing apps · touching the live theme ·
post-purchase checkout upsell extensions · writing real reviews ·
changing the brand system without asking.
