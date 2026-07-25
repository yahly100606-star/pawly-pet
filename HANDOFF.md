# Pawly — handoff

Built on branch `claude/pawly-storefront-rebuild-dy04do`. Nothing was deployed:
the theme is in git, not on the store. See §4 for how to publish it.

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
| 1 | Target theme | Built to git only. Nothing written to any theme. | §4 |
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

## 4. Publishing — exact steps

Nothing has been deployed. Do this:

**Step 1 — make a target theme.**
Shopify admin → Online Store → Themes → find **pawlytheme** (`161040367854`) →
⋯ → **Duplicate**. Note the new theme's ID from its URL. Build on the duplicate
so you are working on top of what is actually live.

**Step 2 — get the code.**
```bash
git clone <this repo>
cd pawly-pet
git checkout claude/pawly-storefront-rebuild-dy04do
npm i -g @shopify/cli @shopify/theme
cd theme
```

**Step 3 — first deploy only.** `templates/*.json` and `settings_data.json` are
in `.shopifyignore` to protect your Theme Editor work. On the very first push
they must go up once, so temporarily move the ignore file aside:
```bash
mv .shopifyignore .shopifyignore.off
shopify theme push --store getpawly.myshopify.com --theme <NEW_ID>
mv .shopifyignore.off .shopifyignore
```

**Step 4 — look at it.**
```bash
shopify theme dev --store getpawly.myshopify.com --theme <NEW_ID>
```
Check 375 / 768 / 1440px, and browser zoom 50% and 67%.

**Step 5 — fill in §3** in the Theme Editor: logo, images, video, contact
details, reviews.

**Step 6 — publish it yourself**, when you're happy. I have not published
anything and will not.

### Every deploy after the first

```bash
shopify theme pull --store getpawly.myshopify.com --theme <NEW_ID>   # ALWAYS first
git status                                                            # clean?
shopify theme check                                                   # must be 0 offenses
shopify theme dev --store getpawly.myshopify.com --theme <NEW_ID>     # look at it
shopify theme push --store getpawly.myshopify.com --theme <NEW_ID>    # never --live
git commit && git tag deploy-YYYY-MM-DD-N
```

`shopify theme pull` first is not optional. It is how the last two builds were
lost: the Theme Editor rewrites those JSON files server-side, and pushing a
stale local copy over them destroys every customisation.

---

## 5. What was verified, and what wasn't

I could not run `shopify theme dev` — this build environment has no Shopify CLI
authentication, so nothing was ever rendered against the real store. **Step 4
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

**Not verified — you must check these**
- Anything requiring the real store: cart add/change/remove against
  `/cart/add.js`, the Section Rendering API refresh of the drawer, the checkout
  path, customer account pages, the search results page.
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
