import path from "node:path";

import {
  calculateReadingTimeMinutes,
  findArticleBySlug,
  loadArticlesFromDirectory,
  loadArticlesFromFiles,
  parseArticleSource,
  type Article,
} from "./articles";

const NOTES_DIRECTORY = path.join(process.cwd(), "content", "notes");

export type Note = Article & { kind: "note" };

export { calculateReadingTimeMinutes };

export function parseNoteSource(filePath: string, source: string): Note {
  return parseArticleSource("note", filePath, source) as Note;
}

export function loadNotesFromFiles(
  filePaths: string[],
  options: { includeDrafts?: boolean } = {},
): Note[] {
  return loadArticlesFromFiles("note", filePaths, options) as Note[];
}

export function getAllNotes(): Note[] {
  return loadArticlesFromDirectory("note", NOTES_DIRECTORY) as Note[];
}

export function getNoteBySlug(slug: string): Note | undefined {
  return findArticleBySlug(getAllNotes(), slug) as Note | undefined;
}
