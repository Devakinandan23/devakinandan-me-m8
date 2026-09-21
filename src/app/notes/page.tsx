import type { Metadata } from "next";

import { ArticleArchive } from "@/components/article-archive";
import { getAllNotes } from "@/lib/content/notes";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Notes",
  description: "Concise engineering lessons, mental models, and implementation notes.",
  path: "/notes",
});

export default function NotesPage() {
  return (
    <ArticleArchive
      articles={getAllNotes()}
      basePath="/notes"
      description="Things I understood while building backend and applied AI systems."
      emptyState={{
        description: "Published technical takeaways will appear here.",
        title: "No published notes yet.",
      }}
      eyebrow="Takeaways"
      title="Notes"
    />
  );
}
