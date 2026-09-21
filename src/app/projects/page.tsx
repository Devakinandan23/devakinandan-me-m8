import type { Metadata } from "next";

import { projects } from "@/data/projects";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Selected systems Devakinandan has built across applied AI, real-time collaboration, and backend engineering.",
  path: "/projects",
});

const statusLabels = {
  active: "Active build",
  maintained: "Maintained",
  archived: "Archived",
} as const;

export default function ProjectsPage() {
  return (
    <main className="page-shell projects-page">
      <header className="projects-intro">
        <p className="eyebrow">Selected work</p>
        <h1 className="page-title">Projects</h1>
        <p className="page-description">
          Systems I have designed and built, with the problem, my ownership, and
          evidence kept close together.
        </p>
      </header>

      <ol className="projects-list">
        {projects.map((project, index) => (
          <li className="project-card" key={project.slug}>
            <div className="project-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>

            <article>
              <div className="project-heading">
                <div>
                  <p className="project-status" data-status={project.status}>
                    {statusLabels[project.status]}
                  </p>
                  <h2>{project.name}</h2>
                </div>

                <div aria-label={`${project.name} evidence`} className="project-links">
                  {project.sourceUrl ? (
                    <a href={project.sourceUrl} rel="noreferrer noopener" target="_blank">
                      Source <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                  {project.demoUrl ? (
                    <a href={project.demoUrl} rel="noreferrer noopener" target="_blank">
                      Live demo <span aria-hidden="true">↗</span>
                    </a>
                  ) : null}
                </div>
              </div>

              <p className="project-summary">{project.summary}</p>

              <div className="project-details">
                <section>
                  <h3>Problem</h3>
                  <p>{project.problem}</p>
                </section>

                <section>
                  <h3>What I owned</h3>
                  <ul>
                    {project.ownership.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              <ul aria-label={`${project.name} technology stack`} className="project-stack">
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
}
