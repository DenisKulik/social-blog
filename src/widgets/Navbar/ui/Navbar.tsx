import clsx from "clsx";
import { useTranslation } from "react-i18next";
import * as cls from "./Navbar.module.scss";
import { AppRoutes } from "@/shared/config";
import { AppLink, LanguageSwitcher } from "@/shared/ui";

interface Props {
  className?: string;
}

export const Navbar = ({ className }: Props) => {
  const { t } = useTranslation();

  return (
    <nav className={clsx(cls.navbar, className)}>
      <div className={cls.links}>
        <AppLink to={AppRoutes.ABOUT} className={cls.mainLink}>
          {t("О нас")}
        </AppLink>
        <AppLink to={AppRoutes.MAIN} className={cls.mainLink}>
          {t("Главная страница")}
        </AppLink>
        <LanguageSwitcher className={cls.languageSwitcher} />
      </div>
    </nav>
  );
};
