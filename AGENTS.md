# Devakinandan.me — Agent Contract

## Mission

Build a content-first personal engineering website for Devakinandan. The site should use the information hierarchy and restrained editorial character of `arpitbhayani.me`, while publishing only Devakinandan's identity, experience, projects, and writing.

## Authoritative context

Always read this file.

Before implementation, read `docs/mvp-scope.md`. Read other documents only when the task needs them:

- product behavior and audience: `docs/product-spec.md`
- UI and reference-site behavior: `docs/reference-analysis.md`
- technical structure and dependencies: `docs/architecture.md`
- content fields, validation, and routes: `docs/content-model.md`
- challenge work: the relevant file under `docs/challenges/`

Do not load every document by default.

## Decision precedence

1. The user's current explicit instruction
2. `docs/mvp-scope.md`
3. Accepted decisions in `docs/architecture.md` and `docs/content-model.md`
4. Other project documentation
5. Existing implementation

If two authoritative documents conflict, stop and report the conflict. Do not silently choose one.

## Non-negotiable MVP constraints

- Content is committed to the repository as MDX or typed local data.
- Static generation is the default.
- No database, CMS, authentication, admin panel, comments, or server API.
- Do not add a dependency without explaining why the platform or current dependencies are insufficient.
- Do not copy Arpit Bhayani's text, images, branding, or personal data.
- Do not invent achievements, employers, metrics, testimonials, or social counts for Devakinandan.
- Keep the site deployable to Vercel and usable with the custom domain `devakinandan.me`.

## Implementation workflow

For each milestone:

1. Read only the relevant specifications.
2. Restate the acceptance criteria and expected files.
3. Inspect the current implementation before editing.
4. Implement the smallest coherent change that satisfies the milestone.
5. Run relevant tests, lint, typecheck, and a production build.
6. Review the diff for scope creep and architectural drift.
7. Report evidence against each acceptance criterion.
8. Stop. Do not start the next milestone.

## Human ownership

The human owner approves:

- public biography and claims
- profile image and resume
- framework or hosting changes
- content schema changes
- new runtime services or dependencies
- any scope expansion

Agents may implement approved milestones and make local refactors that preserve public and architectural contracts.
