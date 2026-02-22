# Technical Audit Summary – Weblink Static Site (HTTrack)

## 1. Current State

### 1.1 Structure
- **Root** `index.html`: HTTrack index (redirects to www.weblink.in).
- **Main site**: `www.weblink.in/` with flat HTML + folders (services, blog, portals, industries, crm-software, school-erp-software, weblink-cart, press-release, accounts, contact-us).
- **HTTrack artifacts**: Deep duplicate trees under `blog/portals/portals/...` (20+ levels), `blog/category/portals/portals/...`, and `blog/images/portals/portals/...` with hundreds of duplicate `index-N.html` files. Same content repeated; safe to remove.

### 1.2 HTML
- **~300+ real pages** (excluding `portals/portals` junk).
- **Inline scripts**: Homepage has ~80 lines of banner typing animation in `<script>`.
- **Inline styles**: None major; some form success message styles in JS.
- **Semantic use**: Partial (e.g. `<header>`, `<nav>`, `<footer>` present); many wrappers are generic `<div>`.
- **Paths**: Root pages use `css/`, `scripts/`, `images/`. Deep pages use long relative paths (`../../../../../../../../css/...`).
- **Duplicate IDs**: e.g. `ProductsDropdown` used for both “Our Portals” and “Products” in nav.
- **External refs**: `../erp.weblink.in/css/fontawesome-6-2-0.css`, `blogimages.weblink.in` (blog images), some pages load jQuery from `code.jquery.com` or `cdn.jsdelivr.net` (duplicate with local).

### 1.3 CSS
| File | Role | Notes |
|------|------|--------|
| `style-new.css` | Main site UI | Minified; primary layout, nav, banner, sections. |
| `style.css` | Legacy | Possibly unused or override. |
| `bootstrap.min.css` | Vendor | Required. |
| `owl.carousel.min.css` | Vendor | Carousel. |
| `intlTelInput.css` | Vendor | Phone input. |
| `font-awesome.min.css` | Icons | In www.weblink.in/css. |
| `blog-style.css` | Blog | Blog pages only. |
| `style-crm.css`, `style-erp.css`, `style-ecom.css` | Section-specific | CRM/ERP/E‑commerce pages. |
| `landing-page.css`, `whatsapp-api-pages.css`, `press-release.css` | Page-specific | |
| `animate-min.css`, `fonts-img.css`, `styled4a9.css` | Unknown | Check usage. |

**Duplicates / issues**: `styled4a9.css` looks like a copy; Font Awesome exists in both www.weblink.in and erp.weblink.in; some background paths in CSS use `../images/` (will need path fix after move).

### 1.4 JavaScript
| Location | File | Role |
|----------|------|------|
| `scripts/` | `jquery.min.js` | Core (required). |
| `scripts/` | `popper.min.js`, `bootstrap.min.js` | Bootstrap. |
| `scripts/` | `owl.carousel.min.js`, `intlTelInput.js` | Plugins. |
| `scripts/` | `custom.js` | **Main**: FAQ, tabs, form validation, AJAX (Portal, Contact, ERP, Video), intlTelInput init, validateMobile/validateEmail. |
| `js/` | `custom.js` | **Different**: placeholder animation, carousel animation, payment tabs (Paytm/GPay/UPI). |
| `js/` | `bootstrap.min.js`, `popper.min.js`, `animation.js` | Duplicates of scripts/ or extra. |

**Conclusion**: Two different `custom.js` files; both needed. Merge into one `custom.js` (or main + optional modules). jQuery loaded twice on some blog pages (local + code.jquery.com).

### 1.5 Images & Fonts
- **Images**: `www.weblink.in/images/` (home-page, svg-icon, crmimg, etc.); some under `blogimages.weblink.in/` (external subdomain).
- **Fonts**: `www.weblink.in/fonts/` (Font Awesome webfonts); also `erp.weblink.in` for Font Awesome 6.
- **Icons**: SVGs in `images/home-page/svg-icon/`.

### 1.6 Hardcoded / External
- Form actions: `ajax_footer_process.php`, `ajax_contact_process.php`, `ajax_erp_process.php`, `ajax_video_process.php` (no backend in static mirror; preserve for future).
- `#root_url` hidden input (e.g. `value="index.html"`) used as base for AJAX; static site will need replacement backend or placeholder.
- Social share URLs point to live domain (e.g. weblink.in); acceptable for static copy.

---

## 2. Findings Summary

| Finding | Severity |
|---------|----------|
| Duplicate JS dirs (`scripts/` vs `js/`) and two different `custom.js` | High |
| 700+ duplicate HTML files under `blog/.../portals/portals/...` | High |
| Long relative paths in deep pages | Medium |
| Duplicate jQuery (local + CDN) on some pages | Medium |
| External CSS (erp.weblink.in fontawesome) | Medium |
| Duplicate vendor JS (bootstrap, popper in both scripts/ and js/) | Medium |
| Non-semantic wrappers, duplicate ID in nav | Low |
| Unused or legacy CSS (style.css, styled4a9.css, etc.) | Low |

---

## 3. Recommended Structure (Post-Refactor)

```
/root
  /assets
    /css        (vendor + main.css; page-specific optional)
    /js         (vendor + custom merged; optional modules)
    /images
    /fonts
    /icons
  /partials     (header, footer fragments for reference/future SSG)
  /pages        (optional; or keep services/, blog/, etc. at root for same URLs)
  index.html
```

**Path convention**: Root HTML → `assets/...`. One level down (e.g. `services/`) → `../assets/...`. Two levels (e.g. `blog/`) → `../../assets/...`.

---

## 4. Next Steps (Refactor)

1. Remove or archive HTTrack junk (`blog/portals/portals/...`, `blog/category/portals/...`, `blog/images/portals/portals/...`).
2. Create `assets/` and consolidate CSS/JS/images/fonts; merge both `custom.js` into one.
3. Move Font Awesome (or fontawesome-6) into `assets/css` / `assets/fonts` to avoid external dependency.
4. Centralize global styles in `main.css`; keep vendor files separate.
5. Extract inline banner script to `assets/js/banner.js`; load with defer.
6. Update all HTML to use relative paths to `assets/` and fix duplicate jQuery/CSS references.
7. Add partials (header/footer) as fragments; keep full HTML in each page until SSG/backend.
8. Optional: minified copies of main.css/custom.js; keep originals for readability.
