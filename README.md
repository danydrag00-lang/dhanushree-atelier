# Dhanushree Atelier — New Dhanushree Timbers website

**This is a completely new, independent static website project.** It is not a clone or modification of the existing `dhanusree-timbers` repository. The design is a deliberately art-directed concept: mineral ink, warm paper, editorial typographic hierarchy, joinery illustration, modest motion and genuine WebGL geometry.

## The website

- `index.html` — bespoke homepage with an **interactive WebGL timber joinery study**. The 3D piece is an illustrative design concept, not a real product listing.
- `store.html` — 18 selected furniture/woodwork categories, real category filters and WhatsApp enquiry links. This is explicitly **not the full catalogue**.
- `custom-work.html` — drafting-style hero, process and a form that generates a WhatsApp message only when the visitor submits it.
- `our-story.html` — grounded local business information without invented dates, achievements or workshops.
- `contact.html` — phone, WhatsApp, email, operating location, registered address, IndiaMART and Instagram.
- `privacy-policy.html`, `terms-and-conditions.html` — starting-point legal content to review for your actual practices.

The site runs on GitHub Pages with no Node.js build, framework, database or API key. Open `index.html` in a browser after extracting it, or host the directory on a static server. **Internet access is required for the stock photography and Google Fonts.**

## Put this in a brand-new GitHub repository (no coding required)

1. Open **https://github.com/new** and sign in to your existing account.
2. Set the repository name to **`dhanushree-atelier`**, choose **Public**, and click **Create repository**. Do not initialise it with a README or licence.
3. Extract the ZIP. In GitHub, choose **uploading an existing file** / **Add file → Upload files**. Upload the files and `assets` folder from *inside* the extracted `dhanushree-atelier` folder, not the ZIP itself. Click **Commit changes**.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Set branch **main** and folder **/(root)**. Save.
5. Your expected URL after Pages finishes publishing is `https://danydrag00-lang.github.io/dhanushree-atelier/`. This URL is **not live until you have created the repository, uploaded the files and enabled Pages**.

An alternative is to create the empty repository and send its link to ChatGPT so the connected GitHub integration can add files to that new repository.

## Brand and business details

- Brand: Dhanushree Timbers & Furnitures
- Phone/WhatsApp: +91 91593 90999
- Email: reachdhanushreetimbers@gmail.com
- Instagram: https://instagram.com/dhanushree_timbers
- IndiaMART: https://www.indiamart.com/dhanusree-timbers/
- Operating location for visits: Shakul Hameed Saw Mill, Anganeyer Kovil Street, Kuttalam, Kuthalam Taluk, Mayiladuthurai District, Tamil Nadu 609801, India
- Registered address: 3/98B, Anna Nagar, Arayapuram Main Road, P.O. Malliyam, Kuthalam Taluk, Mayiladuthurai District, Tamil Nadu 609806, India
- Delivery: approximately 40 km locally; greater-distance charges/availability subject to discussion

## Design and technology

- Bespoke responsive CSS with Instrument Serif and DM Sans (Google Fonts with system fallbacks).
- An original typographic `D` seal and editorial visual language. This is a **new concept wordmark**, not a copy of the previous uploaded company logo. Replace if you prefer your existing approved icon.
- Real WebGL vertex and fragment shaders, custom 3D timber portal geometry, wood-inspired finish studies, pointer rotation, responsive resolution, pause offscreen and low-motion fallback. No external 3D library required.
- Semantic HTML, keyboard focus, reduced-motion rules, mobile navigation, alt text, product filtering, and local business structured data.
- No fabricated prices, reviews, certifications, founding date, product inventory or workshop photos.

## Photos and attribution

The site links directly to distinct photographs hosted by **Pexels**, chosen from an existing list of category-matched Pexels references. See `IMAGE-SOURCES.md` for the selected IDs and source pages. These are **illustrative stock photographs, not confirmed Dhanushree products, project photos, or facilities**. They can be replaced with genuine photos when available.

Pexels licensing: https://www.pexels.com/license/ — its license permits free website/commercial use, subject to its conditions. Do not imply endorsement by individuals or brands shown in stock images. Google Fonts licensing is open-source; see fonts' upstream repositories for the applicable licence.

## Before the final production launch

- Check every photo renders on the public domain and that its specific photo is suitable for the category. The current sandbox could not fetch external image URLs during visual QA.
- Replace the illustrative images with your real products, workshop and timber stock imagery where possible.
- Review the legal pages against actual business practices with appropriate advice.
- Add a correct canonical URL and an XML sitemap once the final public site URL is confirmed. Do not publish placeholder canonical URLs.
- Run Lighthouse on the real domain and inspect the WebGL fallback on older phones.
- Test the custom order WhatsApp link and delivery information on your devices.

## Scope of testing

Completed: all seven documents parse, have exactly one H1 and valid internal page links; desktop/mobile static rendering at 320, 360, 390, 768, 1024 and 1440 pixels has no horizontal overflow in a headless Chromium test; store category filter and mobile menu operate; JavaScript syntax passes `node --check`.

Not verified: remote image availability under this environment's network restrictions, full accessibility certification, performance/Lighthouse numbers, or actual WebGL GPU performance in a physical device. The hero includes a static geometric fallback where WebGL is unavailable.

## Files you can edit

- `assets/site.css` — all visual styling
- `assets/site.js` — menu, filters and custom WhatsApp enquiry
- `assets/joinery-3d.js` — original interactive WebGL study
- `build.py` — optional source generator for HTML pages (requires Python 3; compiled HTML files are already included)

**No change has been made to your old GitHub repository's website code.**