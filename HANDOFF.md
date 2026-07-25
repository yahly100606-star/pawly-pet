# Pawly — handoff

Built on branch `claude/pawly-storefront-rebuild-dy04do` and **deployed to an
unpublished theme on the live store**. It is not published — see §0.

---

## 0. Deployment status

**Theme `161055899886` — "Pawly rebuild 2026-07-25" — UNPUBLISHED.**

Created by duplicating the live theme `161040367854` (pawlytheme), then writing
all 88 theme files onto the duplicate. The live theme was read from, never
written to.

Preview it here:

```
https://getpawly.co.il/?preview_theme_id=161055899886
```

or Shopify admin → Online Store → Themes → "Pawly rebuild 2026-07-25" →
**Preview** / **Customize**.

**It is not published, and I did not publish it.** Your brief puts publishing
out of scope and says you publish it yourself; the Admin API also blocks
`themePublish` outright. When you're happy with it: Themes → ⋯ → **Publish**.

### Verified after deployment
- All 88 files present. **70 of them are byte-identical to the repo** (MD5
  match). The other 18 are JSON templates and `settings_data.json`, which
  Shopify rewrites with an auto-generated header comment — their parsed content
  matches the repo exactly, checked on `index.json` and `product.json`.
- `shopify theme check`: 80 files, 0 offenses.

### NOT verified — please look at this yourself
I could not load the storefront: this build environment's network policy blocks
`getpawly.co.il` (the proxy returns 403 on CONNECT). So **no page of this theme
has ever been rendered by a browser against the real store.** Open the preview
URL above and check the homepage, a product page, the cart and a 404 before
publishing.

### Two bugs the deployment caught
Both were invisible offline — `shopify theme check` passes on them:

1. `logo_width_mobile` had `min: 60, step: 10, default: 104`. 104 is not on the
   step grid, which Shopify rejects.
2. The five contact settings had `"default": ""`. Shopify rejects a blank string
   default: `FILE_VALIDATION_ERROR — default can't be blank`.

Either one invalidates the **entire** `settings_schema.json`, so the theme kept
the previous build's schema and none of the 41 new settings existed in the
Theme Editor. Both are fixed and the real schema is now live on the theme.

**Worth knowing if you ever script this:** `themeFilesUpsert` runs that
validation on `URL` bodies too, but returns `userErrors: []` and reports
success. It failed silently five times. Only re-pushing the same file with a
`TEXT` body surfaced the actual error. If a file refuses to update, re-push
that one file as TEXT.

### Leftovers to delete by hand
The duplicate inherited the previous build's files. Nothing in the new theme
references them, so they are inert — but they clutter the "add section" list in
the Theme Editor. The Admin API blocks file deletion, so remove these in admin
(Themes → ⋯ → Edit code):

`sections/pawly-faq.liquid` · `pawly-features.liquid` · `pawly-footer.liquid` ·
`pawly-header.liquid` · `pawly-products.liquid` · `pawly-testimonials.liquid` ·
`pawly-main-404.liquid` · `pawly-main-article.liquid` · `pawly-main-blog.liquid` ·
`pawly-main-cart.liquid` · `pawly-main-collection.liquid` ·
`pawly-main-list-collections.liquid` · `pawly-main-page.liquid` ·
`pawly-main-product.liquid` · `pawly-main-search.liquid` ·
`sections/header-group.json` · `sections/footer-group.json` ·
`snippets/pawly-paw.liquid` · `snippets/pawly-product-card.liquid`

Do **not** delete `sections/pawly-hero.liquid` — that filename is reused by the
new hero.

`locales/en.json` also carried over. I left it: deleting a locale is riskier
than keeping one that nothing serves, since the store is Hebrew-only and
`he.default.json` is the default. Remove it if you want the theme tidy.

---

## 1. Read this first — two things in the brief are out of date

### 1.1 The "live" theme ID in the brief is not live

The brief says theme `160739885294` is live and must never be written to.
Checked against the store on 2026-07-25:

| Theme ID | Name | Role | Updated |
|---|---|---|---|
| `161040367854` | pawlytheme | **MAIN (live)** | 2026-07-25 |
| `161036828910` | pawly-shopify-theme | unpublished | 2026-07-24 |
| `160739885294` | pawly-shopify-theme | unpublished | 2026-07-25 |
| `160748077294` | pawly-shopify-theme | unpublished | 2026-07-13 |
| `160739426542` | pawly-shopify-theme | unpublished | 2026-07-12 |

`161040367854` is the live one now. **Treat both `161040367854` and
`160739885294` as untouchable** until you tell me otherwise — the second one
only because the brief marked it as sacred and it may still be a snapshot you
care about.

### 1.2 The uploaded assets never reached this session

`/mnt/user-data/uploads/` does not exist in the build environment. The logo, the
7.4s hero clip and all eight photographs were **not available**, so none of them
are in `theme/assets/`.

This turned out not to block anything, because the brief already requires that
nothing be hardcoded. Every image and the hero video are **Theme Editor
settings**, so you upload them in the editor and no one has to re-push the theme
to change them later. Exact specs are in §3.

---

## 2. Decisions I made without you

You didn't answer the four questions in §0 of the brief, so I built on the
defaults the brief itself specifies. Each is reversible.

| # | Decision | What I did | To change |
|---|---|---|---|
| 1 | Target theme | Duplicated live `161040367854` → new unpublished theme `161055899886`, deployed there. Live untouched, nothing published. | §0 |
| 2 | Palette | Logo-led: clay `#AE5930` + cream `#F1EBD5` + ink `#2A211C`, with Puppy Orange `#FF7A59` reserved strictly for CTAs, prices and the cart badge, and Sky `#4FC3F7` for focus rings and the card scanline. | Theme Editor → צבעים |
| 3 | Hero video | Built as a Theme Editor `video` setting with a poster fallback. Works with the supplied clip or a Higgsfield piece later, no code change. | Theme Editor → הירו → סרטון |
| 4 | Products | Untouched. All six still `DRAFT`, still no images, prices unchanged. | Yours to publish |

### Other judgement calls worth knowing about

- **Hero subheading rewritten.** The brief suggested *"כלים פשוטים לציפורניים,
  כפות ופרווה"*. You don't sell a nail product, so that would have been an
  invented claim. It now reads *"מברשות, ניקוי כפות ומשחה לכריות. הכול בבית,
  בלי מספרה ובלי מאבק."* — only things in the catalogue.
- **Colour swatch hexes are approximations.** Variant names give the colours
  (סגול, לבן פורצלן, חום חלבי, ירוק, אפור, ורד, כחול) but not their values. I
  mapped each to a plausible hex, editable in Theme Editor → מוצר → מיפוי שמות
  צבע. **Check these against real product photos before you publish.**
- **No QR code on the gift card page.** Rendering one needs a second JS library;
  the code is copyable text instead.
- **`.shopifyignore` lives in `theme/`, not the project root.** The brief's
  diagram put it at the root, where the Shopify CLI would not read it.
- **A `theme/.theme-check.yml` was added**, with `OrphanedSnippet` disabled —
  icon snippets are selected dynamically from Theme Editor dropdowns, so static
  analysis always reports the unselected ones as orphaned.

---

## 3. What you need to supply

### 3.1 Text — every `[דרוש מידע]` in the theme

Nothing here was invented. Each gap renders visibly as `[דרוש מידע: …]` so it
cannot ship unnoticed.

| Where to fill it in | What's missing |
|---|---|
| Theme Editor → הגדרות → יצירת קשר → מספר וואטסאפ | WhatsApp number, international format, e.g. `972501234567` |
| Theme Editor → הגדרות → יצירת קשר → מייל לשירות | Customer service email |
| Theme Editor → הגדרות → יצירת קשר → טלפון | Phone number |
| Theme Editor → הגדרות → יצירת קשר → שעות מענה | Support hours — also shown in the homepage trust bar |
| Theme Editor → הגדרות → יצירת קשר → פרטי העסק | ח.פ. / business address for the footer |
| Theme Editor → הגדרות → רשתות חברתיות | Instagram / Facebook / TikTok URLs. **Blank = no icon shown.** No placeholder icons pointing at `#` ship. |
| Homepage → שאלות ותשובות → "איך מדברים איתכם?" | Same contact details, in the FAQ answer |
| Homepage → ביקורות (6 blocks) | Real reviews — see §3.2 |
| Product page → מה בקופסה | What's in the box, per product |
| Product descriptions | Shopify product data, not the theme |

### 3.2 Reviews — read this before touching them

All six testimonial blocks are placeholders, each tagged `[דוגמה — להחלפה]`, and
the section carries a visible notice saying they are examples. Publishing
invented reviews breaks חוק הגנת הצרכן.

When you have real ones: edit the block text, then untick **"דוגמה (לא ביקורת
אמיתית)"** on that block. The tag disappears. Once every block is real, untick
**"הצגת ההודעה שאלו דוגמאות"** on the section.

Do not untick those boxes on placeholder text.

### 3.3 Images and video

Every one of these is a Theme Editor setting. Upload them in the editor — do
not put them in `theme/assets/` and re-push.

| Setting | File | Spec |
|---|---|---|
| הגדרות → מותג ולוגו → לוגו מלא | the new logo | **Transparent PNG or SVG.** The cream background must be knocked out — a baked-in cream rectangle looks broken on the clay footer and over photography. |
| הגדרות → מותג ולוגו → סמל בלבד | paw mark only | Square, transparent. Used for the mobile header, the favicon, the product-card watermark and every image placeholder. |
| הגדרות → מותג ולוגו → Favicon | paw mark | 96×96+ |
| הגדרות → מותג ולוגו → תמונת שיתוף | `victor-g` (Jack Russell) | 1200×630 |
| הירו → תמונת רקע | `calvin-chai` (two cats) | Crop 21:9. It is the only upload bright enough to sit behind a high-key video without a hard rectangle edge. |
| הירו → סרטון | `8498661-uhd…mp4` | **Re-encode first:** 1280×720 H.264 + WebM, ≤2.5MB. The 11MB original will wreck your LCP. |
| הירו → תמונת פוסטר | frame 0 of the clip | Shown if the video fails or autoplay is blocked |
| כרטיסי קטגוריה → 3 blocks | `victor-g` / `marek-studzinski` / `alvan-nee` | 3:4 portrait |
| ביקורות → תמונת רקע | `yerlin-matu` | Darkest upload; a scrim goes over it |
| הרשמה לרשימה → תמונה | `karsten-winegeart` (banana pyjamas) | 4:5 |

`images__4_.jpg` is 528×378 — too small for anything full-width. Skip it or use
it at ≤400px. Do not upscale.

### 3.4 Product photography spec

For whoever shoots it: cream `#F1EBD5` seamless, single soft key from the left,
hard-ish shadow, 1:1, no props except a real hand or paw where it explains
scale. Under 400KB each, WebP with a JPG fallback.

Until then, every card and gallery renders a branded cream tile with the paw
mark at 30% opacity and the caption *"עדיין אין תמונה למוצר הזה"*. No broken
image icons, no collapsed grid cells. This is tested (§5).

Once real photos include the packaging, turn off **הגדרות → כרטיסי מוצר → סימן
מים של Pawly**.

---

## 4. Publishing — what's left

Steps 1–3 (duplicate, upload the code, first deploy including
`templates/*.json` and `settings_data.json`) are **done** — see §0. What remains
is yours:

**Step 4 — look at it.** Open
`https://getpawly.co.il/?preview_theme_id=161055899886` and check the homepage,
a product page, the cart and a 404. Check 375 / 768 / 1440px, and browser zoom
50% and 67%. I could not do this from the build environment (§0).

**Step 5 — fill in §3** in the Theme Editor: logo, images, video, contact
details, reviews.

**Step 6 — delete the leftover files** listed in §0.

**Step 7 — publish it yourself**, when you're happy: Themes → ⋯ → Publish.
I have not published anything and will not.

To keep working on it locally from here:
```bash
git clone <this repo> && cd pawly-pet
git checkout claude/pawly-storefront-rebuild-dy04do
npm i -g @shopify/cli @shopify/theme
cd theme
shopify theme pull --store getpawly.myshopify.com --theme 161055899886
```
`.shopifyignore` is already in place, so from now on pulls and pushes will
leave your Theme Editor work alone.

### Every deploy after the first

```bash
shopify theme pull --store getpawly.myshopify.com --theme 161055899886   # ALWAYS first
git status                                                               # clean?
shopify theme check                                                      # must be 0 offenses
shopify theme dev  --store getpawly.myshopify.com --theme 161055899886   # look at it
shopify theme push --store getpawly.myshopify.com --theme 161055899886   # never --live
git commit && git tag deploy-YYYY-MM-DD-N
```

`shopify theme pull` first is not optional. It is how the last two builds were
lost: the Theme Editor rewrites those JSON files server-side, and pushing a
stale local copy over them destroys every customisation.

---

## 5. What was verified, and what wasn't

The theme is deployed (§0) but **was never rendered by a browser against the
store** — the environment's network policy blocks `getpawly.co.il`. **Step 4
above is still necessary.** What I could verify, I did:

**Verified — Liquid**
- `shopify theme check` (runs offline): **80 files, 0 offenses.**
- All 20 JSON files and all 29 section schemas parse.

**Verified — CSS and JS, in headless Chromium**

The homepage and product page were rebuilt as static harnesses using the real
`pawly.css`, `pawly.js`, `gsap.min.js` and the real hero and variant scripts
extracted verbatim from the section files, then driven in a browser.

- **No horizontal scroll and no overflow at 375 / 768 / 1440px, and at 2149px
  and 2880px** — the viewport widths a 1440 window reports at browser zoom 67%
  and 50%. That is the white-block bug from the previous build; it does not
  reproduce. Checked at four scroll positions per width.
- Zero console errors or warnings at every width.
- Hero scrub: clip opens `inset(24% 40%)` → `none`, title halves travel in the
  correct direction for RTL, background fades 1 → 0.12, content appears only
  past 75% progress.
- `prefers-reduced-motion: reduce` → static stacked hero, marquee stopped, no
  shimmer, nothing hidden.
- GSAP blocked → hero falls back to fully open, no dead collapsed state.
- `pawly.js` blocked → every section still visible.
- Product variants: all five combinations of מכשיר לניקוי הרגליים selectable;
  price, compare-at price, SKU, availability, Add-to-Cart state, option labels
  and `?variant=` all update; unavailable combinations marked; picking an
  impossible pair resolves to the nearest available variant; keyboard
  navigation works; focus ring visible.
- Image-less product cards render the branded placeholder.

**Verified — on the store**
- All 88 files deployed; 70 byte-identical by MD5, the rest semantically
  identical after Shopify's reformatting.
- `settings_schema.json` accepted, so all 41 settings exist in the Theme Editor.

**Not verified — you must check these**
- How any page actually renders. Nothing has been loaded in a browser from the
  store.
- Cart add/change/remove against `/cart/add.js`, the Section Rendering API
  refresh of the drawer, the checkout path, customer account pages, search.
- Lighthouse Performance ≥ 85 / Accessibility ≥ 95, LCP and CLS. The structure
  is built for it — self-hosted fonts, no CDN, explicit image dimensions,
  transform/opacity-only animation — but a real number needs a real page.
- How the hero looks with the actual video in it.

---

## 6. Where things live

```
theme/
├── .shopifyignore              protects settings_data.json + templates/*.json
├── .theme-check.yml
├── layout/theme.liquid         colour tokens injected from Theme Editor
├── assets/
│   ├── pawly.css               all component CSS, design tokens
│   ├── pawly.js                header, nav, cart, reveal, tilt
│   ├── gsap.min.js             self-hosted 3.12.5
│   ├── ScrollTrigger.min.js    self-hosted
│   └── *.woff2                 Assistant + Suez One, Hebrew + Latin subsets
├── sections/                   29 sections, all schema-driven
├── snippets/                   product-card, cart-drawer, shimmer-button, icons
├── templates/                  every required template incl. all 7 customer ones
├── config/                     settings_schema.json + settings_data.json
└── locales/he.default.json     every UI string
```

Fonts are self-hosted; the theme never calls Google Fonts. GSAP is self-hosted;
there is no third-party `<script src>` anywhere.

---

## 7. Still out of scope, untouched

Products (not created, edited, repriced, imaged or published) · the live theme ·
the post-purchase checkout upsell — that needs a checkout extension app
(AfterSell / Zipify OCU / ReConvert), configured in its own UI. The in-cart
upsell on the product page is a different thing and **is** built.
