import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string; // ISO
  summary?: string;
  tags?: string[];
  draft?: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readAll(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx?$/, "");
    return {
      slug,
      title: (data.title as string) ?? slug,
      date: (data.date as string) ?? new Date().toISOString(),
      summary: data.summary as string | undefined,
      tags: (data.tags as string[]) ?? [],
      draft: (data.draft as boolean) ?? false,
      content
    };
  });
  return posts
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAllPosts(): BlogPostMeta[] {
  return readAll().map(({ content, ...meta }) => meta);
}

export function getPost(slug: string): BlogPost | undefined {
  return readAll().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return iso;
  }
}
