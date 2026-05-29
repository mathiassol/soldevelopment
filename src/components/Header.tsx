"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-wide px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          SolDevelopment
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-muted">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-fg transition-colors">
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/mathiassol"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg transition-colors"
          >
            GitHub ↗
          </a>
        </nav>

        {/* Burger — mobile only */}
        <button
          className="sm:hidden p-2 -mr-2 flex flex-col justify-center gap-[5px]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-px w-5 bg-fg origin-center transition-all duration-200 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-fg transition-opacity duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-fg origin-center transition-all duration-200 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown — animated via max-height */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-200 ${
          open ? "max-h-52 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-5 gap-4 text-sm bg-bg">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted hover:text-fg transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/mathiassol"
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-fg transition-colors"
            onClick={() => setOpen(false)}
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
