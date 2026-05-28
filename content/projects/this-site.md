# soldevelopment.dev

This is the source of the site you're reading. It's a small Next.js app designed
for three purposes: a portfolio, a project directory, and a markdown blog.

## Why a custom-mode project?

Projects in this site come in two flavors:

1. **`github` mode** — The page pulls the README straight from GitHub at build /
   ISR time. Great for open-source repos: I don't have to duplicate documentation
   in two places.
2. **`custom` mode** — A plain markdown file inside `content/projects/`. Great
   for write-ups, case studies, or anything that doesn't live on GitHub.

This entry is in custom mode. You can write whatever you want here — embed
images, code blocks, tables, the works.

## Stack

- **Next.js 15** (App Router) — file-based routing, server components, ISR for
  GitHub README fetching.
- **TypeScript** — strict mode on.
- **Tailwind CSS** — utility-first with a small custom token layer.
- **react-markdown** + **remark-gfm** + **rehype-highlight** — markdown
  rendering with GitHub Flavored Markdown and syntax-highlighted code blocks.
- **gray-matter** — frontmatter parsing for blog posts.

## Adding a project

Open `content/projects.json` and append an entry. Two examples:

```json
{
  "slug": "my-cool-thing",
  "mode": "github",
  "repo": "mathiassol/my-cool-thing",
  "title": "My Cool Thing",
  "summary": "One-line pitch.",
  "tags": ["C++", "Graphics"],
  "year": 2026,
  "featured": true
}
```

```json
{
  "slug": "case-study",
  "mode": "custom",
  "content": "case-study.md",
  "title": "A Case Study",
  "summary": "What I built and why.",
  "tags": ["Writing"],
  "year": 2026
}
```

For custom-mode entries, drop the markdown file into `content/projects/`.

## Adding a blog post

Drop a `.md` file into `content/blog/`. Frontmatter:

```yaml
---
title: "Post title"
date: "2026-05-28"
summary: "One-line description shown on the index."
tags: ["dev-log"]
draft: false
---
```

That's it.
