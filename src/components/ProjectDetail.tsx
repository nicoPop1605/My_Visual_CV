import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close on Esc, and move keyboard focus into the panel when it opens
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    // Clicking the dark backdrop closes the panel
    <div className="detail-backdrop" onClick={onClose}>
      {/* Clicks inside the panel must not reach the backdrop */}
      <article
        className="detail"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="detail-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img src={`${import.meta.env.BASE_URL}${project.cover}`} alt="" />
        <h2 id="detail-title">{project.title}</h2>
        <p className="detail-meta">
          {project.role} · {project.year}
        </p>
        <p>{project.description}</p>
        <p className="detail-tech">{project.tech.join(" · ")}</p>
        {project.links.live && <a href={project.links.live}>Live site</a>}{" "}
        {project.links.repo && <a href={project.links.repo}>GitHub</a>}
      </article>
    </div>
  );
}