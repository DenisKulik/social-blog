import { useMemo, useState, type FC, type ReactNode } from "react";
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
  type ThemeContextProps,
} from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

const readStoredTheme = (): Theme => {
  if (typeof localStorage === "undefined") {
    return Theme.Light;
  }

  return (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ?? Theme.Light;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme);

  const contextValue = useMemo<ThemeContextProps>(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
