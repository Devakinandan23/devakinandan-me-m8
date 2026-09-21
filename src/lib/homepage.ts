import type { Blog } from "@/lib/content/blogs";
import type { Note } from "@/lib/content/notes";
import type { Project } from "@/data/projects";

type HomepageSource = {
  blogs: Blog[];
  notes: Note[];
  projects: Project[];
};

export function buildHomepageData({ blogs, notes, projects }: HomepageSource) {
  return {
    counts: {
      blogs: blogs.length,
      notes: notes.length,
      projects: projects.length,
    },
    featuredProjects: projects.filter((project) => project.featured).slice(0, 3),
    recentBlogs: blogs.slice(0, 3),
    recentNotes: notes.slice(0, 3),
  };
}
