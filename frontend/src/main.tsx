import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from 'vite-plugin-pwa/client';

createRoot(document.getElementById("root")!).render(<App />);
registerSW();
