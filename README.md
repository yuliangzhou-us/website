# Personal Academic Website

Academic personal website built with Next.js (App Router), TypeScript, and Tailwind CSS, exported as a static site and deployed to GitHub Pages from `main`.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Editing content

Most text lives in plain-text files, no code changes needed:

- `content/editable/` — biography, research interests, news, publications, students blurb (see `content/editable/README.txt`)
- `content/research-projects/` — one numbered folder per project (see `content/research-projects/README.txt`)
- `lib/site-data.ts` — contact details, profile links, education, courses, teaching photos

## Features

- Light / dark / system color theme (remembered per visitor, applied before first paint)
- Site-wide search: press `/` or `Ctrl+K` / `⌘K`
- News timeline with category filters and an expandable archive
- Publication search, year filter, copy-citation, and "find paper" links
- Image lightbox with keyboard navigation for news, teaching, and project figures
- Active-section highlighting in the header, scroll progress bar, back-to-top button

Colors are defined once as CSS variables in `app/globals.css` (light and dark) and exposed to Tailwind as `bg`, `surface`, `ink`, `muted`, `brand`, `accent`, etc. in `tailwind.config.ts`.
