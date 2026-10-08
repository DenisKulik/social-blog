import { useState } from "react";
import clsx from "clsx";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import * as cls from "./Navbar.module.scss";
import { LanguageSwitcher, ThemeSwitcher } from "@/shared/ui";

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
        <Modal title={t("Войти")} open={isAuthModalOpen} onCancel={onCloseAuthModal} footer={null} centered>
          {t("Форма авторизации")}
        </Modal>
      </div>
    </nav>
  );
};
