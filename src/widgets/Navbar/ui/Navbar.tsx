import { useState } from "react";
import clsx from "clsx";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import * as cls from "./Navbar.module.scss";
import { LanguageSwitcher, ThemeSwitcher } from "@/shared/ui";
import { LoginModal } from "@/features/AuthByUsername";

interface Props {
  className?: string;
}

export const Navbar = ({ className }: Props) => {
  const { t } = useTranslation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const onOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const onCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <nav className={clsx(cls.navbar, className)}>
      <div className={cls.switchers}>
        <LanguageSwitcher />
        <ThemeSwitcher className={cls.themeSwitcher} />
        <Button type="primary" onClick={onOpenAuthModal}>
          {t("Войти")}
        </Button>
        <LoginModal isOpen={isAuthModalOpen} onClose={onCloseAuthModal} />
      </div>
    </nav>
  );
};
