import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("app");

if (!container) {
  throw new Error('Element with id "app" was not found');
}

const root = createRoot(container);
root.render(<App />);
