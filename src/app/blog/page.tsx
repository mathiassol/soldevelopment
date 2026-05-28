import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dev logs, notes, and the occasional rant."
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-content px-6 py-16">
      <header className="mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Writing</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-3 text-muted leading-relaxed">
          Dev logs, build notes, and things I want to remember later.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet. Drop a markdown file into <code className="font-mono text-sm">content/blog/</code>.</p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex items-start gap-6 py-6 hover:bg-surface px-2 -mx-2 rounded transition"
              >
                <time className="font-mono text-xs text-muted pt-1 w-24 shrink-0">
                  {formatDate(p.date)}
                </time>
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium tracking-tight text-lg">
                    {p.title}
                    {p.draft && (
                      <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted border border-border rounded px-1.5 py-0.5 align-middle">
                        draft
                      </span>
                    )}
                  </h2>
                  {p.summary && (
                    <p className="text-sm text-muted mt-1 leading-relaxed">{p.summary}</p>
                  )}
                </div>
                <div className="text-muted group-hover:text-fg transition pt-1">→</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
