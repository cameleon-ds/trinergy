document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    var closeMenu = function () {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
    var openMenu = function () {
      nav.classList.add('open');
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  initScrollReveal();
});

/* Scroll reveal: fade-in + slight slide-up for every content block, on every page.
   Grid/list containers reveal their children one by one (staggered);
   standalone blocks (hero text, split images, headers...) reveal as a single unit. */
function initScrollReveal() {
  var GROUP_SELECTORS = [
    '.concept-grid', '.stats-grid', '.testimonial-grid', '.values-grid',
    '.parcours-grid', '.timeline', '.dual-cards', '.service-cards',
    '.split', '.faq', '.cta-band .container', '.contact-info .container',
    '.site-footer .container',
    '.hero:not(.hero-small) .hero-content'
  ];
  var STANDALONE_SELECTORS = [
    '.hero-small .hero-content',
    '.holistic-image-side', '.holistic-text-side',
    '.section > .container > h1', '.section > .container > h2', '.section > .container > h3',
    '.section > .container > .eyebrow', '.section > .container > .lede', '.section > .container > .sub',
    '.section > .container > a.btn',
    '.contact-form-side', '.contact-image-side'
  ];
  var STAGGER_STEP = 0.14;
  var STAGGER_MAX = 6;
  var revealEls = [];

  GROUP_SELECTORS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.classList.contains('reveal')) return;
        child.classList.add('reveal');
        child.style.transitionDelay = (Math.min(i, STAGGER_MAX) * STAGGER_STEP) + 's';
        revealEls.push(child);
      });
    });
  });

  STANDALONE_SELECTORS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
      revealEls.push(el);
    });
  });

  // Once an element has fully faded in, drop the reveal classes/inline delay so the
  // long entrance transition doesn't linger and interfere with later interactions
  // (e.g. a button's own hover transition). The end state (opacity 1, transform none)
  // is identical to the browser default, so nothing visually changes.
  var settleReveal = function (el) {
    el.classList.add('is-visible');
    var delayMs = (parseFloat(el.style.transitionDelay) || 0) * 1000;
    setTimeout(function () {
      el.classList.remove('reveal', 'is-visible');
      el.style.transitionDelay = '';
    }, delayMs + 1300 + 80);
  };

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(settleReveal);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        settleReveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
}
