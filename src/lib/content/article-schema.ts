import { z } from "zod";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isCalendarDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const dateSchema = z
  .string()
  .refine(isCalendarDate, "must be a real date in YYYY-MM-DD format");

const tagSchema = z
  .string()
  .regex(SLUG_PATTERN, "must be a lowercase slug such as 'vector-search'");

export const articleFrontmatterSchema = z
  .object({
    title: z.string().trim().min(8).max(100),
    description: z.string().trim().min(30).max(180),
    publishedAt: dateSchema,
    updatedAt: dateSchema.optional(),
    tags: z
      .array(tagSchema)
      .min(1)
      .max(5)
      .refine((tags) => new Set(tags).size === tags.length, {
        message: "must contain unique tags",
      }),
    draft: z.boolean(),
  })
  .strict()
  .superRefine((frontmatter, context) => {
    if (
      frontmatter.updatedAt &&
      frontmatter.updatedAt < frontmatter.publishedAt
    ) {
      context.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "cannot be earlier than publishedAt",
      });
    }
  });

export const articleSlugSchema = z
  .string()
  .regex(SLUG_PATTERN, "must use lowercase letters, numbers, and single hyphens");

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
