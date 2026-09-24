# Content model

## File conventions

```text
content/notes/<slug>.mdx
content/blogs/<slug>.mdx
```

The filename is the canonical slug. Frontmatter must not contain a second editable slug field; two sources of truth would eventually diverge.

Notes and blogs share one validation and rendering pipeline. Their `kind` and route are derived from the collection adapter, so content authors do not repeat either value in frontmatter.

## Shared article frontmatter

```yaml
---
title: "What does create_retrieval_chain actually do?"
description: "A mental model for how LangChain connects retrieval and answer generation."
publishedAt: "2026-09-21"
updatedAt: "2026-09-21" # optional
tags:
  - rag
  - langchain
draft: false
---
```

## Validation contract

| Field | Type | Rules |
| --- | --- | --- |
| `title` | string | Required; trimmed; 8–100 characters |
| `description` | string | Required; trimmed; 30–180 characters |
| `publishedAt` | ISO date string | Required; valid calendar date |
| `updatedAt` | ISO date string | Optional; cannot precede `publishedAt` |
| `tags` | string array | Required; 1–5 unique lowercase slugs |
| `draft` | boolean | Required; drafts excluded from public outputs |

Derived fields:

| Field | Source |
| --- | --- |
| `slug` | Filename without `.mdx` |
| `kind` | Parent content directory |
| `readingTimeMinutes` | Prose word count at 200 words per minute, rounded up; fenced and inline code excluded |

Unknown frontmatter keys should fail validation. Strict schemas prevent silent typos such as `publishAt`.
Every article body must contain non-whitespace content after its frontmatter.

## Slug rules

- lowercase ASCII letters, numbers, and single hyphens only;
- no leading, trailing, or repeated hyphens;
- unique within a content type;
- stable after publication; changing it changes the public URL.

## Note body template

For a copy-ready starting point, use [`docs/templates/note-template.mdx`](templates/note-template.mdx). Its three sections follow this flow:

1. What people already know
2. What is surprisingly new
3. Why it matters in practice

This is a writing aid, not a renderer requirement. Adapt or remove sections when another structure makes the note clearer. Update the title, description, date, and tags; keep `draft: true` while writing and change it to `false` when ready to publish. Remove the example source link if the note has no source to cite.

## Blog body

Blogs have no mandatory section template. They must have a clear question or claim, a coherent argument, concrete examples, and an ending that earns its conclusion.

## Project record

Projects live in `src/data/projects.ts` because their cards are structured data rather than arbitrary prose.

```ts
type Project = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  ownership: string[];
  stack: string[];
  status: "active" | "maintained" | "archived";
  featured: boolean;
  sourceUrl?: string;
  demoUrl?: string;
};
```

Metrics may be added only when their source and measurement period are defensible.

## Site identity record

Owner-controlled identity data should live in one typed local module rather than being duplicated across pages:

- full name
- short focus line
- biography paragraphs
- current role text
- location, if the owner wants it public
- GitHub, LinkedIn, résumé, and contact links
- portrait path and alt text

No public identity claim is final until the owner reviews it.

## Publication workflow

```text
Create MDX file
  -> preview locally
  -> validation/tests/build
  -> commit and push
  -> Vercel deploys static output
```

No database write, admin login, or manual route registration is involved.
