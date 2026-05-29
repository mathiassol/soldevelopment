import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";

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
