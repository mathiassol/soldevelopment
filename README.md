# SolDevelopment — personal site

A small Next.js site that serves three purposes:

1. **Portfolio** — `/` — hero, skills, current status.
2. **Projects** — `/projects` and `/projects/[slug]` — driven by `content/projects.json`.
3. **Blog** — `/blog` and `/blog/[slug]` — driven by markdown files in `content/blog/`.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · react-markdown.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Adding a project

Edit `content/projects.json`. Each entry has a `mode`:

### `github` mode — pulls the README straight from GitHub (revalidates hourly)

```json
{
  "slug": "solengine",
  "mode": "github",
  "repo": "mathiassol/solengine",
  "branch": "main",
  "title": "SolEngine",
  "summary": "C++20 game engine.",
  "tags": ["C++20", "Vulkan"],
  "year": 2025,
  "featured": true
}
```

### `custom` mode — renders a local markdown file from `content/projects/`

```json
{
  "slug": "this-site",
  "mode": "custom",
  "content": "this-site.md",
  "title": "soldevelopment.dev",
  "summary": "The site you're reading.",
  "tags": ["Next.js"],
  "year": 2026
}
```

Then create `content/projects/this-site.md`.

Optional fields on both modes: `featured` (boolean, shown on home), `links` (array of `{label, href}`).

## Adding a blog post

Drop a `.md` file into `content/blog/`. Required frontmatter:

```yaml
---
title: "Post title"
date: "2026-05-28"
summary: "Optional one-liner shown on the index."
tags: ["dev-log"]
draft: false
---
```

Drafts are visible in `dev` mode and hidden in production.

## GitHub API rate limit

Unauthenticated requests are limited to 60/hour per IP. For local dev that's
fine. In production, set `GITHUB_TOKEN` in `.env.local` (a read-only PAT works)
to bump the limit to 5000/hour.

```
GITHUB_TOKEN=ghp_...
```

## Design notes

- Neutral warm-stone palette with one restrained accent (indigo light / sky dark).
- Single content column (~720px) for reading, wider grid (~1024px) for indexes.
- Subtle 1px borders instead of shadows.
- Dark mode follows `prefers-color-scheme`.
- Inter for body, JetBrains Mono for code and small uppercase labels.
