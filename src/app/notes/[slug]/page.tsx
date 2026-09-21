import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleView } from "@/components/article-view";
import { getAllNotes, getNoteBySlug } from "@/lib/content/notes";
import { createPageMetadata } from "@/lib/site-metadata";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return {};
  }

  return createPageMetadata({
    title: note.title,
    description: note.description,
    path: `/notes/${note.slug}`,
    type: "article",
    publishedTime: `${note.publishedAt}T00:00:00.000Z`,
    modifiedTime: note.updatedAt ? `${note.updatedAt}T00:00:00.000Z` : undefined,
    tags: note.tags,
  });
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <ArticleView archiveHref="/notes" archiveLabel="notes" article={note} />
  );
}
