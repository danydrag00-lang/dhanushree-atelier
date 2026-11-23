/** Dhanushree Timbers — page-wide cinematic interactions.
 * Real scroll-driven image depth, photographed scene wipes and editorial cues.
 * Existing product filters, forms and navigation stay owned by site.js.
 */
(() => {
  'use strict';
  const mq = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const films = [...document.querySelectorAll('[data-cine-panel]')];
  const targets = [...document.querySelectorAll('.cine-film, .product-card, .bespoke-gallery .bespoke-photo, .about-values, .collection-section, .process-section')];
  const rail = document.createElement('span');
  rail.className = 'cine-rail';
  rail.setAttribute('aria-hidden', 'true');
  const fill = document.createElement('span'); fill.className = 'cine-rail-fill'; rail.appendChild(fill);
  document.body.append(rail);
  const announce = document.createElement('span');
  announce.className = 'cine-announce'; announce.setAttribute('aria-hidden', 'true');
  announce.textContent = document.body.classList.contains('page-home') ? 'DH / MATERIAL & FORM' : 'DH / CRAFTED IN WOOD';
  document.body.append(announce);
  if (!mq.matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-cine-inview');
          io.unobserve(entry.target);
        }
      });
    }, {rootMargin: '0px 0px -8% 0px', threshold: .1});
    targets.forEach(target => io.observe(target));
    document.documentElement.classList.add('cine-motion-ready');
  } else {
    targets.forEach(target => target.classList.add('is-cine-inview'));
  }
  // Do not run a continuous animation loop. Scroll requests one paint at a time.
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const doc = document.documentElement;
    const range = Math.max(1, doc.scrollHeight - innerHeight);
    fill.style.transform = `scaleY(${clamp(scrollY / range).toFixed(4)})`;
    if (mq.matches) return;
    for (const film of films) {
      const rect = film.getBoundingClientRect();
      if (rect.bottom < -50 || rect.top > innerHeight + 50) continue;
      const progress = clamp((innerHeight - rect.top) / (innerHeight + rect.height));
      film.style.setProperty('--cine-y', `${((progress - .5) * 76).toFixed(2)}px`);
    }
  };
  const request = () => {
    if (!scheduled) {scheduled = true; requestAnimationFrame(update)}
  };
  addEventListener('scroll', request, {passive:true});
  addEventListener('resize', request, {passive:true});
  mq.addEventListener?.('change', request);
  request();
  // Public page transitions: use native navigation and browser history, never hold a route hostage.
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    a.addEventListener('pointerenter', () => {a.style.setProperty('--cine-warmth', '1')}, {passive:true});
    a.addEventListener('pointerleave', () => {a.style.removeProperty('--cine-warmth')}, {passive:true});
  });
})();