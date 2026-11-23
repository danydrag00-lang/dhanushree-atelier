/**
 * Dhanushree / Material in Motion. Original scroll and hover interactions.
 * No external animation scripts; no fake 3D product controls.
 */
(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const smoothstep = (a, b, v) => {
    const t = clamp((v - a) / (b - a));
    return t * t * (3 - 2 * t);
  };
  const hero = document.querySelector('[data-cinema-hero]');
  const story = document.querySelector('[data-fm-story]');
  const storySticky = story?.querySelector('.fm-story-sticky');
  const steps = story ? [...story.querySelectorAll('[data-fm-jump]')] : [];
  const storyFrames = story ? [...story.querySelectorAll('[data-fm-frame]')] : [];
  const track = document.querySelector('[data-collection-track]');
  let lastStep = -1;
  let pending = false;

  // This runs only on scroll/resize, not on an uncontrolled perpetual animation loop.
  function updateScroll() {
    pending = false;
    if (reduced.matches) return;
    const vh = window.innerHeight;
    if (hero) {
      const r = hero.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        const t = clamp(-r.top / Math.max(r.height, 1));
        hero.style.setProperty('--fm-hero-y', `${(-35 * t).toFixed(2)}px`);
        hero.style.setProperty('--fm-vignette-x', `${(12 * t).toFixed(2)}px`);
      }
    }
    if (story && storySticky) {
      const r = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - storySticky.offsetHeight);
      const progress = clamp(-r.top / travel);
      // Two distinct photographic wipes, not a single generic fade-up effect.
      const one = smoothstep(.21, .49, progress);
      const two = smoothstep(.60, .87, progress);
      story.style.setProperty('--fm-wipe-1', `${(100 - 100 * one).toFixed(2)}%`);
      story.style.setProperty('--fm-wipe-2', `${(100 - 100 * two).toFixed(2)}%`);
      story.style.setProperty('--fm-story-progress', progress.toFixed(4));
      const scale = 1.11 - .09 * progress;
      story.style.setProperty('--fm-image-scale', scale.toFixed(4));
      story.style.setProperty('--fm-image-vertical', `${(-9 + progress * 20).toFixed(1)}px`);
      story.style.setProperty('--fm-caption-y', `${(-4 + progress * 8).toFixed(1)}px`);
      const active = progress < .39 ? 0 : progress < .735 ? 1 : 2;
      if (active !== lastStep) {
        lastStep = active;
        steps.forEach((button, i) => {
          button.classList.toggle('is-active', i === active);
          if (i === active) button.setAttribute('aria-current', 'step');
          else button.removeAttribute('aria-current');
        });
      }
    }
  }
  function schedule() {
    if (!pending) { pending = true; window.requestAnimationFrame(updateScroll); }
  }
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  reduced.addEventListener?.('change', schedule);
  schedule();

  // The chapter index is a real control: it scrolls to the matching visual frame.
  if (story && storySticky) {
    steps.forEach((button, i) => button.addEventListener('click', () => {
      if (reduced.matches) return;
      const target = [0, .48, .94][i];
      const travel = Math.max(1, story.offsetHeight - storySticky.offsetHeight);
      const top = story.getBoundingClientRect().top + window.scrollY + travel * target;
      window.scrollTo({top, behavior:'smooth'});
    }));
    // Static fallback if a remote illustrative image cannot load.
    const local = ['assets/hero-workshop.webp', 'assets/hero-dining.webp', 'assets/hero-room.webp'];
    storyFrames.forEach((frame, i) => {
      const img = frame.querySelector('img');
      if (!img) return;
      img.addEventListener('error', () => {
        if (!img.src.endsWith(local[i])) img.src = local[i];
      });
    });
  }

  // Add optical motion to real photographs, leaving the no-JS site untouched.
  const imageFrames = [...document.querySelectorAll('.craft-visual,.end-image,.about-values img,.bespoke-gallery .photo-frame')];
  imageFrames.forEach(el => el.classList.add('fm-image-reveal'));
  const labels = [...document.querySelectorAll('.section-topline,.eyebrow.dark,.section-eyebrow')];
  labels.forEach(el => el.classList.add('fm-label-reveal'));
  if (!('IntersectionObserver' in window) || reduced.matches) {
    [...imageFrames,...labels].forEach(el => el.classList.add('is-in-view'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(({target, isIntersecting}) => {
        if (isIntersecting) { target.classList.add('is-in-view'); io.unobserve(target); }
      });
    }, {threshold: .13, rootMargin:'0px 0px -6% 0px'});
    [...imageFrames,...labels].forEach(el => io.observe(el));
  }

  // A small studio 'VIEW' cursor follows relevant visuals. Never obscures the native cursor.
  if (!reduced.matches && finePointer.matches) {
    const surfaces = [...document.querySelectorAll('.collection-tile, .product-card')];
    if (surfaces.length) {
      const cursor = document.createElement('div');
      cursor.className = 'fm-cursor';
      cursor.setAttribute('aria-hidden','true');
      cursor.textContent = 'EXPLORE ↗';
      document.body.appendChild(cursor);
      let mx = -150, my = -150, px = -150, py = -150, moving = false;
      const frame = () => {
        if (!moving) return;
        px += (mx - px) * .2;
        py += (my - py) * .2;
        cursor.style.transform = `translate3d(${(px - 46).toFixed(1)}px,${(py - 46).toFixed(1)}px,0)`;
        if (Math.abs(mx - px) > .2 || Math.abs(my - py) > .2) requestAnimationFrame(frame);
        else moving = false;
      };
      const start = () => { if (!moving) { moving = true; requestAnimationFrame(frame); } };
      surfaces.forEach(card => {
        card.addEventListener('pointerenter', () => cursor.classList.add('is-on'));
        card.addEventListener('pointermove', e => {
          mx = e.clientX; my = e.clientY; start();
          const r = card.getBoundingClientRect();
          if (card.classList.contains('collection-tile')) {
            const nx = (e.clientX - r.left) / r.width - .5;
            const ny = (e.clientY - r.top) / r.height - .5;
            const img = card.querySelector('.tile-img');
            if (img) {
              img.style.setProperty('--fm-tilt-x', `${(nx * 4).toFixed(2)}deg`);
              img.style.setProperty('--fm-tilt-y', `${(-ny * 3).toFixed(2)}deg`);
              img.style.setProperty('--fm-card-x', `${(-nx * 6).toFixed(2)}px`);
              img.style.setProperty('--fm-card-y', `${(-ny * 6).toFixed(2)}px`);
            }
          }
        }, {passive:true});
        card.addEventListener('pointerleave', () => {
          cursor.classList.remove('is-on');
          const img = card.querySelector('.tile-img');
          if (img) {
            for (const k of ['--fm-tilt-x','--fm-tilt-y','--fm-card-x','--fm-card-y']) img.style.removeProperty(k);
          }
        });
      });
      document.addEventListener('visibilitychange', () => { if (document.hidden) cursor.classList.remove('is-on'); });
    }
  }

  // The collection is physically draggable like a strip of samples; arrow clicks still work.
  if (track && !reduced.matches && finePointer.matches) {
    let down = false, anchor = 0, initial = 0, moved = false;
    track.addEventListener('pointerdown', event => {
      if (event.button !== 0) return;
      down = true; moved = false; anchor = event.clientX; initial = track.scrollLeft;
    });
    window.addEventListener('pointermove', event => {
      if (!down) return;
      const dx = event.clientX - anchor;
      if (Math.abs(dx) > 8) moved = true;
      if (moved) { track.style.scrollBehavior = 'auto'; track.scrollLeft = initial - dx; }
    }, {passive:true});
    const finish = () => { down = false; track.style.scrollBehavior = ''; };
    window.addEventListener('pointerup',finish);
    window.addEventListener('pointercancel',finish);
    track.addEventListener('click',event => {if(moved) {event.preventDefault();event.stopPropagation();moved=false;}},true);
  }
})();