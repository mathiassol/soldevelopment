import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getAllProjects().filter((p) => p.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-wide px-6">
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-5">
          Developer · Norway
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.1] max-w-2xl">
          Mathias Solheim.
        </h1>
        <p className="mt-5 max-w-xl text-xl text-muted leading-relaxed">
          I write systems from scratch —{" "}
          <Link href="/projects/solengine" className="text-fg underline underline-offset-4 decoration-border hover:decoration-fg transition-colors">
            currently a Vulkan game engine
          </Link>
          .
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md bg-fg text-bg px-4 py-2 text-sm font-medium hover:opacity-90 transition"
          >
            See projects →
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface transition"
          >
            Read the blog
          </Link>
        </div>
      </section>

      {/* Status / Now */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-t border-border">
        <StatusCard label="School" value="Kuben VGS · VG2 IT" />
        <StatusCard label="Building" value="SolEngine · Vulkan renderer" />
        <StatusCard label="Location" value="Norway" />
      </section>

      {/* Skills */}
      <section className="py-14 border-t border-border">
        <SectionHeading kicker="Stack" title="Tools I reach for" />
        <SkillGrid />
      </section>

      {/* Featured projects */}
      <section className="py-14 border-t border-border">
        <div className="flex items-end justify-between mb-8">
          <SectionHeading kicker="Selected work" title="Featured projects" inline />
          <Link href="/projects" className="text-sm text-muted hover:text-fg">
            All projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group block rounded-lg border border-border bg-surface p-5 hover:border-fg/30 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium tracking-tight">{p.title}</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {p.mode}
                </span>
              </div>
              <p className="text-sm text-muted leading-relaxed line-clamp-3">{p.summary}</p>
              {p.tags && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-border text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 border-t border-border">
        <SectionHeading kicker="Contact" title="Get in touch" />
        <ul className="space-y-2 text-base">
          <li>
            <span className="text-muted w-20 inline-block">GitHub</span>
            <a href="https://github.com/mathiassol" className="text-accent hover:underline">
              github.com/mathiassol
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

function SectionHeading({ kicker, title, inline = false }: { kicker: string; title: string; inline?: boolean }) {
  return (
    <div className={inline ? "" : "mb-8"}>
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">{kicker}</p>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function StatusCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

const SKILL_GROUPS: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["C++", "C", "Rust", "C#", ".NET", "Python", "JavaScript", "Go"] },
  { title: "Graphics & engines", items: ["Vulkan", "bgfx", "OpenGL", "GLSL", "Godot", "Unreal"] },
  { title: "Systems & tooling", items: ["CMake", "Linux", "Arch", "Docker", "Git", "Bash"] },
  { title: "Web", items: ["Node.js", "Vue", "Next.js", "MySQL"] }
];

function SkillGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {SKILL_GROUPS.map((g) => (
        <div key={g.title} className="rounded-lg border border-border bg-surface p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            {g.title}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map((i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded border border-border bg-bg"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
