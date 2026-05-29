"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
      <line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/>
      <line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const cl = document.documentElement.classList;
    setTheme(cl.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(next);
    try { localStorage.setItem("theme", next); } catch (_) {}
    setTheme(next);
  };

  // Render a stable placeholder until mounted to avoid hydration mismatch
  return (
    <button
      onClick={toggle}
      className="text-muted hover:text-fg transition-colors p-1 w-6 h-6 flex items-center justify-center"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

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
          <ThemeToggle />
        </nav>

        {/* Mobile: theme toggle + burger */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 -mr-2 flex flex-col justify-center gap-[5px]"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            <span className={`block h-px w-5 bg-fg origin-center transition-all duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-fg transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-fg origin-center transition-all duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`sm:hidden overflow-hidden transition-all duration-200 ${open ? "max-h-52 border-t border-border" : "max-h-0"}`}>
        <nav className="flex flex-col px-6 py-5 gap-4 text-sm bg-bg">
          {NAV.map(({ href, label }) => (
            <Link key={href} href={href} className="text-muted hover:text-fg transition-colors" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a href="https://github.com/mathiassol" target="_blank" rel="noreferrer" className="text-muted hover:text-fg transition-colors" onClick={() => setOpen(false)}>
            GitHub ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
