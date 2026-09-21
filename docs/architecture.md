# Architecture

## Decision summary

| Concern | Decision | Status |
| --- | --- | --- |
| Framework | Next.js App Router with TypeScript | Accepted |
| Rendering | Static generation; static export where all routes permit it | Accepted |
| Styling | Tailwind CSS plus a small token layer in global CSS | Accepted |
| Fonts | Self-hosted Assistant and Lora through Fontsource packages | Accepted by M2 |
| Content | Repository-backed MDX for notes and blogs | Accepted |
| Structured data | Typed local TypeScript data for projects and site identity | Accepted |
| Validation | Zod schemas at build time | Accepted |
| MDX rendering | `next-mdx-remote/rsc` with an allow-listed component map | Accepted by CH-001 |
| Frontmatter parsing | `gray-matter` | Accepted by CH-001 |
| Code highlighting | `rehype-pretty-code` backed by Shiki | Accepted by CH-001 |
| Deployment | GitHub to Vercel; custom domain `devakinandan.me` | Accepted |
| Runtime services | None | Accepted |

## Why Next.js

The owner already works in the React/Next.js ecosystem, the required routes map cleanly to the App Router, static generation is supported, metadata and sitemap APIs are built in, and Vercel deployment is direct. Astro would be a credible content-first alternative, but adding a second frontend framework does not produce enough value for this project.

This decision is not permission to use server actions, route handlers, or runtime fetching. The default is generated HTML.

## System shape

```text
content/notes/*.mdx ─┐
                     ├─> parser + Zod validation ─> typed content records
content/blogs/*.mdx ─┘                                  │
                                                       ├─> archive pages
src/data/projects.ts ──────────────────────────────────┤
                                                       └─> static detail pages
```

## Intended source layout

```text
content/
  notes/
  blogs/
public/
  images/
  resume.pdf
src/
  app/
    notes/
    blogs/
    projects/
    about/
  components/
  data/
  lib/content/
  styles/
tests/
```

## Content loading boundary

All filesystem access stays in server/build-only modules under `src/lib/content`. React components receive validated typed records and must not parse files themselves.

Required content operations:

- list published content by type, newest first;
- resolve one item by slug;
- generate all static params;
- calculate published counts;
- expose metadata needed by archives and page metadata;
- reject malformed, duplicate, or inconsistent content during build.

## Dependency rules

Dependencies are acceptable only if they remove meaningful parsing, validation, or rendering risk. The initial dependency budget is:

- Zod for runtime schema validation and inferred TypeScript types;
- `gray-matter` for frontmatter parsing;
- `next-mdx-remote` for trusted local MDX compilation;
- `rehype-pretty-code` and Shiki for readable static code blocks.

Do not add a component library, state manager, animation library, date library, CMS SDK, database client, or icon bundle for MVP.

M2 adds only the two Fontsource packages required to self-host the approved Assistant and Lora families. This avoids a runtime font request and makes production builds deterministic.

## Security and trust boundary

- MDX is trusted repository content authored or reviewed by the owner.
- Never compile user-submitted or remote MDX.
- Do not enable arbitrary dynamic imports from MDX.
- External links rendered from content must use safe protocols.
- No secrets are required to build or run the site.

## Quality gates

Each implementation milestone must keep these commands green once the application exists:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The project must include an explicit `typecheck` script. Tests should target content validation, ordering, slug uniqueness, and rendering behavior; avoid snapshot-heavy tests that merely freeze markup.

## Failure behavior

- Invalid frontmatter: build fails and identifies the file and invalid fields.
- Duplicate slug: build fails and lists both files.
- Missing content directory: return an empty collection only when the directory is intentionally optional; otherwise fail clearly.
- Draft content: excluded from archives, static params, sitemap, RSS, and counts.
- Broken owner-controlled internal link: caught by verification before deployment.

## CH-001 outcome

- `next-mdx-remote/rsc` statically renders the trusted local MDX body and works with the allow-listed link component.
- `rehype-pretty-code` and Shiki produce highlighted code during the static build.
- `output: "export"` generates `/notes`, the known note detail route, and the global not-found page without a runtime service.
- Strict Zod validation produces file-specific build errors, so no custom build system is needed.

## M4 outcome

- Notes and blogs use one article parser, schema, ordering rule, reading-time calculation, and renderer.
- Thin note and blog adapters preserve domain-specific errors and route APIs without duplicating the pipeline.
- Two sample technical blogs were added at the owner's request so static export can generate and verify the detail route. They require content review before launch.

## M5 outcome

- Projects are validated from typed local data with unique slugs, bounded copy, unique stack entries, and at least one HTTPS evidence link per record.
- The static projects page presents the problem, owner contribution, stack, status, and verified source or demo links without relying on runtime services.
- Project descriptions and ownership statements are based on public repository evidence and still require owner review before launch.

## M6 outcome

- The homepage composes its counts, recent writing, and featured project selection from the same validated collections used by the archive routes.
- Owner-controlled identity copy lives in one typed local module and is not duplicated across the page.
- Unapproved portrait, résumé, LinkedIn, and contact data remain absent rather than being guessed; the homepage copy requires owner review before launch.

## M7 outcome

- A keyboard-visible skip link moves focus to the page content before repeated navigation.
- Primary navigation exposes the current section, and the mobile menu returns focus to its trigger when dismissed with Escape.
- Mobile controls meet a 44 CSS pixel minimum target, layouts avoid horizontal overflow at narrow effective widths, and reduced-motion preferences remain respected.

## M8 outcome

- Page metadata is generated from one helper so canonical, Open Graph, and X/Twitter fields stay aligned.
- The static sitemap contains the homepage, archives, projects page, and every published note/blog detail route.
- `/rss.xml` is generated at build time from the validated published collections, with deterministic ordering and escaped XML content.

## Deferred decisions

- Exact analytics provider, if any. Not MVP.
- Image optimization strategy for future content-heavy posts. Not required for CH-001.
