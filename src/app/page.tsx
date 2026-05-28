import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const featured = getAllProjects().filter((p) => p.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-wide px-6">

      {/* Hero — more vertical room, status flows directly below */}
      <section className="pt-24 pb-4 sm:pt-36 sm:pb-6">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.08]">
          Mathias Solheim.
        </h1>
        <p className="mt-4 max-w-lg text-xl text-muted leading-relaxed">
          I write systems from scratch —{" "}
          <Link
            href="/projects/solengine"
            className="text-fg underline underline-offset-4 decoration-border hover:decoration-fg transition-colors"
          >
            currently a Vulkan game engine
          </Link>
          .
        </p>
      </section>

      {/* Status — no cards, just a compact text row */}
      <div className="pb-24 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
        <span>VG2 · Kuben VGS</span>
        <span className="text-border select-none">·</span>
        <span>Building SolEngine</span>
        <span className="text-border select-none">·</span>
        <span>Norway</span>
        <span className="text-border select-none">·</span>
        <a href="https://github.com/mathiassol" className="hover:text-fg transition-colors">
          github.com/mathiassol
        </a>
      </div>

      {/* Skills — flat labeled list, no boxes */}
      <section className="border-t border-border py-16">
        <div className="space-y-4">
          {SKILL_GROUPS.map((g) => (
            <div key={g.title} className="flex gap-6 sm:gap-10 items-baseline">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted w-24 sm:w-32 shrink-0">
                {g.title}
              </span>
              <p className="text-sm text-muted leading-relaxed">
                {g.items.join("  ·  ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects — list, not cards */}
      <section className="border-t border-border pt-16 pb-24">
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="text-lg font-semibold tracking-tight">Projects</h2>
          <Link href="/projects" className="text-sm text-muted hover:text-fg transition-colors">
            All →
          </Link>
        </div>
        <ul>
          {featured.map((p) => (
            <li key={p.slug} className="border-b border-border last:border-0">
              <Link
                href={`/projects/${p.slug}`}
                className="group flex items-start gap-6 sm:gap-10 py-6 hover:bg-surface -mx-3 px-3 rounded transition"
              >
                <span className="font-mono text-xs text-muted pt-1 w-12 shrink-0">
                  {p.year ?? ""}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium tracking-tight group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{p.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}

const SKILL_GROUPS: { title: string; items: string[] }[] = [
  { title: "Languages",  items: ["C++", "C", "Rust", "C#", ".NET", "Python", "JavaScript", "Go"] },
  { title: "Graphics",   items: ["Vulkan", "OpenGL", "GLSL", "Godot", "Unreal"] },
  { title: "Systems",    items: ["CMake", "Linux", "Arch", "Docker", "Git", "Bash"] },
  { title: "Web",        items: ["Node.js", "Vue", "Next.js", "MySQL"] }
];

