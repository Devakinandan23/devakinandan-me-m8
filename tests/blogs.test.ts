import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  loadBlogsFromFiles,
  parseBlogSource,
} from "@/lib/content/blogs";

const temporaryDirectories: string[] = [];

function createDirectory(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "devakinandan-blogs-"));
  temporaryDirectories.push(directory);
  return directory;
}

function writeBlog(directory: string, slug: string, draft: boolean): string {
  const filePath = path.join(directory, `${slug}.mdx`);
  fs.writeFileSync(
    filePath,
    `---
title: "A useful blog about ${slug}"
description: "A sufficiently detailed description for the ${slug} long-form article."
publishedAt: "2026-09-21"
tags:
  - testing
draft: ${draft}
---

Body.
`,
  );
  return filePath;
}

afterEach(() => {
  for (const directory of temporaryDirectories.splice(0)) {
    fs.rmSync(directory, { force: true, recursive: true });
  }
});

describe("blog content", () => {
  it("supports an empty published archive", () => {
    expect(loadBlogsFromFiles([])).toEqual([]);
  });

  it("excludes drafts from the public collection", () => {
    const directory = createDirectory();
    const published = writeBlog(directory, "published-blog", false);
    const draft = writeBlog(directory, "draft-blog", true);

    const blogs = loadBlogsFromFiles([draft, published]);

    expect(blogs.map((blog) => blog.slug)).toEqual(["published-blog"]);
    expect(blogs[0].kind).toBe("blog");
  });

  it("reports invalid frontmatter as a blog error", () => {
    const source = `---
title: "Too short"
description: "Missing the remaining required fields."
---

Body.
`;

    expect(() => parseBlogSource("/content/blogs/broken-blog.mdx", source)).toThrow(
      /Invalid blog '.*broken-blog\.mdx'/,
    );
  });
});
