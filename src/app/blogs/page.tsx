import type { Metadata } from "next";

import { ArticleArchive } from "@/components/article-archive";
import { getAllBlogs } from "@/lib/content/blogs";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blogs",
  description: "Long-form writing about backend engineering and applied AI systems.",
  path: "/blogs",
});

export default function BlogsPage() {
  return (
    <ArticleArchive
      articles={getAllBlogs()}
      basePath="/blogs"
      description="Long-form writing about systems, trade-offs, and lessons from building."
      emptyState={{
        description:
          "Long-form posts will appear here when they are ready. For now, browse shorter technical notes.",
        href: "/notes",
        linkLabel: "Read the notes →",
        title: "No published blogs yet.",
      }}
      eyebrow="Essays"
      title="Blogs"
    />
  );
}
