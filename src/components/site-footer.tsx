import Link from "next/link";

import { siteIdentity } from "@/data/site-identity";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-frame footer-inner">
        <p>
          © {new Date().getUTCFullYear()} {siteIdentity.shortName}
        </p>
        <nav aria-label="Footer navigation" className="footer-links">
          <Link href="/notes">Notes</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/projects">Projects</Link>
          <a href="/rss.xml">RSS</a>
          <a
            href={siteIdentity.githubUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
