import type { FC } from "react";
import { Button } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import clsx from "clsx";
import { Theme, useTheme } from "@/shared/config/theme";
import * as cls from "./ThemeSwitcher.module.scss";

interface Props {
  className?: string;
}

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.Dark;

  return (
    <Button
      className={clsx(cls.ThemeSwitcher, className)}
      type="text"
      onClick={toggleTheme}
      icon={isDark ? <SunFilled /> : <MoonFilled />}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    />
  );
};
