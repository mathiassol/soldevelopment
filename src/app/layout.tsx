import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Mathias Solheim",
    template: "%s — Mathias Solheim"
  },
  description: "Developer writing systems from scratch. Portfolio, projects, and dev logs.",
  metadataBase: new URL("https://mathiassol.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mathiassol.dev",
    siteName: "Mathias Solheim",
    title: "Mathias Solheim",
    description: "Developer writing systems from scratch. Portfolio, projects, and dev logs."
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathias Solheim",
    description: "Developer writing systems from scratch."
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-wide px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          SolDevelopment
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          <Link href="/" className="hover:text-fg transition-colors">About</Link>
          <Link href="/projects" className="hover:text-fg transition-colors">Projects</Link>
          <Link href="/blog" className="hover:text-fg transition-colors">Blog</Link>
          <a
            href="https://github.com/mathiassol"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-wide px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-muted">
        <p>© {new Date().getFullYear()} Mathias Solheim</p>
        <p className="font-mono text-xs">soldevelopment</p>
      </div>
    </footer>
  );
}
