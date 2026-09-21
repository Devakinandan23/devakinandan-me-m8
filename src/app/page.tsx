import type { Metadata } from "next";
import Link from "next/link";

import { projects } from "@/data/projects";
import { siteIdentity } from "@/data/site-identity";
import { getAllBlogs } from "@/lib/content/blogs";
import { buildHomepageData } from "@/lib/homepage";
import { getAllNotes } from "@/lib/content/notes";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  absoluteTitle: true,
  title: "Devakinandan — Backend & Applied AI Engineer",
  description:
    "Devakinandan builds reliable retrieval systems and developer products, and writes about backend engineering and applied AI.",
  path: "/",
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export default function HomePage() {
  const homepage = buildHomepageData({
    blogs: getAllBlogs(),
    notes: getAllNotes(),
    projects,
  });

  const exploreItems = [
    {
      count: homepage.counts.projects,
      description: "Shipped systems with the problem, ownership, stack, and evidence kept together.",
      href: "/projects",
      label: "Projects",
    },
    {
      count: homepage.counts.notes,
      description: "Compact explanations of resolved questions, mental models, and practical gotchas.",
      href: "/notes",
      label: "Notes",
    },
    {
      count: homepage.counts.blogs,
      description: "Longer arguments about engineering trade-offs and lessons from building.",
      href: "/blogs",
      label: "Blogs",
    },
  ];

  return (
    <main className="home-shell">
      <section className="home-intro" aria-labelledby="home-title">
        <div className="home-intro-copy">
          <h1 id="home-title">{siteIdentity.fullName}</h1>
          <p className="home-focus">{siteIdentity.focus}</p>

          <div className="home-biography">
            {siteIdentity.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <a
            className="home-social-link"
            href={siteIdentity.githubUrl}
            rel="noreferrer noopener"
            target="_blank"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="home-section" aria-labelledby="explore-title">
        <div className="home-section-heading">
          <div>
            <h2 id="explore-title">Explore work &amp; writing</h2>
            <p className="section-description">Projects, practical notes, and longer engineering essays.</p>
          </div>
        </div>

        <div className="explore-grid">
          {exploreItems.map((item) => (
            <Link className="explore-card" href={item.href} key={item.href}>
              <div className="explore-card-heading">
                <h3>{item.label}</h3>
                <span aria-label={`${item.count} published ${item.label.toLowerCase()}`}>
                  {String(item.count).padStart(2, "0")}
                </span>
              </div>
              <p>{item.description}</p>
              <span className="explore-card-action" aria-hidden="true">
                Open archive →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section" aria-labelledby="recent-title">
        <div className="home-section-heading">
          <div>
            <h2 id="recent-title">Recent writing</h2>
          </div>
        </div>

        <div className="recent-columns">
          <section aria-labelledby="recent-notes-title">
            <div className="recent-column-heading">
              <h3 id="recent-notes-title">Recent notes</h3>
              <Link href="/notes">View all</Link>
            </div>
            <ol className="recent-list">
              {homepage.recentNotes.map((note) => (
                <li key={note.slug}>
                  <time dateTime={note.publishedAt}>{formatDate(note.publishedAt)}</time>
                  <Link href={`/notes/${note.slug}`}>{note.title}</Link>
                  <ul className="content-tags" aria-label="Tags">
                    {note.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {homepage.recentBlogs.length > 0 ? (
            <section aria-labelledby="recent-blogs-title">
              <div className="recent-column-heading">
                <h3 id="recent-blogs-title">Recent blog posts</h3>
                <Link href="/blogs">View all</Link>
              </div>
              <ol className="recent-list">
                {homepage.recentBlogs.map((blog) => (
                  <li key={blog.slug}>
                    <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    <ul className="content-tags" aria-label="Tags">
                      {blog.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      </section>

      <section className="home-section" aria-labelledby="featured-projects-title">
        <div className="home-section-heading home-section-heading-with-link">
          <div>
            <h2 id="featured-projects-title">Featured projects</h2>
          </div>
          <Link href="/projects">View all projects</Link>
        </div>

        <ol className="featured-projects-list">
          {homepage.featuredProjects.map((project, index) => {
            const evidenceUrl = project.demoUrl ?? project.sourceUrl;

            return (
              <li key={project.slug}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                {evidenceUrl ? (
                  <a href={evidenceUrl} rel="noreferrer noopener" target="_blank">
                    Evidence <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
