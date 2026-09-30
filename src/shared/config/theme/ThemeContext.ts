import { createContext, type Dispatch, type SetStateAction } from "react";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export interface ThemeContextProps {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Theme.Light,
  setTheme: () => {},
});

export const LOCAL_STORAGE_THEME_KEY = "theme";
