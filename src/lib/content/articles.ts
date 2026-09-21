import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { ZodError } from "zod";

import {
  articleFrontmatterSchema,
  articleSlugSchema,
  type ArticleFrontmatter,
} from "./article-schema";

export type ArticleKind = "blog" | "note";

export type Article = ArticleFrontmatter & {
  body: string;
  filePath: string;
  kind: ArticleKind;
  readingTimeMinutes: number;
  slug: string;
};

const WORDS_PER_MINUTE = 200;

export function calculateReadingTimeMinutes(body: string): number {
  const wordCount = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_[\]()-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function formatZodError(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "frontmatter";
      return `${field}: ${issue.message}`;
    })
    .join("; ");
}

function contentError(kind: ArticleKind, filePath: string, message: string): Error {
  return new Error(`Invalid ${kind} '${filePath}': ${message}`);
}

export function parseArticleSource(
  kind: ArticleKind,
  filePath: string,
  source: string,
): Article {
  const extension = path.extname(filePath);
  const filename = path.basename(filePath, extension);

  if (extension !== ".mdx") {
    throw contentError(kind, filePath, "file extension must be .mdx");
  }

  const slugResult = articleSlugSchema.safeParse(filename);
  if (!slugResult.success) {
    throw contentError(kind, filePath, formatZodError(slugResult.error));
  }

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(source);
  } catch (error) {
    const message = error instanceof Error ? error.message : "frontmatter could not be parsed";
    throw contentError(kind, filePath, message);
  }

  const frontmatterResult = articleFrontmatterSchema.safeParse(parsed.data);
  if (!frontmatterResult.success) {
    throw contentError(kind, filePath, formatZodError(frontmatterResult.error));
  }

  return {
    ...frontmatterResult.data,
    body: parsed.content.trim(),
    filePath,
    kind,
    readingTimeMinutes: calculateReadingTimeMinutes(parsed.content),
    slug: slugResult.data,
  };
}

function assertUniqueSlugs(kind: ArticleKind, articles: Article[]): void {
  const firstPathBySlug = new Map<string, string>();

  for (const article of articles) {
    const firstPath = firstPathBySlug.get(article.slug);
    if (firstPath) {
      throw new Error(
        `Duplicate ${kind} slug '${article.slug}' in '${firstPath}' and '${article.filePath}'`,
      );
    }

    firstPathBySlug.set(article.slug, article.filePath);
  }
}

export function loadArticlesFromFiles(
  kind: ArticleKind,
  filePaths: string[],
  options: { includeDrafts?: boolean } = {},
): Article[] {
  const articles = filePaths.map((filePath) =>
    parseArticleSource(kind, filePath, fs.readFileSync(filePath, "utf8")),
  );

  assertUniqueSlugs(kind, articles);

  return articles
    .filter((article) => options.includeDrafts || !article.draft)
    .sort(
      (left, right) =>
        right.publishedAt.localeCompare(left.publishedAt) ||
        left.slug.localeCompare(right.slug),
    );
}

export function loadArticlesFromDirectory(
  kind: ArticleKind,
  directory: string,
): Article[] {
  if (!fs.existsSync(directory)) {
    throw new Error(`Required ${kind}s directory is missing: '${directory}'`);
  }

  const filePaths = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(directory, entry.name));

  return loadArticlesFromFiles(kind, filePaths);
}

export function findArticleBySlug(
  articles: Article[],
  slug: string,
): Article | undefined {
  const slugResult = articleSlugSchema.safeParse(slug);
  if (!slugResult.success) {
    return undefined;
  }

  return articles.find((article) => article.slug === slugResult.data);
}
