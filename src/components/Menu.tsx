import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

type Section = "about" | "skills" | "contact";

const buttons: { id: Section; label: string }[] = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

// A timeline list, used for experience and education
function Timeline({
    items,
}: {
    items: { title: string; place: string }[];
}) {
    return (
        <ul className="timeline">
            {items.map((it) => (
                <li key={ it.title}>
                    <strong>{it.title}</strong>
                    <span>{it.place}</span>
                </li>
            ))}
        </ul>
    );
}

export function Menu() {
    // Which panel is open (null = none)
    const [open, setOpen] = useState<Section | null>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const opener = useRef<HTMLElement | null>(null); // button to return focus to

    // Esc closes the panel, focus moves into it, and goes back when it closes
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
        window.addEventListener("keydown", onKey);
        closeRef.current?.focus();
        return () => {
            window.removeEventListener("keydown", onKey);
            opener.current?.focus();
        };
    }, [open]);

    return (
        <>
            <nav className="nav" aria-label="Sections">
                {buttons.map((b) => (
                    <button
                        key={b.id}
                        onClick={(e) => {
                            opener.current = e.currentTarget;
                            setOpen(b.id);
                        }}
                    >
                        {b.label}
                    </button>
                ))}
            </nav>

            {open && (
                // Clicking the dark area closes the panel
                <div className="side-backdrop" onClick={() => setOpen(null)}>
                    <aside
                        className="side"
                        role="dialog"
                        aria-modal="true"
                        aria-label={open}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            ref={closeRef}
                            className="detail-close"
                            onClick={() => setOpen(null)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        {open === "about" && (
                            <>
                                <h2>About me</h2>
                                <p>{profile.about}</p>
                                <h3>Experience</h3>
                                <Timeline items={profile.experience} />
                                <h3>Education</h3>
                                <Timeline items={profile.education} />
                            </>
                        )}

                        {open === "skills" && (
                            <>
                                <h2>Skills</h2>
                                {profile.skills.map((g) => (
                                    <section key={g.group}>
                                        <h3>{g.group}</h3>
                                        <div className="chips">
                                            {g.items.map((s) => (
                                                <span key={s}>{s}</span>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </>
                        )}

                        {open === "contact" && (
                            <>
                                <h2>Contact</h2>
                                <ul className="contact-list">
                                    {profile.contact.map((c) => (
                                        <li key={c.label}>
                                            <a href={c.href} target="_blank" rel="noreferrer">
                                                {c.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    className="cv-button"
                                    href={`${import.meta.env.BASE_URL}${profile.cv}`}
                                    download
                                >
                                    Download CV (PDF)
                                </a>
                            </>
                        )}
                    </aside>
                </div>
            )}
        </>
    );
}