/* ==========================================================================
   Pawly — theme behaviour
   Vanilla JS replacements for the Framer Motion effects in the Next.js build:
     - whileInView reveals  -> IntersectionObserver
     - sticky navbar state  -> scroll listener
     - AnimatePresence menu -> class toggle + CSS grid/max-height transition
     - accordion            -> class toggle + aria wiring
   No dependencies, no build step.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Scroll reveals ---------------------------------------------------- */

  function initReveals() {
    var targets = document.querySelectorAll(".pawly-reveal");
    if (!targets.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // reveal once, like viewport={{ once: true }}
        });
      },
      { rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Sticky header ----------------------------------------------------- */

  function initHeader() {
    var header = document.querySelector("[data-pawly-header]");
    if (!header) return;

    var burger = header.querySelector("[data-pawly-burger]");
    var menu = header.querySelector("[data-pawly-menu]");

    function syncScrolled() {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    }
    syncScrolled();
    window.addEventListener("scroll", syncScrolled, { passive: true });

    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = header.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });

      menu.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
          header.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ---- FAQ accordion ----------------------------------------------------- */

  function initFaq() {
    document.querySelectorAll("[data-pawly-faq]").forEach(function (root) {
      var items = root.querySelectorAll(".pawly-faq__item");

      items.forEach(function (item) {
        var button = item.querySelector(".pawly-faq__q");
        if (!button) return;

        button.addEventListener("click", function () {
          var isOpen = item.classList.contains("is-open");

          // single-open accordion, matching the React version
          items.forEach(function (other) {
            other.classList.remove("is-open");
            var otherButton = other.querySelector(".pawly-faq__q");
            if (otherButton) otherButton.setAttribute("aria-expanded", "false");
          });

          if (!isOpen) {
            item.classList.add("is-open");
            button.setAttribute("aria-expanded", "true");
          }
        });
      });
    });
  }

  /* ---- Marquee / testimonial loops --------------------------------------- */

  /* Each track is duplicated in Liquid so a -50% translate loops seamlessly.
     If motion is reduced the CSS already disables the animation; nothing to do. */

  function init() {
    initReveals();
    initHeader();
    initFaq();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Shopify theme editor re-renders sections without a page reload
  document.addEventListener("shopify:section:load", init);
})();
