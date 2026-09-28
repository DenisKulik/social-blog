import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "@/app/providers";

const container = document.getElementById("app");

if (!container) {
  throw new Error('Element with id "app" was not found');
}

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </BrowserRouter>,
);
