import {
  createElement,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";
import {
  LOCAL_STORAGE_THEME_KEY,
  Theme,
  ThemeContext,
} from "../lib/ThemeContext";

type ThemeContextProviderProps = {
  children: ReactNode;
};

const defaultTheme =
  (typeof localStorage !== "undefined"
    ? (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme)
    : null) || Theme.Light;

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return createElement(
    ThemeContext.Provider,
    { value: defaultProps },
    children,
  );
};
