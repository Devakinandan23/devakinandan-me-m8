import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { siteIdentity } from "@/data/site-identity";
import { getAllBlogs } from "@/lib/content/blogs";
import { buildRssXml, getFeedArticles } from "@/lib/feed";
import { getAllNotes, type Note } from "@/lib/content/notes";
import { createPageMetadata } from "@/lib/site-metadata";

describe("discovery outputs", () => {
  it("publishes every article once in reverse chronological feed order", () => {
    const blogs = getAllBlogs();
    const notes = getAllNotes();
    const articles = getFeedArticles({ blogs, notes });
    const xml = buildRssXml({ blogs, notes });

    expect(xml.match(/<item>/g)).toHaveLength(blogs.length + notes.length);
    expect(articles.map((article) => article.publishedAt)).toEqual(
      [...articles.map((article) => article.publishedAt)].sort().reverse(),
    );

    for (const article of articles) {
      expect(xml).toContain(
        `${siteIdentity.siteUrl}/${article.kind}s/${article.slug}`,
      );
    }
  });

  it("escapes XML-controlled characters in feed content", () => {
    const note: Note = {
      body: "Body",
      description: 'Use A & B before <shipping> a "result".',
      draft: false,
      filePath: "/content/notes/xml-safety.mdx",
      kind: "note",
      publishedAt: "2026-09-21",
      readingTimeMinutes: 1,
      slug: "xml-safety",
      tags: ["xml"],
      title: "A < B & C",
    };

    const xml = buildRssXml({ blogs: [], notes: [note] });

    expect(xml).toContain("<title>A &lt; B &amp; C</title>");
    expect(xml).toContain(
      "<description>Use A &amp; B before &lt;shipping&gt; a &quot;result&quot;.</description>",
    );
  });

  it("lists static pages and every published article in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(`${siteIdentity.siteUrl}/`);
    expect(urls).toContain(`${siteIdentity.siteUrl}/projects`);
    expect(urls).toHaveLength(4 + getAllNotes().length + getAllBlogs().length);
  });

  it("creates canonical and social metadata from one page record", () => {
    const metadata = createPageMetadata({
      description: "A sufficiently useful page description for metadata checks.",
      path: "/notes/example",
      title: "Example note",
      type: "article",
      publishedTime: "2026-09-21T00:00:00.000Z",
      tags: ["testing"],
    });

    expect(metadata.alternates?.canonical).toBe("/notes/example");
    expect(metadata.alternates?.types).toEqual({
      "application/rss+xml": "/rss.xml",
    });
    expect(metadata.openGraph).toMatchObject({
      title: "Example note",
      type: "article",
      url: `${siteIdentity.siteUrl}/notes/example`,
    });
    expect(metadata.twitter).toMatchObject({ card: "summary", title: "Example note" });
  });
});
