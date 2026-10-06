import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeProvider, useTheme } from "./index";

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("по умолчанию отдаёт светлую тему", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe(Theme.Light);
  });

  it("подхватывает тему из localStorage", () => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.Dark);

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe(Theme.Dark);
  });

  it("переключает тему и сохраняет выбор в localStorage", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(Theme.Dark);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(Theme.Dark);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe(Theme.Light);
    expect(localStorage.getItem(LOCAL_STORAGE_THEME_KEY)).toBe(Theme.Light);
  });
});
