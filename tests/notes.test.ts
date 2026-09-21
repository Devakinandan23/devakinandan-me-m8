import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  calculateReadingTimeMinutes,
  loadNotesFromFiles,
} from "@/lib/content/notes";

const temporaryDirectories: string[] = [];

function createDirectory(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "devakinandan-notes-"));
  temporaryDirectories.push(directory);
  return directory;
}

function writeNote(
  directory: string,
  slug: string,
  publishedAt: string,
  draft = false,
): string {
  const filePath = path.join(directory, `${slug}.mdx`);
  fs.writeFileSync(
    filePath,
    `---
title: "A useful note about ${slug}"
description: "A sufficiently detailed description for the ${slug} technical note."
publishedAt: "${publishedAt}"
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

describe("loadNotesFromFiles", () => {
  it("excludes drafts and sorts published notes newest first", () => {
    const directory = createDirectory();
    const older = writeNote(directory, "older-note", "2026-09-01");
    const newer = writeNote(directory, "newer-note", "2026-09-20");
    const draft = writeNote(directory, "draft-note", "2026-09-21", true);

    const notes = loadNotesFromFiles([older, newer, draft]);

    expect(notes.map((note) => note.slug)).toEqual(["newer-note", "older-note"]);
  });

  it("uses the slug as a deterministic secondary sort", () => {
    const directory = createDirectory();
    const beta = writeNote(directory, "beta-note", "2026-09-20");
    const alpha = writeNote(directory, "alpha-note", "2026-09-20");

    const notes = loadNotesFromFiles([beta, alpha]);

    expect(notes.map((note) => note.slug)).toEqual(["alpha-note", "beta-note"]);
  });

  it("reports both files when slugs collide", () => {
    const firstDirectory = createDirectory();
    const secondDirectory = createDirectory();
    const first = writeNote(firstDirectory, "same-slug", "2026-09-20");
    const second = writeNote(secondDirectory, "same-slug", "2026-09-21");

    expect(() => loadNotesFromFiles([first, second])).toThrow(
      new RegExp(`Duplicate note slug 'same-slug'.*${first}.*${second}`),
    );
  });
});

describe("calculateReadingTimeMinutes", () => {
  it("returns at least one minute for a short note", () => {
    expect(calculateReadingTimeMinutes("A short but useful note.")).toBe(1);
  });

  it("rounds prose reading time up and ignores fenced code", () => {
    const prose = Array.from({ length: 201 }, () => "word").join(" ");
    const code = Array.from({ length: 400 }, () => "implementation").join(" ");

    expect(calculateReadingTimeMinutes(`${prose}\n\n\`\`\`ts\n${code}\n\`\`\``)).toBe(2);
  });
});
