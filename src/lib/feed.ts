import { siteIdentity } from "@/data/site-identity";
import type { Blog } from "@/lib/content/blogs";
import type { Note } from "@/lib/content/notes";

type FeedArticle = Blog | Note;

type BuildFeedOptions = {
  blogs: Blog[];
  notes: Note[];
};

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function articleUrl(article: FeedArticle): string {
  return `${siteIdentity.siteUrl}/${article.kind}s/${article.slug}`;
}

function toRssDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function getFeedArticles({ blogs, notes }: BuildFeedOptions): FeedArticle[] {
  return [...blogs, ...notes].sort(
    (left, right) =>
      right.publishedAt.localeCompare(left.publishedAt) ||
      left.kind.localeCompare(right.kind) ||
      left.slug.localeCompare(right.slug),
  );
}

export function buildRssXml(options: BuildFeedOptions): string {
  const articles = getFeedArticles(options);
  const lastBuildDate = articles[0]
    ? toRssDate(articles[0].publishedAt)
    : new Date(0).toUTCString();

  const items = articles
    .map((article) => {
      const url = articleUrl(article);
      const categories = article.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${toRssDate(article.publishedAt)}</pubDate>
      <description>${escapeXml(article.description)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteIdentity.shortName)} — Engineering notes and blogs</title>
    <link>${escapeXml(siteIdentity.siteUrl)}</link>
    <description>Notes and essays about backend engineering, applied AI, and reliable software systems.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(`${siteIdentity.siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
