import { createRoot } from "react-dom/client";
import App from "./app/App";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@/shared/config/theme";
import { AntDesignProvider, StoreProvider } from "@/app/providers";

import "@/shared/config/i18n/i18n";
import ErrorBoundary from "./app/providers/ErrorBoundary";

const container = document.getElementById("app");

if (!container) {
  throw new Error('Element with id "app" was not found');
}

const root = createRoot(container);
root.render(
  <HashRouter>
    <ErrorBoundary>
      <ThemeProvider>
        <StoreProvider>
          <AntDesignProvider>
            <App />
          </AntDesignProvider>
        </StoreProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </HashRouter>,
);
