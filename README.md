# CX Technology — Eleventy (11ty) Engineering Platform

Production-grade Eleventy site rebuilt and rebranded for **CX Technology**, a technology company delivering mission-critical enterprise **Software Development**, ultra-responsive **Web Development**, applied **AI Development**, and 24/7 cloud **IT Services**.

Founded and Architected by **cx technology **.

---

## 🎨 Strict Benjamin Moore Color Palette & Readability System

The website visual design system is strictly built using the three colors from the reference specification:
- **Saybrook Sage (`#B1B6A2` / HC-114)** — Secondary card surfaces, borders, and structured badges.
- **Soft Pumpkin (`#E0A16C` / 2166-40)** — Accent buttons, CTAs, highlight pills, and active interactions.
- **Golden Straw (`#EFDDB7` / 2152-50)** — Elegant warm background surfaces, light theme canvas, and inverted text.

### Text Readability per Background:
- **On Golden Straw (`#EFDDB7`)**: Deep contrast dark text (`#1A1915`) with a contrast ratio of **12.4:1** (exceeds WCAG AAA).
- **On Saybrook Sage (`#B1B6A2`)**: Deep contrast dark text (`#151813`) with a contrast ratio of **8.6:1** (exceeds WCAG AAA).
- **On Soft Pumpkin (`#E0A16C`)**: Deep contrast espresso text (`#18120C`) with a contrast ratio of **7.4:1** (exceeds WCAG AAA).
- **On Dark Overlays & Containers**: Inverted Golden Straw (`#EFDDB7`) with a contrast ratio of **12.8:1** (exceeds WCAG AAA).

---

## 🚀 Key Highlights & Architectural Features

- **Full 8-Page Routing with Dedicated Page Files**:
  - `/` (`src/index.njk`) — Home (Hero Showreel, 4 Core Service Pillars, Tech Stack, Case Studies)
  - `/showcase` (`src/showcase.njk`) — Client Projects & Engineering Case Studies
  - `/collection` (`src/collection.njk`) — Architectural Blueprints & Code Snippets Collection
  - `/plans` (`src/plans.njk`) — Service Engagement Tiers & Enterprise SLAs
  - `/product/vault` (`src/product/vault.njk`) — The CX Vault (250+ production modules & source code)
  - `/product/page-transition-course` (`src/product/page-transition-course.njk`) — Page Transition Masterclass
  - `/product/button-pack` (`src/product/button-pack.njk`) — CX Interactive UI Controls (100+ buttons)
  - `/product/community` (`src/product/community.njk`) — CX Builder Community (4,500+ engineers)
- **100% Brand Transformation**:
  - Complete elimination of all previous branding ("cx", previous founders, external CDNs).
  - Rebranded for **CX Technology** with founder and chief architect credit to **cx technology **.
  - Custom SVG vector logos: Wordmark (`cx-wordmark.svg`), Monogram Icon (`cx-icon.svg`), and Large Footer Brandmark (`cx-footer-logo.svg`).
- **100% Offline & Local Media Delivery**:
  - Localized videos in `src/assets/videos/`: `cx-reel.mp4`, `course-trailer.mp4`, `software-architecture.mp4`, `ai-development.mp4`, `web-transitions.mp4`, `button-preview.mp4`, `it-services.mp4`, `cloud-infrastructure.mp4`.
  - Localized images in `src/assets/images/`: showcase project previews, resource cards, team avatars, and vector graphics.
  - Local typography: Haffer VF, Haffer XH, Haffer Mono, and Brisa Pro.
  - Local vendor scripts: jQuery, Barba.js, GSAP 3 (Draggable, InertiaPlugin, ScrollTrigger, SplitText, CustomEase, Observer), Lenis smooth scroll.
- **Dynamic Interaction Engine**:
  - Preserved Lenis smooth scrolling, Barba.js fluid page transitions, rotating magnetic button effects, custom reactive drag cursor, 3D sphere carousel, and modal dialogs.
- **Centralized Shared Data Management (`src/_data/`)**:
  - `site.json` — Company metadata, founder info, brand colors, and contact info.
  - `services.json` — The 4 core service pillars: Software Development, Web Development, AI Development, IT Services.
  - `showcase.json` — Production client case studies with local images and tech tags.
  - `collection.json` — Reusable components, architectural blueprints, and preview videos.
  - `plans.json` — Pricing tiers, feature matrices, comparison tables, and FAQs.
  - `products.json` — Product descriptions, syllabus, modules, and statistics.
  - `navigation.json` — Header, drawer, and footer navigation links.

---

## 🛠️ Project Structure

```text
cx-technology/
├── eleventy.config.js       # Eleventy configuration & passthrough rules
├── package.json             # NPM dependencies & scripts
├── verify_all.js            # Comprehensive audit suite (1,300+ local media checks)
├── test_http.js             # HTTP 200 server verification script
├── audit_site.js            # Automated route & branding verification
├── src/
│   ├── _data/               # Centralized data files
│   │   ├── site.json        # Company metadata & color palette
│   │   ├── services.json    # Software, Web, AI & IT services
│   │   ├── showcase.json    # Client case studies
│   │   ├── collection.json  # Reusable blueprints & components
│   │   ├── plans.json       # Engagement tiers & FAQs
│   │   ├── products.json    # Product descriptions & syllabus
│   │   └── navigation.json  # Header and footer navigation links
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk     # Master template with transition containers
│   │   └── components/
│   │       ├── head.njk     # Meta, favicon, and stylesheet links
│   │       ├── nav.njk      # Global interactive menu drawer & top bar
│   │       ├── footer.njk   # Footer with "Created by cx technology "
│   │       ├── cursor.njk   # Interactive custom drag cursor
│   │       ├── sitemap.njk  # Search/filter data registry
│   │       └── scripts.njk  # Localized script loaders
│   ├── assets/
│   │   ├── css/             # Modular CSS (variables, marketing, components, shared)
│   │   ├── js/              # Localized scripts & vendor libraries
│   │   ├── fonts/           # Local typography files
│   │   ├── videos/          # Localized MP4 video reels & previews
│   │   └── images/          # Localized showcase, resource, avatar & SVG assets
│   ├── index.njk            # Home page (/)
│   ├── showcase.njk         # Showcase (/showcase)
│   ├── collection.njk       # Collection (/collection)
│   ├── plans.njk            # Plans (/plans)
│   └── product/
│       ├── vault.njk        # The Vault (/product/vault)
│       ├── page-transition-course.njk # Course (/product/page-transition-course)
│       ├── button-pack.njk  # Button Pack (/product/button-pack)
│       └── community.njk    # Community (/product/community)
└── _site/                   # Generated static production output
```

---

## 💻 Installation & Usage

### 1. Requirements
- Node.js (v18 or newer; verified on Node v22)
- npm (v9 or newer; verified on npm v10)

### 2. Install Dependencies
```bash
cd cx-technology
npm install
```

### 3. Build for Production
```bash
npm run build
```
This compiles the entire site into `./_site/`.

### 4. Run Development Server
```bash
npm run dev
# or
npm start
```
Starts Eleventy's local dev server with hot reloading, typically at `http://localhost:8080/`.

### 5. Run Verification & Testing Suites
```bash
# Comprehensive local media and branding audit (checks 1,300+ local media references)
node verify_all.js

# Live HTTP 200 server response test for all routes, videos, images, and styles
node test_http.js

# Route output and founder credit audit
node audit_site.js
```
