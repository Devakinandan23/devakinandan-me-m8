# CH-001 — MDX content pipeline

**Status:** Completed on 2026-09-21.

## Goal

Prove the highest-risk architectural assumption before building the visible site: repository-backed MDX can be validated, statically routed, rendered with technical content, and listed without a database or CMS.

## Vertical slice

```text
content/notes/what-is-reranking.mdx
  -> parse frontmatter
  -> validate with strict schema
  -> derive slug from filename
  -> generate static route
  -> render in /notes
  -> render in /notes/what-is-reranking
```

## Scope

Implement only:

- the minimum Next.js/TypeScript project scaffold;
- the note content schema and build-only loader;
- one real sample note;
- `/notes` archive;
- `/notes/[slug]` detail page;
- MDX headings, paragraphs, lists, links, inline code, and highlighted fenced code blocks;
- focused tests for validation, duplicate slugs, draft exclusion, and ordering;
- minimal styles needed to inspect readability.

## Acceptance criteria

1. A valid `content/notes/what-is-reranking.mdx` creates a visible archive item and a statically generated detail route.
2. The archive displays title, published date, description, and tags.
3. The detail page renders the supported MDX elements and code highlighting without client-side MDX evaluation.
4. Published notes are sorted newest first, with a deterministic secondary sort.
5. A draft note is excluded from the archive and static parameters.
6. Missing required fields, unknown fields, invalid dates, invalid tags, or invalid filenames fail with an error naming the file and problem.
7. Duplicate derived slugs fail with an error naming both conflicting files.
8. A missing slug returns the framework's not-found response.
9. No database, CMS, authentication, server API, homepage, projects page, theme toggle, RSS, sitemap, or design polish is added.
10. Lint, typecheck, focused tests, and production build all pass.

## Failure cases to test

- missing `title`;
- typo such as `publishAt`;
- impossible date such as `2026-02-30`;
- `updatedAt` before `publishedAt`;
- uppercase, duplicate, empty, or more than five tags;
- filename with spaces, uppercase characters, or repeated hyphens;
- two files resolving to the same slug;
- draft accidentally included in a public list;
- MDX syntax error;
- requested slug not present.

## Decisions this challenge must resolve

- Does `next-mdx-remote/rsc` support the required static build and highlighting path cleanly?
- Is `output: "export"` compatible with the chosen not-found and MDX route behavior, or should Vercel use the standard Next.js static-generation build?
- Can validation errors be made file-specific and understandable without a custom build system?

Record any changed decision in `docs/architecture.md`; do not work around a failed assumption silently.

## Explicit non-goals

- matching the final reference-site design;
- generalized content abstractions for future content types;
- reusable card system;
- remote content, image uploads, search, analytics, or GitHub API data;
- implementing M2 or later work.

## Evidence required at completion

- changed-file summary;
- command results for lint, typecheck, tests, and production build;
- mapping from every acceptance criterion to code or test evidence;
- unresolved risks and the recommended architecture decision.

## Outcome

- The sample note is emitted as static HTML at `/notes/what-is-reranking` and appears in `/notes`.
- Strict frontmatter, filename, tag, date, draft, ordering, and duplicate-slug behavior is covered by focused tests.
- MDX and syntax highlighting compile during the production static export.
- Static export is accepted for the MVP; no runtime service is required.
