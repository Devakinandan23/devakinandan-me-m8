"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { siteIdentity } from "@/data/site-identity";

import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  function isCurrentRoute(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-frame site-nav">
        <Link aria-label="Devakinandan home" className="site-name" href="/">
          {siteIdentity.shortName}
        </Link>

        <div className="desktop-navigation">
          <Link
            aria-current={isCurrentRoute("/notes") ? "page" : undefined}
            className="nav-link"
            href="/notes"
          >
            Notes
          </Link>
          <Link
            aria-current={isCurrentRoute("/blogs") ? "page" : undefined}
            className="nav-link"
            href="/blogs"
          >
            Blogs
          </Link>
          <Link
            aria-current={isCurrentRoute("/projects") ? "page" : undefined}
            className="nav-link"
            href="/projects"
          >
            Projects
          </Link>
          <a
            className="nav-link"
            href={siteIdentity.githubUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>

        <div className="mobile-actions">
          <ThemeToggle />
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="menu-toggle"
            onClick={() => setMenuOpen((current) => !current)}
            ref={menuButtonRef}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          aria-hidden={!menuOpen}
          className="mobile-navigation"
          data-open={menuOpen}
          id="mobile-navigation"
        >
          <Link
            aria-current={isCurrentRoute("/notes") ? "page" : undefined}
            className="mobile-nav-link"
            href="/notes"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            Notes
          </Link>
          <Link
            aria-current={isCurrentRoute("/blogs") ? "page" : undefined}
            className="mobile-nav-link"
            href="/blogs"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            Blogs
          </Link>
          <Link
            aria-current={isCurrentRoute("/projects") ? "page" : undefined}
            className="mobile-nav-link"
            href="/projects"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            Projects
          </Link>
          <a
            className="mobile-nav-link"
            href={siteIdentity.githubUrl}
            onClick={() => setMenuOpen(false)}
            rel="noreferrer noopener"
            tabIndex={menuOpen ? 0 : -1}
            target="_blank"
          >
            GitHub ↗
          </a>
        </div>
      </nav>
    </header>
  );
}
