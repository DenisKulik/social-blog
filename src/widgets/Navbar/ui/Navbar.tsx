import clsx from "clsx";
import * as cls from "./Navbar.module.scss";
import { AppRoutes } from "@/shared/config";
import { AppLink } from "@/shared/ui/AppLink/AppLink";

interface Props {
  className?: string;
}

export const Navbar = ({ className }: Props) => {
  return (
    <nav className={clsx(cls.navbar, className)}>
      <div className={cls.links}>
        <AppLink to={AppRoutes.ABOUT} className={cls.mainLink}>
          About
        </AppLink>
        <AppLink to={AppRoutes.MAIN} className={cls.mainLink}>
          Main
        </AppLink>
      </div>
    </nav>
  );
};
