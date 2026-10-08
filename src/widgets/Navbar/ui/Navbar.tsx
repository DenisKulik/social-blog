import clsx from "clsx";
import * as cls from "./Navbar.module.scss";
import { LanguageSwitcher, ThemeSwitcher } from "@/shared/ui";

interface Props {
  className?: string;
}

export const Navbar = ({ className }: Props) => {
  return (
    <nav className={clsx(cls.navbar, className)}>
      <div className={cls.switchers}>
        <LanguageSwitcher />
        <ThemeSwitcher className={cls.themeSwitcher} />
      </div>
    </nav>
  );
};
