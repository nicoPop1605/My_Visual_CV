import { createRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App";
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";

function Root() {
    return (
        <>
            <App />
            <Header />
            <Menu />
        </>
    );
}

createRoot(document.getElementById("root")!).render(<Root />);