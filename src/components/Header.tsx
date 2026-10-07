// Title overlay shown on top of the 3D scene
export function Header() {
    return (
        <header className="hero">
            <h1 className="hero-title">
                Welcome to <span>Nicoleta's</span> portofolio
            </h1>
            <p className="hero-sub">Scroll to see projects</p>
            <div className="hero-arrow" aria-hidden="true">↓</div>
        </header>
    );
}