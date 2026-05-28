import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import Markdown from "@/components/Markdown";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <Link href="/blog" className="text-sm text-muted hover:text-fg">
        ← All posts
      </Link>

      <header className="mt-6 mb-10 pb-8 border-b border-border">
        <time className="font-mono text-xs uppercase tracking-widest text-muted">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-3 text-muted leading-relaxed text-lg">{post.summary}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </header>

      <Markdown>{post.content}</Markdown>
    </article>
  );
}
