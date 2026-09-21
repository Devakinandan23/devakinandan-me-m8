# MVP scope — authoritative

This file defines what may be built for the first public release. If another document implies more, this file wins.

## Product boundary

Build a responsive content-first personal engineering site inspired by the structure and editorial visual language of `arpitbhayani.me`. Use Devakinandan's own identity and real work. Do not make a pixel-for-pixel copy or reproduce the reference's content.

## Included

### Foundation

- Next.js App Router and TypeScript
- Static generation
- Tailwind CSS and global design tokens
- Warm light theme and considered dark theme
- Site-specific favicon
- Responsive navigation and footer

### Content system

- Repository-backed MDX notes and blogs
- Strict build-time frontmatter validation
- Static archives and detail routes
- Syntax-highlighted code blocks
- Tags displayed on content; tag archive pages are not required
- Draft exclusion
- Derived content counts and recent-content lists

### Public experience

- Homepage
- Notes archive and note details
- Blogs archive and blog details
- Projects page
- About page
- Owner-provided résumé link
- GitHub, LinkedIn, and contact links
- Light/dark theme toggle
- Useful page metadata, sitemap, and RSS for published writing
- Accessible keyboard/focus behavior and responsive layouts

### Initial real content

- At least one owner-reviewed note
- At least three owner-reviewed projects
- Blog sections may render an honest empty state or remain hidden until the first blog is published

## Excluded

- Database, API, authentication, admin interface, or CMS
- Search, filters, comments, likes, reactions, or newsletter signup
- Analytics unless separately approved after launch
- Videos, talks, papershelf, bookshelf, courses, or fake placeholders
- Dynamic GitHub API calls during page requests
- Arbitrary remote MDX
- Animations beyond small hover/focus/theme transitions
- Generated claims, biography facts, project metrics, or testimonials

## Milestone order

| Milestone | Deliverable | Exit condition |
| --- | --- | --- |
| M0 | Specifications | Owner can explain and approve core decisions |
| M1 | Content vertical slice | One MDX note appears in `/notes` and `/notes/[slug]`; malformed content fails build |
| M2 | Shell and visual system | Navigation, footer, typography, tokens, theme, and favicon work responsively |
| M3 | Notes | Archive and article experience complete |
| M4 | Blogs | Archive and article experience complete, including honest empty state |
| M5 | Projects | Real project records and evidence links rendered |
| M6 | Homepage | Identity, explore cards, recent content, and featured projects composed |
| M7 | Quality pass | Accessibility and responsive acceptance criteria pass |
| M8 | Discovery | Metadata, sitemap, and RSS complete |
| M9 | Release | Vercel deployment and `devakinandan.me` configured |

Only one milestone is implemented at a time. Completing a milestone does not authorize the next one.

## Global definition of done

- No known contradiction with this scope.
- No copied personal content from the reference site.
- All public claims are owner-reviewed.
- Lint, typecheck, tests, and production build pass.
- Core routes work at narrow mobile and desktop widths.
- No horizontal overflow at 320 CSS pixels.
- Interactive elements have visible keyboard focus.
- Main text remains readable at 200% browser zoom.
- Invalid content fails with an actionable file-specific error.
- Drafts never appear in routes, counts, sitemap, or RSS.
