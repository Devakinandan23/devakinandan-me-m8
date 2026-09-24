# devakinandan.me

The source for Devakinandan's personal engineering website: projects, technical notes, and long-form writing.

## Status

M8 complete — canonical page metadata, social metadata, a generated sitemap, and a static RSS feed cover every published route and article.

## Milestones

- M0: specifications and challenge contract
- M1: one MDX note from file to archive and detail page
- M2: shared layout, navigation, theme, and typography
- M3: complete notes experience
- M4: blogs experience
- M5: projects experience
- M6: homepage composition
- M7: responsive and accessibility pass
- M8: metadata, RSS, and sitemap
- M9: Vercel deployment and custom domain

Read `AGENTS.md` before making changes.

## Writing a note

Copy [`docs/templates/note-template.mdx`](docs/templates/note-template.mdx) to `content/notes/<slug>.mdx`, then replace its frontmatter and prompts with your note. Keep `draft: true` while writing; set it to `false` when the note is ready to publish. The template uses the three-part structure described in [`docs/content-model.md`](docs/content-model.md).
