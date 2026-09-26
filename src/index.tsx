import { createRoot } from "react-dom/client";
import Counter from "./components/Counter";

const container = document.getElementById("app");

if (!container) {
  throw new Error('Element with id "app" was not found');
}

const root = createRoot(container);
root.render(<Counter />);
