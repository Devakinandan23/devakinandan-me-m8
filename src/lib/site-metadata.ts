import type { Metadata } from "next";

import { siteIdentity } from "@/data/site-identity";

type PageMetadataOptions = {
  absoluteTitle?: boolean;
  description: string;
  modifiedTime?: string;
  path: string;
  publishedTime?: string;
  tags?: string[];
  title: string;
  type?: "article" | "website";
};

function absoluteUrl(path: string): string {
  return new URL(path, siteIdentity.siteUrl).toString();
}

export function createPageMetadata({
  absoluteTitle = false,
  description,
  modifiedTime,
  path,
  publishedTime,
  tags,
  title,
  type = "website",
}: PageMetadataOptions): Metadata {
  const shared = {
    description,
    title,
    url: absoluteUrl(path),
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: {
        "application/rss+xml": "/rss.xml",
      },
    },
    openGraph:
      type === "article"
        ? {
            ...shared,
            type: "article",
            publishedTime,
            modifiedTime,
            tags,
          }
        : {
            ...shared,
            type: "website",
          },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
