import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

import type { Article } from "@/lib/content/articles";

import { mdxComponents } from "./mdx-components";

type ArticleViewProps = {
  archiveHref: "/blogs" | "/notes";
  archiveLabel: string;
  article: Article;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function ArticleView({
  archiveHref,
  archiveLabel,
  article,
}: ArticleViewProps) {
  return (
    <main className="page-shell">
      <article>
        <header className="article-header">
          <Link className="eyebrow" href={archiveHref}>
            ← All {archiveLabel}
          </Link>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-meta">
            <span>
              Published{" "}
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </span>
            {article.updatedAt && article.updatedAt !== article.publishedAt ? (
              <span>
                <span aria-hidden="true">· </span>
                Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            ) : null}
            <span>
              <span aria-hidden="true">· </span>
              {article.readingTimeMinutes} min read
            </span>
          </div>
          <ul aria-label="Tags" className="content-tags article-tags">
            {article.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <div className="prose">
          <MDXRemote
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      keepBackground: true,
                      theme: "github-dark",
                    },
                  ],
                ],
              },
            }}
            source={article.body}
          />
        </div>

        <footer className="article-footer">
          <Link href={archiveHref}>← Back to all {archiveLabel}</Link>
        </footer>
      </article>
    </main>
  );
}
