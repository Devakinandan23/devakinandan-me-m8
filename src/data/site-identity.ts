export type SiteIdentity = {
  biography: string[];
  focus: string;
  fullName: string;
  githubUrl: string;
  shortName: string;
  siteUrl: string;
};

export const siteIdentity: SiteIdentity = {
  fullName: "Devakinandan K",
  shortName: "Devakinandan",
  focus:
    "Backend and applied AI engineer. Building reliable retrieval systems and developer products.",
  biography: [
    "I build backend and applied AI systems with an emphasis on explicit contracts, inspectable behavior, and failure modes that are easy to reason about.",
    "Recent work spans retrieval pipelines, real-time multiplayer products, and tools for capturing and sharing technical knowledge.",
  ],
  githubUrl: "https://github.com/devakinandan23",
  siteUrl: "https://devakinandan.me",
};
