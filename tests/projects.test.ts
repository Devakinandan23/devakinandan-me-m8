import { describe, expect, it } from "vitest";

import { parseProjects, projects } from "@/data/projects";

describe("project records", () => {
  it("publishes at least three evidence-backed projects", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
    expect(projects.every((project) => project.sourceUrl || project.demoUrl)).toBe(true);
  });

  it("keeps project slugs and stack entries unique", () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);

    for (const project of projects) {
      expect(new Set(project.stack).size).toBe(project.stack.length);
    }
  });

  it("rejects duplicate slugs", () => {
    expect(() => parseProjects([projects[0], projects[0], projects[1]])).toThrow(
      /duplicate project slug 'hybrid-rag'/,
    );
  });

  it("has at least one featured project", () => {
    expect(projects.some((project) => project.featured)).toBe(true);
  });
});
