import { describe, expect, it } from "vitest";

import { parseNoteSource } from "@/lib/content/notes";

const validFrontmatter = `---
title: "A valid note title"
description: "A sufficiently detailed description for a valid technical note."
publishedAt: "2026-09-21"
tags:
  - rag
draft: false
---

Body.
`;

describe("parseNoteSource", () => {
  it("derives the slug from a valid filename", () => {
    const note = parseNoteSource("/content/notes/vector-search.mdx", validFrontmatter);

    expect(note.slug).toBe("vector-search");
    expect(note.kind).toBe("note");
  });

  it.each([
    ["missing title", validFrontmatter.replace('title: "A valid note title"\n', "")],
    ["unknown key", validFrontmatter.replace("draft: false", "draft: false\npublishAt: nope")],
    ["impossible date", validFrontmatter.replace("2026-09-21", "2026-02-30")],
    ["uppercase tag", validFrontmatter.replace("  - rag", "  - RAG")],
    ["duplicate tag", validFrontmatter.replace("  - rag", "  - rag\n  - rag")],
  ])("reports the file for %s", (_, source) => {
    expect(() => parseNoteSource("/content/notes/broken-note.mdx", source)).toThrow(
      /Invalid note '.*broken-note\.mdx'/,
    );
  });

  it("rejects invalid filenames", () => {
    expect(() => parseNoteSource("/content/notes/Bad  Note.mdx", validFrontmatter)).toThrow(
      /Bad  Note\.mdx.*lowercase letters, numbers, and single hyphens/,
    );
  });

  it("rejects an update date before the publication date", () => {
    const source = validFrontmatter.replace(
      'publishedAt: "2026-09-21"',
      'publishedAt: "2026-09-21"\nupdatedAt: "2026-09-20"',
    );

    expect(() => parseNoteSource("/content/notes/update-order.mdx", source)).toThrow(
      /updatedAt: cannot be earlier than publishedAt/,
    );
  });
});
