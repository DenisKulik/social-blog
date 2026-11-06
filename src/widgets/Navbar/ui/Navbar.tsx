import { lazy, Suspense, useState } from "react";
import clsx from "clsx";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import * as cls from "./Navbar.module.scss";
import { LanguageSwitcher, PageLoader, ThemeSwitcher } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider/lib/hooks";
import { getUserAuthData } from "@/entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { userActions } from "@/entities/User/model/slice/userSlice";

const LoginModal = lazy(() =>
  import("@/features/AuthByUsername").then((module) => ({ default: module.LoginModal })),
);

interface Props {
  className?: string;
}

export const Navbar = ({ className }: Props) => {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const authData = useAppSelector(getUserAuthData);
  const dispatch = useAppDispatch();

  const onOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const onCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const onLogout = () => {
    dispatch(userActions.logout());
  };

  if (authData) {
    return (
      <nav className={clsx(cls.navbar, className)}>
        <div className={cls.switchers}>
          <LanguageSwitcher />
          <ThemeSwitcher className={cls.themeSwitcher} />
          <Button type="primary" onClick={onLogout}>
            {t("Выйти")}
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className={clsx(cls.navbar, className)}>
      <div className={cls.switchers}>
        <LanguageSwitcher />
        <ThemeSwitcher className={cls.themeSwitcher} />
        <Button type="primary" onClick={onOpenAuthModal}>
          {t("Войти")}
        </Button>
        <Suspense fallback={<PageLoader delay={200} />}>
          <LoginModal isOpen={isAuthModalOpen} onClose={onCloseAuthModal} />
        </Suspense>
      </div>
    </nav>
  );
};
