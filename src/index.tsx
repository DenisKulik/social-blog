import { createRoot } from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/shared/config/theme";
import { AntDesignProvider } from "@/app/providers";

import "@/shared/config/i18n/i18n";
import ErrorBoundary from "./app/providers/ErrorBoundary";

const container = document.getElementById("app");

if (!container) {
  throw new Error('Element with id "app" was not found');
}

const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <AntDesignProvider>
          <App />
        </AntDesignProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </BrowserRouter>,
);
