import type { MetadataRoute } from "next";

import { siteIdentity } from "@/data/site-identity";
import { getAllBlogs } from "@/lib/content/blogs";
import { getAllNotes } from "@/lib/content/notes";

export const dynamic = "force-static";

function absoluteUrl(path: string): string {
  return new URL(path, siteIdentity.siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const notes = getAllNotes();
  const blogs = getAllBlogs();

  return [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/notes"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blogs"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...notes.map((note) => ({
      url: absoluteUrl(`/notes/${note.slug}`),
      lastModified: `${note.updatedAt ?? note.publishedAt}T00:00:00.000Z`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogs.map((blog) => ({
      url: absoluteUrl(`/blogs/${blog.slug}`),
      lastModified: `${blog.updatedAt ?? blog.publishedAt}T00:00:00.000Z`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
