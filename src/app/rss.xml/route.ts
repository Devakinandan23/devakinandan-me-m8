import { buildRssXml } from "@/lib/feed";
import { getAllBlogs } from "@/lib/content/blogs";
import { getAllNotes } from "@/lib/content/notes";

export const dynamic = "force-static";

export function GET() {
  const xml = buildRssXml({
    blogs: getAllBlogs(),
    notes: getAllNotes(),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
