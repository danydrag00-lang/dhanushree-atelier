# Dhanushree Timbers & Furnitures — Cinematic Website (Design 02)

A completely new, independently authored Dhanushree Timbers website built for the separate `dhanushree-atelier` repository. The original `dhanusree-timbers` repository has not been modified.

**GitHub repo:** https://github.com/danydrag00-lang/dhanushree-atelier

**Expected GitHub Pages URL:** https://danydrag00-lang.github.io/dhanushree-atelier/

## What changed in the second design

The rejected wireframe-led design has been replaced with a warm, cinematic timber-first art direction: a photographic hero, chocolate-charcoal / parchment / brass palette, bespoke editorial serif typography, full-bleed composition, active hero controls, asymmetric product galleries and an architectural custom-work inquiry page.

### Real interactions and animations

- **Cinematic hero**: 3-scene slideshow with timed 6.5-second image changes, crossfades, Ken Burns photography motion, scene title and progress indicator, previous / next and user-controlled pause / play.
- **Text choreography**: split headline lines reveal on initial page load; secondary copy, CTA and kicker enter with staggered motion.
- **Pointer-driven lighting**: restrained animated spotlight responds to pointer motion on desktop.
- **Scroll-linked depth**: scroll bar, sticky navigation treatment and parallax photography sections powered by native `requestAnimationFrame`.
- **Editorial product conveyor**: snap-scrolling horizontal category collection with working previous / next controls.
- **Scroll entrance reveals**: IntersectionObserver animates meaningful copy blocks when visible.
- **Product interactions**: hover zoom and arrow rotations, working category filtering with live result count.
- **Buttons and mobile navigation**: subtle magnetic pointer response on desktop; accessible animated mobile menu.
- **Accessibility**: `prefers-reduced-motion` disables decorative motion and auto-advancing slideshow. Native focus, semantic landmarks and responsive sizing.

All motion code is contained in `assets/site.js` and CSS — **no animation API keys or remote JavaScript frameworks needed**. It is actual HTML/CSS/JavaScript, not a screenshot of an animated website.

### Site pages

- `index.html` — cinematic landing page, selected categories, material story and custom-work flow.
- `store.html` — selected furniture categories with real filters and enquiry links.
- `custom-work.html` — distinct editorial custom work page with a WhatsApp brief form.
- `our-story.html` — genuine business offerings and local presence, without fabricated history.
- `contact.html` — phone, WhatsApp, email, Instagram, IndiaMART, registered and operating addresses.
- `privacy-policy.html`, `terms-and-conditions.html` — draft policies to verify with the business.
- `sitemap.xml`, `robots.txt` — search-crawler configuration.

### Images and representations

- `assets/hero-room.webp` — concept image generated specifically as an **illustrative furniture scene**. It is not a photograph of actual Dhanushree work.
- `assets/hero-bed.webp`, `assets/hero-doors.webp` and local category backups — illustrative preview images; the local backups were cropped from a conceptual design illustration.
- Other item photos load from Pexels links and are **reference inspiration only**. The site includes a practical local fallback or neutral colour panel when the external photo host is unavailable.
- No real rotating 360-degree photograph/model or working WebGL furniture viewer is claimed in this version. The animated scene moves a photograph; it does **not** represent a live 3D reconstruction of a manufactured Dhanushree product.
- Product prices, materials, stock, fabrication details and timelines must be verified through an enquiry.

### Run / publish

The site is a **standalone static repository**, with no build process, dependencies or credentials.

To publish on GitHub Pages: **Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.** When the Pages workflow succeeds, the website will use the URL shown above.

To preview without a live server, open `index.html`. External typography and Pexels images need Internet; the first hero, controls and baseline layout work with the bundled files.

### QA

Automated Chromium layout and script checks were performed at 320, 360, 390, 768, 1024 and 1440 CSS pixels. All pages had no horizontal overflow at those sizes; hero next/pause controls, mobile menu, Store filters, and custom-work form controls were exercised without JavaScript page errors. The preview was tested by injecting HTML/CSS/JS in a local browser because localhost/file URL navigation was restricted. Physical-device animation smoothness and live external image availability still require production validation.

### Business details

- **Dhanushree Timbers & Furnitures**, Kuttalam / Mayiladuthurai, Tamil Nadu, India.
- **Operating location:** Shakul Hameed Saw Mill, Anganeyer Kovil Street, Kuttalam, Kuthalam Taluk, Mayiladuthurai District, Tamil Nadu 609801.
- **Registered address:** 3/98B, Anna Nagar, Arayapuram Main Road, P.O. Malliyam, Kuthalam Taluk, Mayiladuthurai District, Tamil Nadu 609806.
- **Phone & WhatsApp:** +91 91593 90999
- **Email:** reachdhanushreetimbers@gmail.com
- **Instagram:** https://www.instagram.com/dhanushree_timbers/
- **IndiaMART:** https://www.indiamart.com/dhanusree-timbers/
- **Delivery:** available locally within ~40 km; further delivery subject to charges and availability.

### Project source

`redesign_build.py` generates the seven HTML pages and the sitemap. `assets/site.css` and `assets/site.js` are the art-directed styling and motion system. Run `python redesign_build.py` only after editing its page definitions. Do not run the obsolete `build.py` from version 01.

## Material in Motion — Figma Sites–inspired interaction study (November 2026)

An original, native CSS/JavaScript motion layer inspired by Figma Sites' publicly documented interaction patterns. This website **is not hosted in Figma Sites** and does not copy a Figma template.

- The homepage opens with photographic camera drift, cinematic crossfades and controllable slides.
- A moving timber/material typography ribbon is continuously animated and pauses on hover.
- **Follow the grain** is a new pinned, three-chapter visual story. Scrolling actually reveals each photograph through a physical left-to-right wipe; the chapter controls jump to the corresponding scroll position, and a progress rule follows your position.
- Photo details enter with image and label masks. Furniture tiles respond to the cursor with subtle perspective and a contextual viewing circle. The collection can be dragged as well as operated with its arrow buttons.
- The existing store filters, quote/WhatsApp flow, navigation and business information remain intact.
- CSS respects `prefers-reduced-motion`; motion is disabled and the story becomes a non-pinned, readable first frame. No fake 360° claims are made about photographs, and imagery remains illustrative.

**Files:** `assets/figma-motion.css` and `assets/figma-motion.js`; the new visual story is semantic markup in `index.html`. All pages load the shared motion layer for consistent detailing.

**Quality checks completed:** JavaScript syntax and static HTML/CSS/reference validation. Browser automation was blocked by the current execution environment, so a live visual-regression, GPU-performance or full accessibility check is **not** claimed. Verify GitHub Pages rendering on desktop and mobile before treating the site as production approved.

Reference interaction patterns: https://help.figma.com/hc/en-us/articles/35895820755095-Figma-Sites-collection-Add-interactions-to-a-website