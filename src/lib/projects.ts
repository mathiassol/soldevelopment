import fs from "node:fs";
import path from "node:path";

export type ProjectMode = "github" | "custom";

export interface ProjectBase {
  slug: string;
  title: string;
  summary: string;
  tags?: string[];
  year?: number;
  featured?: boolean;
  links?: { label: string; href: string }[];
}

export interface GithubProject extends ProjectBase {
  mode: "github";
  repo: string; // "owner/repo"
  branch?: string;
}

export interface CustomProject extends ProjectBase {
  mode: "custom";
  content: string; // filename in content/projects relative to root (e.g. "my-thing.md")
}

export type Project = GithubProject | CustomProject;

interface ProjectsFile {
  projects: Project[];
}

const PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");

let cached: Project[] | null = null;

export function getAllProjects(): Project[] {
  if (cached) return cached;
  const raw = fs.readFileSync(PROJECTS_FILE, "utf8");
  const data = JSON.parse(raw) as ProjectsFile;
  cached = data.projects;
  return cached;
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

interface GithubReadmeResult {
  markdown: string;
  repoMeta?: {
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    html_url: string;
    homepage: string | null;
    updated_at: string;
  };
}

export async function fetchGithubReadme(
  repo: string,
  branch?: string
): Promise<GithubReadmeResult> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3.raw",
    "User-Agent": "soldevelopment-site"
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const readmeUrl = `https://api.github.com/repos/${repo}/readme${branch ? `?ref=${branch}` : ""}`;
  const metaUrl = `https://api.github.com/repos/${repo}`;

  const [readmeRes, metaRes] = await Promise.all([
    fetch(readmeUrl, { headers, next: { revalidate: 3600 } }),
    fetch(metaUrl, {
      headers: { ...headers, Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 }
    })
  ]);

  if (!readmeRes.ok) {
    throw new Error(`GitHub README fetch failed (${readmeRes.status}) for ${repo}`);
  }

  const markdown = await readmeRes.text();
  const transformed = transformGithubMarkdown(markdown, repo, branch);

  let repoMeta: GithubReadmeResult["repoMeta"];
  if (metaRes.ok) {
    const meta = await metaRes.json();
    repoMeta = {
      description: meta.description,
      stargazers_count: meta.stargazers_count,
      forks_count: meta.forks_count,
      language: meta.language,
      html_url: meta.html_url,
      homepage: meta.homepage,
      updated_at: meta.updated_at
    };
  }

  return { markdown: transformed, repoMeta };
}

// Rewrite relative URLs in README so images/links resolve against the source repo.
function transformGithubMarkdown(md: string, repo: string, branch = "main"): string {
  const rawBase = `https://raw.githubusercontent.com/${repo}/${branch}/`;
  const blobBase = `https://github.com/${repo}/blob/${branch}/`;

  // Markdown images: ![alt](path) where path is relative
  md = md.replace(/!\[([^\]]*)\]\((?!https?:\/\/|\/|#)([^)]+)\)/g, (_, alt, p) => {
    return `![${alt}](${rawBase}${p})`;
  });
  // Markdown links: [text](path)
  md = md.replace(/(^|[^!])\[([^\]]+)\]\((?!https?:\/\/|\/|#|mailto:)([^)]+)\)/g, (_, pre, text, p) => {
    return `${pre}[${text}](${blobBase}${p})`;
  });
  // HTML <img src="relative"> — only rewrite if src doesn't start with http/https/# or /
  md = md.replace(/<img([^>]*?)src=["'](?!https?:\/\/|\/|#)([^"']+)["']/g, (_, attrs, p) => {
    return `<img${attrs}src="${rawBase}${p}"`;
  });

  return md;
}

export function readCustomProjectMarkdown(filename: string): string {
  const p = path.join(process.cwd(), "content", "projects", filename);
  return fs.readFileSync(p, "utf8");
}
