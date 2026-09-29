import type { FC } from "react";
import { Button } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import clsx from "clsx";
import { Theme, useTheme } from "@/app/providers";

interface Props {
  className?: string;
}

export const ThemeSwitcher: FC<Props> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.Dark;

  return (
    <Button
      className={clsx(className)}
      onClick={toggleTheme}
      icon={isDark ? <SunFilled /> : <MoonFilled />}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    />
  );
};
