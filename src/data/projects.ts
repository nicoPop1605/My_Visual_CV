// All project content lives here. Add a project = add an object.
export type Project = {
    id: string;
    title: string;
    year: number;
    role: string;
    cover: string; // file inside /public, without a leading slash
    summary: string;
    description: string;
    tech: string[];
    links: { live?: string; repo?: string };
};

export const projects: Project[] = [
    {
        id: "project-one",
        title: "Software developer Intern | AscentCore",
        year: 2026,
        role: "Focus: Backend Development, Software Engineering",
        cover: "intern.jpg",
        summary: "One short sentence about this project.",
        description: "Developing the backend of an internal application, focusing on API development, database integration, and containerized deployment.",
        tech: ["Python, FastAPI, PostgreSQL, Docker, Flyway"],
        links: { live: "", repo: "" },
    },
    {
        id: "project-two",
        title: "AI Auto Damage Estimator | React, TypeScript, FastAPI, YOLOv8, SQL Server",
        year: 2026,
        role: "Personal project",
        cover: "car_detector.png",
        summary: "",
        description: "Full-stack application for automated vehicle damage detection and repair cost estimation.",
        tech: ["React, TypeScript, FastAPI, YOLOv8, SQL Server"],
        links: {},
    },
    {
        id: "project-three",
        title: "Hangout Planner – Event Management App",
        year: 2026,
        role: "personal project",
        cover: "crewzy.png",
        summary: "• Focus: Full-Stack Development, Real-Time Systems, UI/UX.",
        description: "Collaborative event planning platform with real-time scheduling, group management, andevent discovery.",
        tech: ["React", "TypeScript", "Node.js", "GraphQL", "Supabase", "Socket.io", "Tailwind","CSS"],
        links: { live: "", repo: "" },
    },
    {
        id: "project-four",
        title: "Evolutionary Design Optimization of an Aircraft Configuration",
        year: 2026,
        role: "",
        cover: "airplane.png",
        summary: "• Focus: Optimization, Data Analysis",
        description: "Multi-objective optimization framework for evaluating aircraft configurations undercompeting performance constraints.",
        tech: ["Python, NSGA-II, pymoo, NumPy, Matplotlib"],
        links: { live: "", repo: "https://github.com/nicoPop1605/Evolutionary-Design-Optimization-of-an-Aircraft-Configuration/blob/main/Evolutionary-Design-Optimization-of-an-Aircraft-Configuration%20(1).pdf"},
    },
    {
        id: "project-five",
        title: "Decoding Consumer Behavior: Online vs. In-Store Retail Analysis",
        year: 2025,
        role: "Designer and developer",
        cover: "shopping.jpg",
        summary: "• Focus: Machine Learning, Data Analysis, Predictive Modeling.",
        description: "Machine learning pipeline for predicting consumer shopping preferences from behavioraln data.",
        tech: ["Python, Scikit-learn, Random Forest, SMOTE, Pandas"],
        links: { live: "", repo: "https://github.com/nicoPop1605/online_vs_store_prediction" },
    },
    {
        id: "project-six",
        title: "Ballroom and Latin Dancer",
        year: 2026,
        role: "",
        cover: "dance.jpg",
        summary: "",
        description: "Participated in numerous national and international competitions, achieving 3rd place nationally in the Ten Dance Championship. Developed strong communication, teamwork, and discipline skills through years of partnership- based training and performance.Dance instructor • Taught ballroom dancing to primary school students for one year. • Delivered dance instruction for wedding couples and at various events, including sessions conducted in English. • Gained experience in teaching, patience, and communication.",
        tech: [""],
        links: {},
    },
    // Copy the block above to add more (the carousel adapts to the count).
];