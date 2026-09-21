# Product specification

## Product statement

`devakinandan.me` is Devakinandan's durable engineering identity on the web. It should let a hiring manager or engineer understand what he builds, inspect credible project evidence, and read what he has learned without navigating a conventional résumé template.

The product is a publishing system first and a portfolio second. Its value should compound as notes, blogs, and projects are added through Git.

## Primary audience

1. Engineering managers and recruiters evaluating Devakinandan for backend or applied-AI roles.
2. Engineers reading practical notes about RAG, backend systems, Python, FastAPI, retrieval, and production trade-offs.
3. Devakinandan himself, returning to recall concepts and publish new understanding.

## Primary jobs

- Understand Devakinandan's current engineering focus within one viewport.
- Inspect a small set of real projects and follow links to source code or demos.
- Browse notes chronologically and open a readable technical note.
- Browse longer blog posts separately from short notes.
- Reach GitHub, LinkedIn, résumé, and email without hunting.
- Publish a new note by adding one repository file and pushing it.

## Positioning

Use this working identity until the owner supplies final copy:

> Backend and applied AI engineer. Building reliable retrieval systems and developer products.

This is descriptive, not a fabricated seniority claim. Public copy must be edited by the owner before launch.

## Required routes

| Route | Purpose |
| --- | --- |
| `/` | Identity, short biography, work categories, and recent content |
| `/notes` | Reverse-chronological note archive |
| `/notes/[slug]` | Individual technical note |
| `/blogs` | Reverse-chronological long-form archive |
| `/blogs/[slug]` | Individual blog post |
| `/projects` | Selected projects with evidence and links |
| `/about` | Longer biography, current focus, and contact paths |

The résumé may be a navigation link to a static PDF rather than a dedicated route.

## Homepage content hierarchy

1. Fixed or sticky navigation with name, core routes, and theme toggle.
2. Introductory identity block with one strong heading, one focus line, two or three short biography paragraphs, social links, and an owner-provided portrait.
3. “Explore work & writing” grid for Projects, Notes, and Blogs. Do not render empty or fake categories.
4. Recent notes.
5. Recent blogs.
6. Selected projects.
7. Compact footer with navigation and contact links.

## Content distinction

- A **note** captures one resolved question, mental model, gotcha, or practical takeaway. Target: 300–800 words.
- A **blog** makes a broader argument or teaches a complete topic. Target: 1,000+ words when the subject requires it.
- A **project** demonstrates shipped work through a problem, ownership, technical decisions, evidence, and links.

## Success criteria

The MVP is successful when:

- a first-time visitor can identify Devakinandan's focus and reach a project within 30 seconds;
- adding a valid MDX file produces an archive entry and static detail route without application-code changes;
- invalid frontmatter fails the production build with an actionable message;
- every public route works on mobile and desktop, supports keyboard navigation, and has useful metadata;
- `npm run build` completes without runtime services or secrets;
- the deployed site works at `devakinandan.me`.

## Explicit non-goals

- Looking senior through invented breadth or empty categories
- Reproducing Arpit Bhayani's content or personal brand
- Admin authoring, drafts in a database, accounts, comments, likes, or analytics dashboards
- Search, recommendations, newsletters, courses, talks, videos, papers, or bookshelves in MVP
- Backend APIs or server-side persistence
