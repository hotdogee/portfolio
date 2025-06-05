# Han's Portfolio

A modern, multilingual portfolio website built with [Astro](https://astro.build/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/). Features smooth transitions with the [View Transition API](https://developer.chrome.com/docs/web-platform/view-transitions), full site search with [PageFind](https://pagefind.app/), content management for articles and projects, and certification showcase.

## 🚀 Features

- **Multilingual Support**: English and Taiwanese Mandarin localization
- **Content Management**: Articles, projects, and certifications with structured data
- **Modern Tech Stack**: Astro 5, React 19, TypeScript, Tailwind CSS
- **SEO Optimized**: Sitemap generation, RSS feeds, and meta tags
- **Search Functionality**: Integrated search with Pagefind
- **Responsive Design**: Mobile-first approach with modern UI components
- **Performance Focused**: Image optimization and lazy loading
- **Dark/Light Theme**: Theme toggle with system preference detection

## 🛠 Tech Stack

### Core Technologies

- **Framework**: [Astro](https://astro.build/)
- **Frontend Library**: [React](https://reactjs.org/)
- **Component Library**: [Shadcn](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

### Key Dependencies

- **Icons**: Lucide React, Astro Icon with Iconify
- **Forms**: React Hook Form with Zod validation
- **Content**: Markdown/MDX processing with rehype plugins
- **Search**: Astro Pagefind integration
- **Internationalization**: Astro i18n

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── ArticleCard.astro
│   ├── ProjectCard.astro
│   ├── CertificationCard.astro
│   └── ...
├── layouts/              # Page layouts
├── pages/                # Route pages
│   └── [...locale]/      # Internationalized routes
├── lib/                  # Utilities and configurations
│   ├── i18n/             # Internationalization data
│   ├── i18n.ts           # i18n utilities
│   ├── nav.ts            # Navigation configuration
│   └── utils.ts          # Helper functions
├── content.config.ts     # Content collections schema
├── articles/             # Blog articles and assets (Markdown)
├── projects/             # Project descriptions and assets (Markdown)
├── certifications/       # Certification data and assets (JSON)
└── organizations/        # Brand data and assets (JSON)
```

## 🎯 Content Collections

The project uses Astro's content collections for structured content management:

- **Articles**: Blog posts with frontmatter, tags, categories, and change logs
- **Projects**: Portfolio projects with tech stacks, links, and sidebar cards
- **Certifications**: Professional certifications with badges and verification links
- **Organizations**: Brands/organization information with icons and logos

## 🌐 Internationalization

Supports English (`en`) and Taiwanese Mandarin (`tw`) with:

- URL-based locale routing
  - `/en/*` and `/*` default routes are served in English
  - `/tw/*` routes are served in Taiwanese Mandarin
- Localized content for Articles and Projects are stored in `en/` and `tw/` folders
  - The same article in different languages should have the same markdown filename
  - URL slugs are generated from the markdown filenames
- Date formatting and stop word filtering

## 🚀 Getting Started

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

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run astro         # Run Astro CLI commands
npm run extract-certs # Print a list of certification names, brands, skills
npm run slugify       # Generate slugs from strings
```

## 🎨 Customization

### Adding Content

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

### Styling

- Tailwind CSS classes for styling
- Custom CSS variables for themes
- Component-based architecture with Astro and React

### Configuration

- `astro.config.ts`: Main Astro configuration
- `tsconfig.json`: TypeScript configuration
- `.env`: Environment variables for feature flags

## 🌍 Deployment

Optimized for deployment on:

- **Cloudflare Pages**
- Any static hosting provider

Build configuration includes:

- File-based routing for Cloudflare Pages compatibility
- Edge runtime compatibility for React 19
- Optimized image processing

## 📝 Environment Variables

```bash
SHOW_DOWNLOAD_CV=false  # Show/hide CV download button
```

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
