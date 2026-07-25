# 🐾 Pawly

Shopify theme for **Pawly** — grooming gear for dogs and cats.
`getpawly.co.il` · Shopify Basic · ILS (₪) · Israel only · **Hebrew, RTL only**.

Pure Liquid, vanilla CSS and vanilla JS. No React, no Tailwind, no build step,
no CDN dependencies.

> **Deployed** to unpublished theme `161055899886` on `getpawly.co.il`, not published.
> Preview: `https://getpawly.co.il/?preview_theme_id=161055899886`
>
> **New here?** Read [`HANDOFF.md`](HANDOFF.md) before doing anything. It covers
> what still needs filling in, the exact publish steps, and which theme IDs are
> safe to write to.

---

## Stack

| | |
|---|---|
| Platform | Shopify Online Store 2.0 (JSON templates, section schemas) |
| Language | Liquid + vanilla CSS + vanilla JS |
| Build step | none |
| Animation | GSAP 3.12.5 + ScrollTrigger, **self-hosted** in `assets/` |
| Fonts | Suez One (display) + Assistant (body), **self-hosted** woff2, Hebrew + Latin subsets |
| Direction | `dir="rtl"` throughout, logical CSS properties |

There is no third-party `<script src="https://…">` in this theme, and no request
ever leaves for Google Fonts. Keep it that way — a CDN that 404s is one of the
ways the previous builds died.

---

## Layout

```
theme/
├── .shopifyignore              config/settings_data.json + templates/*.json
├── .theme-check.yml
├── layout/theme.liquid
├── assets/
│   ├── pawly.css               design tokens + every component
│   ├── pawly.js                header, nav drawer, cart, reveal, card tilt
│   ├── gsap.min.js
│   ├── ScrollTrigger.min.js
│   └── assistant-var-*.woff2, suez-one-400-*.woff2
├── sections/                   29 sections, every one schema-driven
├── snippets/                   product-card, cart-drawer, shimmer-button, icon-*
├── templates/                  index, product, collection, cart, page, blog,
│                               article, search, list-collections, 404,
│                               gift_card, customers/* (all seven)
├── config/settings_schema.json + settings_data.json
└── locales/he.default.json     every UI string — none hardcoded in markup
```

---

## Design system

Every colour is a Theme Editor setting, injected as a CSS custom property in
`layout/theme.liquid`. Nothing is hardcoded in the stylesheet.

| Token | Hex | Role |
|---|---|---|
| `--pawly-clay` | `#AE5930` | Brand mark, headings, borders |
| `--pawly-cream` | `#F1EBD5` | Page background |
| `--pawly-ink` | `#2A211C` | Body text — warm near-black, never `#1A1A1A` |
| `--pawly-action` | `#FF7A59` | **CTAs only** — buttons, prices, cart badge |
| `--pawly-sky` | `#4FC3F7` | Sparingly — focus rings, in-stock ticks, scanline |
| `--pawly-sand` | `#E4D8BC` | Card surfaces, dividers, input borders |

Type: fluid `clamp()` scale, `line-height` 1.6 body / 1.15 display,
`letter-spacing` never negative — negative tracking destroys Hebrew legibility.

---

## Notable pieces

- **`sections/pawly-hero.liquid`** — scroll-expand hero. GSAP ScrollTrigger
  `pin` + `scrub`; the media opens via `clip-path` with the video counter-scaled
  inside, so nothing touches layout. The title splits on the first space and the
  halves part like curtains, mirrored for RTL. Falls back to a calm static hero
  under reduced motion, with no JS, and if GSAP fails to load.
- **`sections/main-product.liquid`** — every variant option is a real radio
  group (colours as swatches), live-bound to price, compare-at price, SKU,
  availability and gallery. An impossible combination resolves to the nearest
  available variant rather than dead-ending. The comparison table renders only
  when option values genuinely differ in price.
- **`snippets/cart-drawer.liquid`** + **`sections/cart-drawer.liquid`** — AJAX
  drawer re-rendered through the Section Rendering API, so every price stays in
  Liquid `money` filters and no currency formatting is duplicated in JS.
  `/cart` is a full working page with JavaScript disabled.
- **`snippets/shimmer-button.liquid`** — conic-gradient CTA, pure CSS, keeps its
  custom-property API. Used once per viewport.
- **`sections/testimonials.liquid`** — three CSS marquee columns, no JS.

`window.PawlyCart` exposes `open()`, `close()`, `refresh()`. The drawer
dispatches `pawly:cart:updated` on `document` with fresh cart JSON.

---

## Working on it

```bash
npm i -g @shopify/cli @shopify/theme
cd theme

shopify theme pull  --store getpawly.myshopify.com --theme <UNPUBLISHED_ID>  # ALWAYS first
shopify theme check                                                          # must be 0 offenses
shopify theme dev   --store getpawly.myshopify.com --theme <UNPUBLISHED_ID>
shopify theme push  --store getpawly.myshopify.com --theme <UNPUBLISHED_ID>  # never --live
```

**Never upload a ZIP.** It creates a *new* theme with default settings and
abandons every Theme Editor customisation.

**Always `shopify theme pull` first.** The Theme Editor rewrites
`templates/*.json` and `config/settings_data.json` server-side; pushing a stale
local copy over them is how two previous builds were lost. Those paths are in
`.shopifyignore` and go up once, on the first deploy, never again.

---

## House rules

- No React, JSX, framer-motion or Tailwind. Components supplied as React are a
  spec of behaviour, not code to paste.
- No `100vw` — it includes the scrollbar gutter, and in RTL the overflow lands
  on the left. That was the white block at browser zoom 50–67%. Use `100%`; the
  page wrapper carries `overflow-x: clip`.
- Animate `transform` and `opacity` only. Never `width`, `height`, `top`,
  `left`, `box-shadow` or `filter` on scroll.
- Never more than two animated effects in one viewport.
- Every scroll effect needs a touch guard, a `prefers-reduced-motion` guard and
  a working no-JS fallback.
- Every card and gallery must render correctly with **no image** — branded cream
  placeholder with the paw mark, never a broken-image icon.
- Guarantee wording is exactly `החזר כספי מלא תוך 90 יום`. The one-year-warranty
  phrasing appears nowhere.
- Never invent facts. Unknowns stay as `[דרוש מידע: …]` and are listed in
  [`HANDOFF.md`](HANDOFF.md).

Full context for a coding session is in [`CLAUDE.md`](CLAUDE.md).
