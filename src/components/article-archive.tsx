import Link from "next/link";

import type { Article } from "@/lib/content/articles";

type EmptyState = {
  description: string;
  href?: string;
  linkLabel?: string;
  title: string;
};

type ArticleArchiveProps = {
  articles: Article[];
  basePath: "/blogs" | "/notes";
  description: string;
  emptyState: EmptyState;
  eyebrow: string;
  title: string;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

export function ArticleArchive({
  articles,
  basePath,
  description,
  emptyState,
  eyebrow,
  title,
}: ArticleArchiveProps) {
  const years = [...new Set(articles.map((article) => article.publishedAt.slice(0, 4)))].sort().reverse();
  return (
    <main className="page-shell">
      <header>
        <p className="eyebrow">{eyebrow}</p>
        <div className="archive-heading">
          <h1 className="page-title">{title} <span className="archive-count">({articles.length})</span></h1>
          <a className="rss-link" href="/rss.xml">RSS feed ↗</a>
        </div>
        <p className="page-description">{description}</p>
      </header>

      {articles.length > 0 ? (
        <div className="archive-years">
        {years.map((year) => (
        <section key={year} aria-labelledby={`year-${year}`}>
        <h2 className="archive-year" id={`year-${year}`}>{year}</h2>
        <ol className="content-list">
          {articles.filter((article) => article.publishedAt.startsWith(year)).map((article) => (
            <li className="archive-card" key={article.slug}>
              <div className="archive-meta">
                <time dateTime={article.publishedAt}>
                  {dateFormatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTimeMinutes} min read</span>
              </div>
              <h3>
                <Link href={`${basePath}/${article.slug}`}>{article.title}</Link>
              </h3>
              <p>{article.description}</p>
              <ul aria-label="Tags" className="content-tags">
                {article.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        </section>
        ))}
        </div>
      ) : (
        <section className="content-empty">
          <h2>{emptyState.title}</h2>
          <p>{emptyState.description}</p>
          {emptyState.href && emptyState.linkLabel ? (
            <Link href={emptyState.href}>{emptyState.linkLabel}</Link>
          ) : null}
        </section>
      )}
    </main>
  );
}
