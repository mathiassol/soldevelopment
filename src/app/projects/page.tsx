import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built, am building, or want to share."
};

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-wide px-6 py-16">
      <header className="mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Work</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-3 text-muted leading-relaxed">
          A directory of things I&apos;ve built — open-source repos and standalone write-ups.
        </p>
      </header>

      <ul className="divide-y divide-border border-y border-border">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex items-start gap-6 py-6 hover:bg-surface px-2 -mx-2 rounded transition"
            >
              <div className="font-mono text-xs text-muted pt-1 w-12 shrink-0">
                {p.year ?? ""}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-medium tracking-tight text-lg">{p.title}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted border border-border rounded px-1.5 py-0.5">
                    {p.mode}
                  </span>
                </div>
                <p className="text-sm text-muted mt-1 leading-relaxed">{p.summary}</p>
                {p.tags && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-muted group-hover:text-fg transition pt-1">→</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
