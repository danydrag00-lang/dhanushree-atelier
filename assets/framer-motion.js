/**
 * Dhanushree / Motion enhancement layer
 * Uses Motion (formerly Framer Motion) for vanilla JavaScript.
 * The existing cinematic system owns its own effects; this layer only touches
 * otherwise unanimated details to prevent conflicting transforms.
 * GitHub Pages compatible: no React, bundler, API key or build required.
 */
(async function initMotionEnhancements() {
  "use strict";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduced.matches || !("IntersectionObserver" in window)) return;

  // Import before hiding or adjusting any content. If the CDN is unavailable,
  // the complete site remains visible, navigable and functional.
  let motion;
  try {
    motion = await import("https://cdn.jsdelivr.net/npm/motion@14.11.1/+esm");
  } catch (error) {
    console.warn("Optional Motion enhancements unavailable; original site remains active.", error);
    return;
  }
  if (reduced.matches) return;

  const { animate, inView, scroll, hover } = motion;
  const ease = [0.22, 1, 0.36, 1];
  const controls = [];
  const stops = [];
  const prepared = new Set();

  function entrance(selector, stagger = 0.065) {
    document.querySelectorAll(selector).forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      // Keep initial viewport paint and all existing CSS reveals unchanged.
      if (rect.top < window.innerHeight - 18 || rect.width === 0) return;
      element.style.opacity = "0";
      prepared.add(element);
      const stop = inView(element, () => {
        if (reduced.matches) {
          element.style.opacity = "1";
          return;
        }
        try {
          controls.push(animate(
            element,
            { opacity: [0, 1], y: [17, 0] },
            { duration: 0.78, delay: Math.min(index % 4 * stagger, 0.25), ease }
          ));
        } catch (error) {
          element.style.opacity = "1";
          element.style.transform = "";
        }
      }, { amount: 0.2, margin: "0px 0px -4% 0px" });
      stops.push(stop);
    });
  }

  // Small editorial details, rather than duplicating the hero, scene wipes,
  // headings, gallery tilts or Store filters already animated by this website.
  entrance(".value-inner > span", 0.095);
  entrance(".process-step > b", 0.11);
  entrance(".product-meta", 0.035);
  entrance(".about-values-copy .values-line", 0.075);
  entrance(".contact-columns > div", 0.09);
  entrance(".footer-side", 0.04);
  entrance(".footer-columns > div", 0.09);

  // Hover is touch-safe. Only the arrow child moves, leaving magnetic CTA
  // buttons and their existing transforms owned by the original site.js.
  stops.push(hover(".btn-gold, .btn-outline, .btn-dark, .round-cta", element => {
    const arrow = element.querySelector(":scope > span:last-child");
    if (!arrow) return;
    arrow.style.display = "inline-block";
    controls.push(animate(arrow, { x: 5, y: -3 }, {
      type: "spring", stiffness: 280, damping: 22
    }));
    return () => controls.push(animate(arrow, { x: 0, y: 0 }, {
      type: "spring", stiffness: 260, damping: 23
    }));
  }));

  stops.push(hover(".value-inner > span", element => {
    const glyph = element.querySelector("i");
    if (!glyph) return;
    glyph.style.display = "inline-block";
    controls.push(animate(glyph, { rotate: 45, scale: 1.14 }, {
      type: "spring", stiffness: 235, damping: 18
    }));
    return () => controls.push(animate(glyph, { rotate: 0, scale: 1 }, {
      type: "spring", stiffness: 235, damping: 19
    }));
  }));

  // A subtle scroll-linked grain shift in the footer. No extra scroll event
  // listeners or continuously running requestAnimationFrame loops are needed.
  const footer = document.querySelector(".footer");
  const grain = footer?.querySelector(".footer-grain");
  if (footer && grain) {
    const drift = animate(grain, { x: ["-2.5%", "2.5%"] }, { ease: "linear" });
    controls.push(drift);
    stops.push(scroll(drift, {
      target: footer,
      offset: ["start end", "end start"]
    }));
  }

  // Turning on reduced motion later immediately restores every hidden detail.
  reduced.addEventListener("change", () => {
    if (!reduced.matches) return;
    stops.forEach(stop => { try { stop(); } catch (_) {} });
    controls.forEach(control => { try { control.stop(); } catch (_) {} });
    prepared.forEach(element => {
      element.style.opacity = "";
      element.style.transform = "";
    });
    if (grain) grain.style.transform = "";
  }, { once: true });
})();
