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
  year: "numeric",
});

export function ArticleArchive({
  articles,
  basePath,
  description,
  emptyState,
  eyebrow,
  title,
}: ArticleArchiveProps) {
  return (
    <main className="page-shell">
      <header>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-title">{title}</h1>
        <p className="page-description">{description}</p>
      </header>

      {articles.length > 0 ? (
        <ol className="content-list">
          {articles.map((article) => (
            <li className="archive-card" key={article.slug}>
              <div className="archive-meta">
                <time dateTime={article.publishedAt}>
                  {dateFormatter.format(new Date(`${article.publishedAt}T00:00:00Z`))}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTimeMinutes} min read</span>
              </div>
              <h2>
                <Link href={`${basePath}/${article.slug}`}>{article.title}</Link>
              </h2>
              <p>{article.description}</p>
              <ul aria-label="Tags" className="content-tags">
                {article.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
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
