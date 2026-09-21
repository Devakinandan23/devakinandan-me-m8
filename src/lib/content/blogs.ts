import path from "node:path";

import {
  findArticleBySlug,
  loadArticlesFromDirectory,
  loadArticlesFromFiles,
  parseArticleSource,
  type Article,
} from "./articles";

const BLOGS_DIRECTORY = path.join(process.cwd(), "content", "blogs");

export type Blog = Article & { kind: "blog" };

export function parseBlogSource(filePath: string, source: string): Blog {
  return parseArticleSource("blog", filePath, source) as Blog;
}

export function loadBlogsFromFiles(
  filePaths: string[],
  options: { includeDrafts?: boolean } = {},
): Blog[] {
  return loadArticlesFromFiles("blog", filePaths, options) as Blog[];
}

export function getAllBlogs(): Blog[] {
  return loadArticlesFromDirectory("blog", BLOGS_DIRECTORY) as Blog[];
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return findArticleBySlug(getAllBlogs(), slug) as Blog | undefined;
}
