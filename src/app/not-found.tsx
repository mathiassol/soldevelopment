import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-3 text-muted">That page doesn&apos;t exist (yet).</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm hover:bg-surface transition"
      >
        ← Back home
      </Link>
    </div>
  );
}
