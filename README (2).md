# 🐾 Pawly

Pet grooming & care essentials for dogs and cats — vet-approved gear, a calm bathtime, happy paws.

Pawly is a custom **Shopify theme**, built from scratch to Dawn (Online Store 2.0) conventions — pure Liquid, vanilla CSS/JS, no frameworks, no build step. Clone/upload it straight into a Shopify store.

---

## Overview

| | |
|---|---|
| **Platform** | Shopify (Online Store 2.0, Liquid) |
| **Stack** | Liquid, vanilla CSS, vanilla JS — no bundler required |
| **Brand** | "Puppy Orange + Sky Pup Blue" design system on a soft off-white base |
| **Guarantee** | *The Pawly Promise* — 90-day full money-back guarantee |
| **Languages** | English + Hebrew (RTL) storefront copy |

Pawly's theme is fully custom-built rather than a modified Dawn/third-party theme — every section, snippet, and template in this repo was written for this store specifically.

## Repository structure

```
theme/
├── layout/
│   └── theme.liquid                 # global shell: header, live cart icon, footer, brand colors as CSS vars
├── assets/
│   └── theme.css                    # design tokens, buttons, forms, badges, product cards
├── sections/
│   ├── pawly-hero.liquid            # homepage hero (editable heading/image/CTA)
│   ├── featured-collection.liquid   # product grid + "bio-scan" benefits hover overlay + Quick Add
│   └── main-product.liquid          # product page: gallery, buy box, live variant matching
├── snippets/
│   └── cart-drawer.liquid           # AJAX slide-out cart (add/change/remove, no reload)
├── templates/
│   ├── index.json                   # homepage: hero + featured collection
│   ├── product.json                 # product page: main-product section
│   ├── collection.liquid, cart.liquid, page.liquid, blog.liquid,
│   │   article.liquid, search.liquid, list-collections.liquid, 404.liquid,
│   │   gift_card.liquid
│   └── customers/                   # login, register, account, order, addresses,
│                                     # activate_account, reset_password
├── config/
│   ├── settings_schema.json         # Theme Editor settings (brand colors, social links)
│   └── settings_data.json           # default values
└── locales/
    └── en.default.json

content/
├── dog-grooming-store-page.md       # EN product/store page copy
└── pawly-store-page-hebrew.md       # HE product/store page copy (RTL)
```

## Design system

| Token | Value | Role |
|---|---|---|
| `--color-primary` | `#FF7A59` | Puppy Orange — primary actions, prices |
| `--color-accent` | `#4FC3F7` | Sky Pup Blue — hover scanline, accent CTAs |
| `--color-text` | `#1A1A1A` | Body copy |
| `--color-background` | `#F8F9FA` | Page background |

All four are exposed as Theme Editor color settings, not hardcoded — store owners can retint the whole site from Shopify admin without touching code.

Other conventions: a fluid `clamp()` type scale, pill-shaped buttons with a light-sweep hover animation, and a reusable badge-grid component for trust signals (guarantee, shipping, etc.).

## Key features

- **AJAX cart drawer** (`snippets/cart-drawer.liquid`) — intercepts every add-to-cart form (native product form and Quick Add alike) via `/cart/add.js`, `/cart/change.js`, `/cart.js`. No page reloads.
  - Dispatches a `pawly:cart:updated` event on `document` with the live cart JSON in `event.detail.cart`.
  - Exposes a small public API: `window.PawlyCart.open()`, `.close()`, `.refresh()`.
- **Live variant matching** on the product page — selecting an option swatch updates price, image, availability, and the URL's `?variant=` param without a reload.
- **Per-product benefits overlay** — a `custom.benefits` product metafield (multi-line, one benefit per line) renders as a hover overlay on product cards; falls back to a branded default if unset.
- **Full template coverage** — every required Shopify template (collection, cart, page, blog, article, search, 404, gift card, all customer-account pages) is implemented, so the theme validates and installs as a complete, standalone zip.

## Brand & copy

- **Voice**: warm, dog-people-first, plain language — no generic "quality you can trust" filler.
- **The Pawly Promise**: 90-day full refund, referenced in the announcement bar, trust badges, a dedicated guarantee section, and the FAQ, in both English and Hebrew.
- Store-page copy lives in `content/` as Markdown, separate from the theme code, so copy edits don't require touching Liquid.

## Getting started

**Option A — Shopify CLI (recommended for development):**
```bash
shopify theme dev     # live-reload preview against your dev store
shopify theme push    # push local changes to Shopify
shopify theme pull    # pull remote changes back down
```

**Option B — zip upload (no CLI):**
Shopify admin → Online Store → Themes → Add theme → **Upload zip file** → Publish (or Customize first).

## Product catalog

Product data (names, prices, descriptions) lives in Shopify itself, not in the theme code — the theme renders whatever is in the connected store. Keep `content/dog-grooming-store-page.md` and `content/pawly-store-page-hebrew.md` in sync with the live catalog when copy changes.

## Roadmap / open items

- [ ] Finalize product photography (uniform sizing, Pawly wordmark, remove non-Pawly branding from product surfaces)
- [ ] Import real customer reviews (4★+, text only)
- [ ] Build the 360°/immersive hero (Three.js equirectangular panorama, drafted but not finished)
- [ ] Wire the contact form to the store owner's inbox
- [ ] Set up bundles and discount codes in the live store
