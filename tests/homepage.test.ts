import { describe, expect, it } from "vitest";

import { projects } from "@/data/projects";
import { getAllBlogs } from "@/lib/content/blogs";
import { buildHomepageData } from "@/lib/homepage";
import { getAllNotes } from "@/lib/content/notes";

describe("homepage composition", () => {
  it("derives archive counts from published content", () => {
    const blogs = getAllBlogs();
    const notes = getAllNotes();
    const homepage = buildHomepageData({ blogs, notes, projects });

    expect(homepage.counts).toEqual({
      blogs: blogs.length,
      notes: notes.length,
      projects: projects.length,
    });
  });

  it("limits recent lists and publishes every featured project", () => {
    const homepage = buildHomepageData({
      blogs: getAllBlogs(),
      notes: getAllNotes(),
      projects,
    });

    expect(homepage.recentBlogs.length).toBeLessThanOrEqual(3);
    expect(homepage.recentNotes.length).toBeLessThanOrEqual(3);
    expect(homepage.featuredProjects).toEqual(
      projects.filter((project) => project.featured),
    );
  });
});
