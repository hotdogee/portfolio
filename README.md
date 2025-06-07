# Han's Portfolio [Live](https://hanl.in/)

A modern, multilingual portfolio website built with [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). Features smooth transitions with the [View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions), full site search with [PageFind](https://pagefind.app/), content management for articles and projects, and certification showcase.

![portfolio-home-dark-to-light-en-canva](https://github.com/user-attachments/assets/b486d43a-54b9-4d00-953b-4de1408aae98)
![portfolio-cert-filter-en mp4](https://github.com/user-attachments/assets/d976b806-57b8-4278-9606-79efba8bfeac)
![portfolio-nav-lightbox-short-en](https://github.com/user-attachments/assets/9db9d456-4b12-4217-9f3c-82d531c27d73)

## ✨ Features

- **Internationalization (i18n):** Supports English (`en`) and Taiwanese Mandarin (`tw`) locales, managed via [`src/lib/i18n.ts`](h:\Projects\Career\portfolio\src\lib\i18n.ts) and Astro's i18n routing.
- **Content Collections:** Manages articles, projects, certifications, and organizations using Astro's content collections (see [`src/content.config.ts`](h:\Projects\Career\portfolio\src\content.config.ts)).
  - Articles and Projects are written in Markdown.
  - Certifications and Organizations data is loaded from JSON files.
- **Pagefind Integration:** Provides client-side search functionality (see [`astro.config.ts`](h:\Projects\Career\portfolio\astro.config.ts)).
- **Sitemap Generation:** Automatically generates a sitemap (see [`astro.config.ts`](h:\Projects\Career\portfolio\astro.config.ts)).
- **RSS Feed:** Generates an RSS feed for articles.
- **Partytown Integration:** Offloads third-party scripts to a web worker for improved performance.
- **Image Optimization:** Uses Astro's built-in image optimization.
- **Dark Mode:** Supports light and dark themes with system preference detection.
- **View Transitions:** Utilizes the View Transitions API for smooth page navigation with optimized performance architecture.
  - Employs Astro's `<ClientRouter />` and dynamically assigned `view-transition-name`s to optimize performance and prevent conflicts across various UI transitions, including theme switching, lightbox popovers, navigation menus, page-to-page navigation, and list-to-list/detail views.
- **SEO Friendly:** Includes meta tags, Open Graph tags, and structured data for better search engine visibility.
- **Custom Fonts:** Uses Google Fonts (Inter) via Astro's font configuration.
- **Markdown Enhancements:**
  - `rehype-image-caption`: Adds captions to images in Markdown.
  - `rehype-lightbox`: Adds a lightbox effect to images (see [`src/lib/rehype-lightbox.ts`](h:\Projects\Career\portfolio\src\lib\rehype-lightbox.ts)).
- **Utility Scripts:**
  - `extract-cert-data.js`: Extracts unique names, organizations, or skills from `certifications.json` (see [`util/extract-cert-data.js`](h:\Projects\Career\portfolio\util\extract-cert-data.js)).
  - `slugify-cli.js`: A CLI tool to slugify strings (see [`util/slugify-cli.js`](h:\Projects\Career\portfolio\util\slugify-cli.js)).

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Frontend Library**: [React](https://reactjs.org/)
- **Component Library**: [Shadcn](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Icons:** [Lucide React](https://lucide.dev/), [Astro Icon](https://github.com/natemoo-re/astro-icon)
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) resolver
- **Search:** [Pagefind](https://pagefind.app/)
- **Content**: Markdown processing with rehype plugins
- **Internationalization**: Astro i18n

## 📁 Project Structure

```
portfolio/
├── public/                   # Static assets
├── src/
│   ├── assets/               # Images, icons, etc.
│   ├── components/           # Reusable Astro/React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── ArticleCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── CertificationCard.astro
│   │   └── ...
│   ├── layouts/              # Base layout for pages
│   ├── pages/                # Route pages
│   │   └── [...locale]/      # Internationalized routes
│   ├── lib/                  # Utilities and configurations
│   │   ├── i18n/             # Internationalization data
│   │   ├── i18n.ts           # i18n utilities
│   │   ├── nav.ts            # Navigation configuration
│   │   └── utils.ts          # Helper functions
│   ├── styles/               # Global CSS
│   ├── content.config.ts     # Content collections schema
│   ├── articles/             # Blog articles and assets (Markdown)
│   ├── projects/             # Project descriptions and assets (Markdown)
│   ├── certifications/       # Certification data and assets (JSON)
│   └── organizations/        # Brand data and assets (JSON)
├── util/                     # Utility scripts
├── astro.config.ts           # Astro configuration
├── content.config.ts         # Astro content collections configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── wrangler.toml             # Cloudflare Pages configuration
```

## 🎯 Content Collections

The project uses Astro's content collections for structured content management:

- **Articles**: Blog posts with frontmatter, tags, categories, and change logs
- **Projects**: Portfolio projects with tech stacks, links, and sidebar cards
- **Certifications**: Professional certifications with badges and verification links
- **Organizations**: Brands/organization information with icons and logos

## 🌐 Internationalization (i18n)

Supports English (`en`) and Taiwanese Mandarin (`tw`) with:

- Locale configuration is in [`src/lib/i18n.ts`](h:\Projects\Career\portfolio\src\lib\i18n.ts).
- Astro's i18n routing is used, with language prefixes in URLs (e.g., `/en/about`, `/tw/about`). The default locale (`en`) does not require a prefix.
  - `/en/*` and `/*` default routes are served in English
  - `/tw/*` routes are served in Taiwanese Mandarin
- Translations for UI elements are stored in [`src/lib/i18n/ui.ts`](h:\Projects\Career\portfolio\src\lib\i18n\ui.ts) (and similar files for categories, tags, skills).
- Localized content for Articles and Projects are stored in `en/` and `tw/` folders
  - The same article in different languages should have the same markdown filename
  - URL slugs are generated from the markdown filenames
- Date formatting and stop word filtering

## 🎭 View Transitions Architecture

The portfolio implements a sophisticated view transitions system using Astro's `astro:transitions` with `<ClientRouter />` and dynamic `view-transition-name` assignment for optimal performance and seamless user experience:

### Performance-Optimized Implementation

- **Dynamic Transition Names:** Uses programmatically assigned `view-transition-name` attributes to avoid interference between different transition types
- **Fallback Support:** Respects `reduced-motion` OS settings and graceful fallback for browsers that don't support view transitions API.

### Transition Categories

- **Theme Switching:** Smooth light/dark mode transitions without visual disruption
- **Lightbox Popovers:** Image gallery interactions with fluid open/close animations
- **Navigation Menu:** Menu state changes with contextual transitions
- **Page-to-Page Navigation:** Cross-route MPA transitions maintaining visual continuity
- **List-to-List Views:** Seamless filtering transitions (e.g., certification filters, project categories)
- **List-to-Detail Views:** Smooth navigation from overview pages to detailed content with shared element morphing

## 🏁 Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hotdogee/portfolio
cd portfolio
```

2. Install dependencies:

```bash
npm i
```

3. Build the search index:

```bash
npm run build
```

4. Start the development server:

```bash
npm run dev
```

1. Open http://localhost:4321 in your browser

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run preview`: Previews the production build locally.
- `npm run astro`: Accesses the Astro CLI.
- `npm run extract-certs <field> [options]`: Extracts unique data from `certifications.json`.
  - Fields: `name`, `organization`, `skills`
  - Options: `--count` (or `-c`), `--json` (or `-j`)
  - Example: `npm run extract-certs skills -- --json`
- `npm run slugify "<text>" [options]`: Slugifies the given text.
  - Options: `--keep-stop-words` (or `-k`)
  - Example: `npm run slugify "My Awesome Project" -- --keep-stop-words`

## 📝 Content Management

Schema defined in [`src/content.config.ts`](h:\Projects\Career\portfolio\src\content.config.ts).

**Articles**: Create `.md` files in `src/articles/` with frontmatter:

Assets like images can be colocated in a project folder with the markdown filename the same as the project folder name.
Folders are not required if your project doesn't have any assets or if your assets are all served from a Digital Asset Management like Cloudinary.

```yaml
---
title: 'Article Title'
excerpt: 'Brief description'
author: 'Author Name'
categories: ['category1', 'category2']
tags: ['tag1', 'tag2']
changes:
  - '2025-01-01': 'Initial post'
---
```

**Projects**: Create `.md` files in `src/projects/` with frontmatter:

Assets like images can be colocated in a project folder with the markdown filename the same as the project folder name.
Folders are not required if your project doesn't have any assets or if your assets are all served from a Digital Asset Management like Cloudinary.

```yaml
---
title: 'Project Name'
tagline: 'Brief description'
tech: ['React', 'TypeScript']
featured: 1
categories: ['Web Development']
links:
  - text: 'Live Demo'
    url: 'https://example.com'
    icon: 'lucide:external-link'
changes:
  - '2025-01-01': 'Project completed'
---
```

**Certifications:** Data stored in [`src/certifications/certifications.json`](h:\Projects\Career\portfolio\src\certifications\certifications.json).

**Organizations:** Data stored in [`src/organizations/organizations.json`](h:\Projects\Career\portfolio\src\organizations\organizations.json).

## 🎨 Styling

- Tailwind CSS classes for styling
- Custom CSS variables for themes
- Component-based architecture with Astro and React

## 🚀 Deployment

The project is configured for deployment on **Cloudflare Pages**.
The [`wrangler.toml`](h:\Projects\Career\portfolio\wrangler.toml) file contains basic Cloudflare Pages configuration.
The build output directory is `./dist`.
The build command `npm run build` creates a production-ready static site.
Cloudflare Pages specific build format (`format: 'file'`) is set in [`astro.config.ts`](h:\Projects\Career\portfolio\astro.config.ts) to handle trailing slashes correctly.
A fix for React 19 on Cloudflare is also included in the Vite configuration within [`astro.config.ts`](h:\Projects\Career\portfolio\astro.config.ts).

## ⚙️ Configuration

- **Astro Configuration:** [`astro.config.ts`](h:\Projects\Career\portfolio\astro.config.ts) - Contains site settings, integrations, Markdown processing, Vite configurations, and i18n setup.
- **Content Collections:** [`src/content.config.ts`](h:\Projects\Career\portfolio\src\content.config.ts) - Defines schemas for articles, projects, certifications, and organizations.
- **TypeScript:** [`tsconfig.json`](h:\Projects\Career\portfolio\tsconfig.json) - Configures TypeScript compiler options and path aliases.
- **Environment Variables:**
  - `SHOW_DOWNLOAD_CV`: (boolean, optional, default: `false`) - Controls the visibility of the "Download CV" button. Defined in [`astro.config.ts`](h:\Projects\Career\portfolio\astro.config.ts).

## 🔧 Development Tools

- **Prettier**: Code formatting with plugin support
- **TypeScript**: Type checking and IntelliSense
- **Vite**: Fast development and building
- **ESLint**: Code linting (via Astro config)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or suggestions, please reach out through the contact form on the website.
