import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/article-view";
import { getAllBlogs, getBlogBySlug } from "@/lib/content/blogs";
import { createPageMetadata } from "@/lib/site-metadata";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogs().map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {};
  }

  return createPageMetadata({
    title: blog.title,
    description: blog.description,
    path: `/blogs/${blog.slug}`,
    type: "article",
    publishedTime: `${blog.publishedAt}T00:00:00.000Z`,
    modifiedTime: blog.updatedAt ? `${blog.updatedAt}T00:00:00.000Z` : undefined,
    tags: blog.tags,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <ArticleView archiveHref="/blogs" archiveLabel="blogs" article={blog} />
  );
}
