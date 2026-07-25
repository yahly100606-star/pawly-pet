# Pawly — Shopify theme

Online Store 2.0 theme (Dawn conventions): pure Liquid, vanilla CSS/JS, **no build step**.
This is the Shopify-installable port of the Next.js landing page in the repo root.

## Install

Zip the *contents* of this directory (not the folder itself) and upload via
**Shopify admin → Online Store → Themes → Add theme → Upload zip**.

```bash
cd shopify-theme && zip -r ../pawly-theme.zip . -x '*.DS_Store'
```

Or with the Shopify CLI:

```bash
cd shopify-theme && shopify theme push --store getpawly.co.il
```

## After install

1. **Navigation** — create a `main-menu` and `footer` menu in Online Store → Navigation.
   The header/footer sections read them via `link_list` settings; without them the nav renders empty.
2. **Colours** — Theme settings → Colours (defaults are the Pawly tokens: `#FF7A59` / `#4FC3F7`).
3. **Social** — Theme settings → Social (Instagram / Facebook; icons hide when blank).
4. **Products** — every product is currently `DRAFT` with no images. Set them `ACTIVE`
   and add photography; cards fall back to a branded paw placeholder until then.

## Structure

| Path | Purpose |
|---|---|
| `layout/theme.liquid` | Shell; sets `dir="rtl"` for Hebrew, injects colour settings |
| `sections/pawly-header.liquid` | Sticky navbar, scroll blur, mobile menu |
| `sections/pawly-hero.liquid` | Hero + animated product marquee |
| `sections/pawly-features.liquid` | 3 feature cards (block-driven) |
| `sections/pawly-products.liquid` | Live product grid |
| `sections/pawly-testimonials.liquid` | 3 scrolling review columns |
| `sections/pawly-faq.liquid` | Accordion FAQ |
| `sections/pawly-footer.liquid` | Newsletter, links, contact, social |
| `sections/pawly-main-*.liquid` | Product / collection / cart / search / blog / 404 |
| `snippets/pawly-product-card.liquid` | Product card with placeholder fallback |
| `assets/pawly.css` | Tokens + all styles, RTL via logical properties |
| `assets/pawly.js` | IntersectionObserver reveals, navbar, accordion |
| `locales/he.default.json` | Hebrew strings (default); `en.json` for English |

## Animation parity with the Next.js build

| Next.js (Framer Motion) | Theme (vanilla) |
|---|---|
| `whileInView` + `once: true` | `IntersectionObserver` + `unobserve` |
| `useScroll` navbar state | scroll listener → `.is-scrolled` |
| `AnimatePresence` mobile menu | class toggle + `max-height` transition |
| Accordion height spring | CSS `grid-template-rows: 0fr → 1fr` |
| Infinite marquees | CSS keyframes, RTL-aware direction |
| `useReducedMotion` | `@media (prefers-reduced-motion: reduce)` |
