import { z } from "zod";

const projectStatusSchema = z.enum(["active", "maintained", "archived"]);

export const projectSchema = z
  .object({
    slug: z
      .string()
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "must use lowercase letters, numbers, and single hyphens",
      ),
    name: z.string().trim().min(2).max(60),
    summary: z.string().trim().min(30).max(180),
    problem: z.string().trim().min(30).max(220),
    ownership: z.array(z.string().trim().min(12).max(160)).min(1).max(4),
    stack: z
      .array(z.string().trim().min(1).max(30))
      .min(2)
      .max(8)
      .refine((items) => new Set(items).size === items.length, {
        message: "must contain unique technologies",
      }),
    status: projectStatusSchema,
    featured: z.boolean(),
    sourceUrl: z.url().startsWith("https://").optional(),
    demoUrl: z.url().startsWith("https://").optional(),
  })
  .strict()
  .refine((project) => project.sourceUrl || project.demoUrl, {
    message: "must include a source or live demo URL",
  });

const projectCollectionSchema = z.array(projectSchema).min(3).superRefine((items, context) => {
  const seenSlugs = new Set<string>();

  items.forEach((project, index) => {
    if (seenSlugs.has(project.slug)) {
      context.addIssue({
        code: "custom",
        message: `duplicate project slug '${project.slug}'`,
        path: [index, "slug"],
      });
    }

    seenSlugs.add(project.slug);
  });
});

export type Project = z.infer<typeof projectSchema>;

export function parseProjects(input: unknown): Project[] {
  return projectCollectionSchema.parse(input);
}

export const projects = parseProjects([
  {
    slug: "hybrid-rag",
    name: "Hybrid RAG",
    summary:
      "A local workspace for uploading documents, exploring passages, and asking grounded questions with inspectable sources.",
    problem:
      "Retrieval systems are difficult to trust when their ingestion, ranking, and citation decisions are hidden from the person using them.",
    ownership: [
      "Designed the document ingestion, hybrid retrieval, reranking, and citation-verification pipeline.",
      "Built the FastAPI and React application around Qdrant, OpenAI adapters, and deterministic local tests.",
    ],
    stack: ["Python", "FastAPI", "React", "Qdrant", "OpenAI", "Docker"],
    status: "active",
    featured: true,
    sourceUrl: "https://github.com/Devakinandan23/Hybrid_RAG",
  },
  {
    slug: "typeracter",
    name: "Typeracter",
    summary:
      "A focused typing app for solo practice and private real-time races with friends, with no account required.",
    problem:
      "Most typing tools separate deliberate practice from the lightweight social pressure that makes a live race engaging.",
    ownership: [
      "Built the solo practice flow, private race rooms, and synchronized live-progress experience.",
      "Shaped a low-friction entry path so people can practice or race without creating an account.",
    ],
    stack: ["React", "Vite", "TypeScript", "Socket.IO", "PostgreSQL"],
    status: "active",
    featured: true,
    demoUrl: "https://monkeytype4.devakinandan.xyz/",
  },
  {
    slug: "bugrace-ai",
    name: "BugRace AI",
    summary:
      "A real-time multiplayer debugging game with server-owned race state, semantic evaluation, and deterministic scoring.",
    problem:
      "Debugging practice is usually solitary and open-ended, making it hard to compare reasoning under the same constraints.",
    ownership: [
      "Defined the typed room protocol, server-authoritative lifecycle, deadlines, and deterministic leaderboard rules.",
      "Separated AI semantic evaluation from application-owned scoring and safe curated fallbacks.",
    ],
    stack: ["Next.js", "TypeScript", "Express", "Socket.IO", "Zod", "OpenAI"],
    status: "active",
    featured: true,
    sourceUrl: "https://github.com/Devakinandan23/bugrace-ai",
    demoUrl: "https://bugrace-ai.netlify.app/",
  },
  {
    slug: "second-brain",
    name: "Second Brain",
    summary:
      "A multi-user knowledge backend for saving links, extracting metadata, organizing notes, and sharing collections.",
    problem:
      "Useful links become difficult to retrieve when their context, ownership, tags, and sharing rules live in separate places.",
    ownership: [
      "Designed the relational user, note, tag, and share-link models with strict ownership boundaries.",
      "Built authenticated content, metadata ingestion, soft-delete, and public sharing APIs.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Prisma", "Zod"],
    status: "active",
    featured: true,
    sourceUrl: "https://github.com/Devakinandan23/second-brain-backend",
    demoUrl: "https://secondbrain.devakinandan.xyz/",
  },
]);
