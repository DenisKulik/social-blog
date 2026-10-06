import type { FC, ReactNode } from "react";
import type { Decorator } from "@storybook/react-webpack5";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { AntDesignProvider, useThemeVariables } from "../src/app/providers/antd";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../src/shared/config/theme";
import { storybookI18n } from "./i18n";
import "../src/app/styles/index.scss";

// Копия обёртки из src/app/App.tsx: применяет CSS-переменные темы и
// глобальные стили (.app), чтобы компоненты видели переменные вида
// --text-color, --bg-color и т.д.
const ThemedApp: FC<{ children: ReactNode }> = ({ children }) => {
  const themeVariables = useThemeVariables();

  return (
    <div className="app" style={themeVariables}>
      {children}
    </div>
  );
};

// Провайдер темы, управляемый тулбаром Storybook: значение берём из
// context.globals.theme, а не из localStorage, как делает ThemeProvider
// в приложении. При смене темы в истории (ThemeSwitcher) обновляем
// глобал через updateGlobals, чтобы тулбар и остальные истории
// получили новое значение.
const ThemeController: FC<{
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  children: ReactNode;
}> = ({ theme, onThemeChange, children }) => {
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (next) => {
          if (typeof next !== "function") {
            onThemeChange(next);
          }
        },
      }}
    >
      <AntDesignProvider>
        <ThemedApp>{children}</ThemedApp>
      </AntDesignProvider>
    </ThemeContext.Provider>
  );
};

const withAppProviders: Decorator = (Story, context) => {
  const theme = context.globals.theme === Theme.Dark ? Theme.Dark : Theme.Light;

  const handleThemeChange = (next: Theme) => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, next);
    void context.updateGlobals({ theme: next });
  };

  return (
    <I18nextProvider i18n={storybookI18n}>
      <ThemeController theme={theme} onThemeChange={handleThemeChange}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </ThemeController>
    </I18nextProvider>
  );
};

const preview = {
  decorators: [withAppProviders],
  globalTypes: {
    theme: {
      description: "Глобальная тема приложения",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: Theme.Light, title: "Light" },
          { value: Theme.Dark, title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
