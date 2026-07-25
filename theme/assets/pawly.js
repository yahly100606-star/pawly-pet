/* ==========================================================================
   Pawly — global behaviour
   Vanilla JS. No React, no framework, no build step, no CDN.

   Everything here degrades: if this file fails to load, the header is still
   solid, the nav is still a list of links, add-to-cart still posts to /cart,
   and the cart page still works. Nothing is JS-only.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  var cfg = window.PawlyConfig || {};

  /* ------------------------------------------------------------------ utils */

  function on(el, evt, fn, opts) {
    if (el) el.addEventListener(evt, fn, opts);
  }

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function rafThrottle(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        fn();
      });
    };
  }

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /** Motion is allowed only if the merchant enabled it AND the visitor hasn't
   *  asked for reduced motion. Both are checked live, not cached at load. */
  function motionAllowed() {
    return cfg.motionEnabled !== false && !reducedMotion.matches;
  }

  function canHover() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }

  /* ------------------------------------------------------- scroll lock */

  var lockCount = 0;
  var savedScroll = 0;

  function lockScroll() {
    if (lockCount++ > 0) return;
    savedScroll = window.scrollY;
    var sbw = window.innerWidth - root.clientWidth;
    document.body.style.position = 'fixed';
    document.body.style.top = -savedScroll + 'px';
    document.body.style.width = '100%';
    if (sbw > 0) document.body.style.paddingInlineEnd = sbw + 'px';
  }

  function unlockScroll() {
    if (--lockCount > 0) return;
    lockCount = 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.paddingInlineEnd = '';
    window.scrollTo(0, savedScroll);
  }

  /* -------------------------------------------------------- focus trap */

  var FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

  function trapFocus(container, onEscape) {
    var previouslyFocused = document.activeElement;

    function keydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (onEscape) onEscape();
        return;
      }
      if (e.key !== 'Tab') return;

      var items = $$(FOCUSABLE, container).filter(function (el) {
        return el.offsetParent !== null;
      });
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', keydown);

    var firstFocusable = $$(FOCUSABLE, container)[0];
    if (firstFocusable) firstFocusable.focus();

    return function release() {
      document.removeEventListener('keydown', keydown);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }

  /* =========================================================== 1. header */

  function initHeader() {
    var header = $('[data-pawly-header]');
    if (!header) return;

    // Pages without a hero start solid; only the transparent variant toggles.
    if (!header.hasAttribute('data-transparent')) {
      header.classList.add('header--opaque');
      return;
    }

    var solid = false;
    var update = rafThrottle(function () {
      var past = window.scrollY > 80;
      if (past === solid) return;
      solid = past;
      header.classList.toggle('is-solid', past);
    });

    on(window, 'scroll', update, { passive: true });
    update();
  }

  /* ======================================================== 2. nav drawer */

  function initNavDrawer() {
    var drawer = $('[data-nav-drawer]');
    var openBtn = $('[data-nav-open]');
    if (!drawer || !openBtn) return;

    var release = null;

    function open() {
      drawer.classList.add('is-open');
      drawer.removeAttribute('aria-hidden');
      openBtn.setAttribute('aria-expanded', 'true');
      lockScroll();
      release = trapFocus(drawer, close);
    }

    function close() {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      unlockScroll();
      if (release) {
        release();
        release = null;
      }
    }

    on(openBtn, 'click', open);
    $$('[data-nav-close]', drawer).forEach(function (btn) {
      on(btn, 'click', close);
    });

    // Any navigation closes it, so a back-button return isn't stuck open.
    $$('a', drawer).forEach(function (a) {
      on(a, 'click', close);
    });
  }

  /* ==================================================== 3. announcement bar */

  function initAnnouncement() {
    var bar = $('[data-announcement]');
    if (!bar) return;

    var key = 'pawly:announcement:' + (bar.getAttribute('data-key') || 'default');

    try {
      if (sessionStorage.getItem(key) === 'dismissed') {
        bar.hidden = true;
        return;
      }
    } catch (e) {
      /* private mode — just show the bar */
    }

    var close = $('[data-announcement-close]', bar);
    on(close, 'click', function () {
      bar.hidden = true;
      try {
        sessionStorage.setItem(key, 'dismissed');
      } catch (e) {
        /* nothing to do */
      }
    });
  }

  /* =============================================================== 4. cart */

  var Cart = (function () {
    var drawerEl = null;
    var overlayEl = null;
    var release = null;
    var isOpen = false;

    function refs() {
      drawerEl = $('[data-cart-drawer]');
      overlayEl = $('[data-cart-overlay]');
    }

    function open() {
      refs();
      if (!drawerEl || cfg.cartDrawerEnabled === false) return;
      isOpen = true;
      drawerEl.classList.add('is-open');
      drawerEl.removeAttribute('aria-hidden');
      if (overlayEl) overlayEl.classList.add('is-open');
      lockScroll();
      release = trapFocus(drawerEl, close);
    }

    function close() {
      refs();
      if (!drawerEl) return;
      isOpen = false;
      drawerEl.classList.remove('is-open');
      drawerEl.setAttribute('aria-hidden', 'true');
      if (overlayEl) overlayEl.classList.remove('is-open');
      unlockScroll();
      if (release) {
        release();
        release = null;
      }
    }

    /** Re-render the drawer server-side via the Section Rendering API, so the
     *  markup, the money formatting and the free-shipping bar all stay in
     *  Liquid. No money formatting is duplicated in JS. */
    function render() {
      return fetch(cfg.routes.cart + '?sections=cart-drawer', {
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          var html = data['cart-drawer'];
          if (!html) return;
          var parsed = new DOMParser().parseFromString(html, 'text/html');
          var fresh = parsed.querySelector('[data-cart-drawer]');
          var current = $('[data-cart-drawer]');
          if (fresh && current) current.innerHTML = fresh.innerHTML;
        })
        .catch(function () {
          /* leave the stale drawer rather than blanking it */
        });
    }

    function state() {
      return fetch(cfg.routes.cart + '.js', {
        headers: { Accept: 'application/json' }
      }).then(function (r) {
        return r.json();
      });
    }

    function syncCount(cart) {
      $$('[data-cart-count]').forEach(function (el) {
        el.textContent = cart.item_count;
        el.hidden = cart.item_count === 0;
      });
    }

    function announce(cart) {
      syncCount(cart);
      document.dispatchEvent(
        new CustomEvent('pawly:cart:updated', { detail: { cart: cart } })
      );
    }

    function refresh() {
      return state().then(function (cart) {
        announce(cart);
        return render().then(function () {
          return cart;
        });
      });
    }

    function add(formDataOrBody) {
      return fetch(cfg.routes.cartAdd, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formDataOrBody
      }).then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok) throw body;
          return body;
        });
      });
    }

    function change(payload) {
      return fetch(cfg.routes.cartChange, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(function (r) {
        return r.json();
      });
    }

    return {
      open: open,
      close: close,
      refresh: refresh,
      add: add,
      change: change,
      render: render,
      announce: announce,
      get isOpen() {
        return isOpen;
      }
    };
  })();

  window.PawlyCart = {
    open: Cart.open,
    close: Cart.close,
    refresh: Cart.refresh
  };

  function initCart() {
    // Delegated so re-rendered drawer markup keeps working.
    on(document, 'click', function (e) {
      var openBtn = e.target.closest('[data-cart-open]');
      if (openBtn && cfg.cartDrawerEnabled !== false) {
        e.preventDefault();
        Cart.open();
        Cart.refresh();
        return;
      }

      if (e.target.closest('[data-cart-close]') || e.target.closest('[data-cart-overlay]')) {
        e.preventDefault();
        Cart.close();
        return;
      }

      var removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        e.preventDefault();
        setBusy(removeBtn, true);
        Cart.change({ id: removeBtn.getAttribute('data-key'), quantity: 0 })
          .then(function (cart) {
            Cart.announce(cart);
            return Cart.render();
          })
          .catch(function () {
            setBusy(removeBtn, false);
          });
        return;
      }

      var stepBtn = e.target.closest('[data-cart-step]');
      if (stepBtn) {
        e.preventDefault();
        var next = parseInt(stepBtn.getAttribute('data-quantity'), 10);
        setBusy(stepBtn, true);
        Cart.change({ id: stepBtn.getAttribute('data-key'), quantity: next })
          .then(function (cart) {
            Cart.announce(cart);
            return Cart.render();
          })
          .catch(function () {
            setBusy(stepBtn, false);
          });
      }
    });

    // Any form marked data-pawly-add is intercepted; without JS it posts
    // normally to /cart/add and Shopify redirects to /cart. Both paths work.
    on(document, 'submit', function (e) {
      var form = e.target.closest('form[data-pawly-add]');
      if (!form) return;
      if (cfg.cartDrawerEnabled === false) return; // let it post to /cart

      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.textContent : '';
      var errorEl = form.querySelector('[data-add-error]');

      if (btn) {
        btn.disabled = true;
        btn.textContent = cfg.strings.adding;
      }
      if (errorEl) errorEl.hidden = true;

      Cart.add(new FormData(form))
        .then(function () {
          if (btn) btn.textContent = cfg.strings.added;
          return Cart.refresh();
        })
        .then(function () {
          Cart.open();
          setTimeout(function () {
            if (btn) {
              btn.disabled = false;
              btn.textContent = original;
            }
          }, 900);
        })
        .catch(function (err) {
          if (btn) {
            btn.disabled = false;
            btn.textContent = original;
          }
          if (errorEl) {
            errorEl.textContent = (err && err.description) || cfg.strings.cartError;
            errorEl.hidden = false;
          }
        });
    });

    // Quantity inputs on the /cart page, when JS is available.
    on(document, 'change', function (e) {
      var input = e.target.closest('[data-cart-qty]');
      if (!input) return;
      var qty = Math.max(0, parseInt(input.value, 10) || 0);
      Cart.change({ id: input.getAttribute('data-key'), quantity: qty }).then(function (cart) {
        Cart.announce(cart);
        if ($('[data-cart-page]')) {
          window.location.reload();
        } else {
          Cart.render();
        }
      });
    });
  }

  function setBusy(el, busy) {
    if (!el) return;
    el.setAttribute('aria-busy', busy ? 'true' : 'false');
    el.disabled = !!busy;
  }

  /* ====================================================== 5. scroll reveal */

  /**
   * Scroll-reveal.
   *
   * `.reveal` elements are visible in CSS. This function *arms* only the ones
   * currently below the fold (adding `.reveal--armed`, which is what actually
   * hides them) and reveals them on intersection.
   *
   * Consequence, and the whole point: if this file never loads, or the browser
   * has no IntersectionObserver, or the visitor asked for reduced motion, then
   * nothing is armed and every section is simply visible. Content is never
   * hostage to a script.
   */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;
    if (!motionAllowed() || !('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    items.forEach(function (el) {
      // Already handled (initial load, or a Theme Editor section re-render).
      if (el.classList.contains('reveal--armed') || el.classList.contains('is-in')) return;

      // Anything already on screen stays as it is — arming it would flash.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

      el.classList.add('reveal--armed');
      io.observe(el);
    });
  }

  /* ================================================== 6. category card tilt */

  function initTilt() {
    if (!cfg.tiltEnabled) return;
    if (!motionAllowed()) return;
    // Touch devices get the CSS press state and nothing else.
    if (!canHover()) return;
    if (!window.gsap) return;

    $$('[data-tilt]').forEach(function (card) {
      function move(e) {
        // The React source used e.offsetX / card.width — DOM elements have no
        // .width, so that evaluated NaN and the tilt silently did nothing.
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;

        window.gsap.to(card, {
          rotateY: x * 14,
          rotateX: -y * 14,
          duration: 0.3,
          transformPerspective: 700,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }

      function leave() {
        window.gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      on(card, 'mousemove', move);
      on(card, 'mouseleave', leave);
      on(card, 'blur', leave);
    });
  }

  /* ================================================== 7. generic accordions */

  function initAccordionGroups() {
    // Only one panel open at a time inside a [data-accordion-exclusive] group.
    $$('[data-accordion-exclusive]').forEach(function (group) {
      var items = $$('details', group);
      items.forEach(function (item) {
        on(item, 'toggle', function () {
          if (!item.open) return;
          items.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        });
      });
    });
  }

  /* ============================================================ 8. quantity */

  function initQuantitySteppers() {
    on(document, 'click', function (e) {
      var btn = e.target.closest('[data-qty-step]');
      if (!btn) return;
      e.preventDefault();
      var wrap = btn.closest('[data-qty]');
      var input = wrap && wrap.querySelector('input');
      if (!input) return;
      var step = parseInt(btn.getAttribute('data-qty-step'), 10);
      var min = parseInt(input.getAttribute('min'), 10) || 1;
      var value = (parseInt(input.value, 10) || min) + step;
      input.value = Math.max(min, value);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  /* ================================================================ shared */

  window.Pawly = {
    $: $,
    $$: $$,
    on: on,
    motionAllowed: motionAllowed,
    canHover: canHover,
    rafThrottle: rafThrottle,
    trapFocus: trapFocus,
    lockScroll: lockScroll,
    unlockScroll: unlockScroll,
    cart: Cart
  };

  /* ------------------------------------------------------------------ boot */

  function boot() {
    initHeader();
    initNavDrawer();
    initAnnouncement();
    initCart();
    initReveal();
    initTilt();
    initAccordionGroups();
    initQuantitySteppers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // The Theme Editor swaps section markup in without a page load.
  document.addEventListener('shopify:section:load', function () {
    initHeader();
    initNavDrawer();
    initAnnouncement();
    initReveal();
    initTilt();
    initAccordionGroups();
  });
})();
