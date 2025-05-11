import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Only import and initialize Tempo Devtools when in development
if (import.meta.env.DEV && import.meta.env.VITE_TEMPO === "true") {
  try {
    const { TempoDevtools } = await import("tempo-devtools");
    TempoDevtools.init();
  } catch (error) {
    console.warn("Failed to initialize Tempo:", error);
  }
}

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);