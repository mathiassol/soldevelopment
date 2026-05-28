import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllProjects,
  getProject,
  fetchGithubReadme,
  readCustomProjectMarkdown
} from "@/lib/projects";
import Markdown from "@/components/Markdown";

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  let markdown = "";
  let repoMeta: Awaited<ReturnType<typeof fetchGithubReadme>>["repoMeta"];

  if (project.mode === "github") {
    try {
      const res = await fetchGithubReadme(project.repo, project.branch);
      markdown = res.markdown;
      repoMeta = res.repoMeta;
    } catch (e) {
      markdown = `> Failed to load README from GitHub.\n\n\`${String(e)}\``;
    }
  } else {
    markdown = readCustomProjectMarkdown(project.content);
  }

  return (
    <article className="mx-auto max-w-content px-6 py-16">
      <Link href="/projects" className="text-sm text-muted hover:text-fg">
        ← All projects
      </Link>

      <header className="mt-6 mb-10 pb-8 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-border rounded px-1.5 py-0.5">
            {project.mode}
          </span>
          {project.year && (
            <span className="font-mono text-xs text-muted">{project.year}</span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-muted leading-relaxed text-lg">{project.summary}</p>

        {project.tags && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {project.mode === "github" && (
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border px-3 py-1.5 hover:bg-surface transition"
            >
              View on GitHub ↗
            </a>
          )}
          {project.links?.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-border px-3 py-1.5 hover:bg-surface transition"
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        {repoMeta && (
          <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <Meta label="Stars" value={String(repoMeta.stargazers_count)} />
            <Meta label="Forks" value={String(repoMeta.forks_count)} />
            <Meta label="Language" value={repoMeta.language ?? "—"} />
            <Meta
              label="Updated"
              value={new Date(repoMeta.updated_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            />
          </dl>
        )}
      </header>

      <Markdown>{markdown}</Markdown>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
