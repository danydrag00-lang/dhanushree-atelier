# Dhanushree Timbers & Furnitures — Cinematic Website (Design 02)

A completely new, independently authored Dhanushree Timbers website built for the separate `dhanushree-atelier` repository. The original `dhanusree-timbers` repository has not been modified.

**GitHub repo:** https://github.com/danydrag00-lang/dhanushree-atelier

**Expected GitHub Pages URL:** https://danydrag00-lang.github.io/dhanushree-atelier/

## Update: cinematic hero film and genuine timber-grain detail

- `assets/dhanushree-cinematic-hero.mp4` is an optimised copy of the supplied video; `assets/hero-video-poster.webp` provides a static fallback.
- `assets/hero-video.css` and `assets/hero-video.js` handle cinematic background playback, pausing and accessibility.
- The homepage craft section uses Pexels photo 36299688, a real natural wood-grain macro rather than an architectural wall panel.
- Decorative “DH / MATERIAL STUDY”, “03 FRAMES”, “MATERIAL STUDY / 02”, “02 — THE MATERIAL”, and “BORN FROM THE MATERIAL” tags have been removed; existing story controls and actual heading remain.
- The historical `redesign_build.py` generator is not the source for later motion components. Preserve those components when rebuilding pages.

## What changed in the second design

The rejected wireframe-led design has been replaced with a warm, cinematic timber-first art direction: a photographic hero, chocolate-charcoal / parchment / brass palette, bespoke editorial serif typography, full-bleed composition, active hero controls, asymmetric product galleries and an architectural custom-work inquiry page.

### Real interactions and animations

- **Cinematic hero:** user-supplied 15-second silent looping video (web-compressed to ~1.9 MB), with a pause/play control, poster/fallback still and reduced-motion/data-saver safeguards. The clip is presented as a concept, not evidence of Dhanushree's facilities.
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
- `contact.html` — phone, WhatsApp, email, Instagram, IndiaMART, operating address.
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

## Design 03 — Entire Website, One Cinematic Art Direction (23 November 2026)

All seven pages now use the homepage hero as the creative benchmark, without copying identical page layouts. The previous light, static interior sections have been replaced with a continuous dark timber / warm bronze / editorial photography system.

- **Home:** dark cinematic product conveyor, pinned three-chapter image story, material close-ups and photographic custom-work sequence.
- **Store:** full-bleed dining-led opening, dark photographic gallery with category filters, a full-height doors-and-joinery interlude and a photographic enquiry finish.
- **Custom Work:** bedroom-led opening, warmly lit material section, full-height custom furniture scene and an accessible dark enquiry form that still sends through WhatsApp.
- **Our Story:** woodcraft opening, material-led editorial typography, full-height timber photo story and local service information.
- **Contact:** real full-width photographic composition rather than the former light split hero, an immersive local invitation and dark contact/address panels.
- **Privacy Policy and Terms:** photographic, brand-consistent top sections while preserving quiet, high-contrast policy reading panels.
- **Footer:** dark architectural background and original concentric joinery-inspired linework.

**Motion that actually runs:** page-wide intersection-triggered image shutters, staggered film-copy reveals, scroll-responsive media depth, cinematic slideshow, material marquee, interactive collection, and a fixed desktop page-progress detail. Motion respects `prefers-reduced-motion` and never blocks links, forms or native browser navigation.

**Implementation:** `assets/cinematic-site.css` and `assets/cinematic-site.js`, linked last on all pages. The existing `assets/site.js` and `assets/figma-motion.js` continue to power existing behaviour. The published HTML files are the source of truth; `redesign_build.py` remains as a historical generator and **must not be run over Design 03**, since it does not include the new film sections or styles.

**Image accuracy:** Each full-height illustration is explicitly labelled as an illustrative reference, **not a verified Dhanushree project**. Higher resolution Pexels imagery is requested when available, with included local WebP backups. Product-specific actual photography would improve credibility further.

**QA performed:** Chromium inline rendering checks for all seven pages at 390, 768 and 1440 px reported no horizontal overflow or JavaScript page errors; Store category filtering returned the expected three bedroom results. A full live-site/device/Lighthouse audit remains outstanding. The inline browser test does not establish actual network photo loading or production motion performance.

## Design 04 — Figma Motion–inspired interaction language (23 November 2026)

**Inspiration, not imitation:** This edition interprets publicly visible ideas from [Figma for Motion](https://figmaformotion.com/)—Product Spotlight, Infinite Gallery, Magnetic Interaction, Seamless Transition and Scroll Stories—into bespoke work for Dhanushree Timbers. No template, proprietary asset, Figma source or Figma plugin file was copied.

**New experience**

- **Store / Product Spotlight:** a full-bleed three-scene photographic gallery with genuine previous/next controls, labelled chapters, an animated progress rail, image-mask transitions, and keyboard-operated arrows. The imagery is explicitly described as illustrative.
- **Custom Work / Idea Studies:** three photographic directions—beds, dining, doors—changed by buttons with `aria-pressed` state. Each selection changes the visual and a practical enquiry prompt. It is *not* a photoreal finish configurator or 360-degree product model.
- **Every principal page / Spatial index:** a quiet, right-edge chapter navigation that follows viewport position and actually scrolls to the selected section. Hidden on smaller screens to protect useful space.
- **Editorial type:** headings reveal their words in sequence once scrolled into view; actual heading tags and emphasis remain in the document for screen readers and SEO.
- **Page transitions:** native cross-document View Transitions where supported; navigation and back/forward history remain native and work in browsers without the feature.
- **About:** original hand-authored timber grain linework progressively traces in response to scrolling.
- **Contact:** three directly actionable routes—Call, WhatsApp and Visit—with motion integrated into the existing full-width cinematic page.
- **Photography:** calibrated scroll-camera depth and pointer-responsive crops, without fake 3D rotation labels. Existing catalogue filters, links and WhatsApp enquiry form remain unchanged.

**Files:** `assets/motion-studio.css` and `assets/motion-studio.js` loaded after the previous site styles and scripts on all seven pages. The new Store and Custom Work sections are authored directly into their respective HTML files. Source HTML—not `redesign_build.py`—remains the canonical version; running the old generator will remove these changes.

**Motion and accessibility:** `prefers-reduced-motion` turns off animated transitions, opening shutters and kinetic text; all studio and Store controls continue to work. No JS is required for normal page links or for the static first scene, and the policy pages retain restrained text presentation.

**Browser QA:** locally inline-rendered Chromium checks on all seven pages at 390, 768 and 1440 CSS px show zero horizontal overflow or JavaScript errors. Store’s next scene changes the active frame and live title; custom inspiration selection changes `aria-pressed` and its photograph; Store filters still work; reduced-motion controls remain usable. Browser tests do not establish live GitHub Pages availability, network image availability or physical-device frame-rate smoothness.

## Motion (formerly Framer Motion) — JavaScript enhancement (24 November 2026)

The latest site keeps the existing standalone HTML/CSS/JavaScript architecture while loading the official **Motion for JavaScript** library (the framework-independent companion to Framer Motion) on all seven pages.

- **Added:** `assets/framer-motion.js` as a native `type="module"` script on each page.
- **Version:** the CDN import is pinned to `motion@14.11.1` via jsDelivr rather than an unbounded `latest` release.
- **New details:** viewport-triggered staggered reveals for selected labels, product metadata, contact details and footer columns; subtle spring-driven CTA-arrow and timber-symbol hover gestures; scroll-linked footer-grain drift.
- **Preserved:** the existing hero film, cinematic transitions, Figma-inspired scroll story, Store filters, mobile menu, form, SEO copy and GitHub Pages' no-build deployment. Existing effects retain ownership of their transforms to avoid clashing.
- **Accessibility:** reduced-motion users receive the original static content. If the optional CDN script fails, all content remains visible and site actions remain functional.
- **No React migration, npm installation, account, key or plugin subscription is necessary.**

The module follows Motion's official static-HTML import guidance: https://motion.dev/docs/quick-start . The React-only package `framer-motion` is not installed because this is not a React website. This integration adds a real animation library, not a proprietary Framer editor plugin. Test the production URL with an active network connection to verify the CDN-backed enhancements.
