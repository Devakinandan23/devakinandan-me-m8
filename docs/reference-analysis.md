# Reference analysis — arpitbhayani.me

Observed on 2026-09-20 from the public homepage. The reference is a design and information-architecture input, not a content source.

## What makes the reference effective

The site behaves like an engineering knowledge base attached to a person, not a résumé landing page. The homepage establishes identity, exposes content categories with real counts, and then gives recent material in chronological lists. Most credibility comes from accumulated public work rather than decorative claims.

## Observed information architecture

The current navigation exposes Projects, Blogs, Notes, Videos, Papershelf, Bookshelf, Courses, and Talks. The homepage contains:

1. A fixed top navigation.
2. A long-form introduction beside a portrait.
3. Direct social links.
4. An “Explore Work & Writings” card grid.
5. Recent blogs, notes, videos, projects, and papers.
6. A multi-column footer.

The archive links and recent lists make a large body of content navigable without search.

## Observed visual system

| Element | Observation | Adaptation for Devakinandan |
| --- | --- | --- |
| Canvas | Warm near-white background (`#faf9f6` observed) with dark gray text | Preserve the warm paper-like canvas |
| Body type | Assistant, 16px, 24px line height | Use a highly readable sans-serif; Assistant is acceptable |
| Display type | Lora, italic, semibold | Use Lora for name and editorial headings |
| Desktop frame | Roughly 1,150px centered navigation/content at a 1,363px viewport | Use a max width near 72rem with responsive side padding |
| Primary heading | About 40px desktop, Lora italic | Preserve the editorial hierarchy, not the exact wording |
| Navigation | Name at left; plain text routes at right; no heavy chrome | Keep only Home identity, Projects, Blogs, Notes, About, and theme toggle |
| Explore cards | Four columns desktop, two tablet, one mobile; outlined/simple cards | Use three real cards initially: Projects, Notes, Blogs |
| Recent content | Date-plus-title lists with archive links | Preserve the scan-friendly chronological pattern |
| Motion | Restrained; content and links dominate | Limit motion to subtle hover/focus transitions |

## Patterns to preserve

- Typography-led editorial layout
- Strong separation between notes, blogs, and projects
- Visible, honest content counts derived from source files
- Recent-content lists on the homepage
- Compact navigation and generous reading width
- Light/dark theme support
- Responsive card grid and readable article pages

## Patterns to reject or defer

- Empty categories copied only for visual symmetry
- Follower counts or other vanity metrics without reliable data
- Seven-paragraph biography before the visitor reaches Devakinandan's work
- Commercial-course, policies, or company-address footer content
- Copying source text, portrait treatment, project descriptions, or branding

## Devakinandan-specific first release

The reference has eight categories because it has years of material. This MVP has three:

| Category | Initial role |
| --- | --- |
| Projects | Proof of shipped systems: Hybrid RAG, Typeracter, Second Brain, BugRace AI |
| Notes | Short explanations produced from current RAG/backend learning |
| Blogs | Longer technical arguments; hide recent-blog section if no published blog exists |

Counts must be calculated from published content, never hard-coded marketing numbers.

## Visual thesis

**A quiet engineering notebook with a confident editorial spine.** Warm paper background, restrained ink colors, serif-italic display type, dense but readable technical writing, thin borders, and almost no ornamental UI.
