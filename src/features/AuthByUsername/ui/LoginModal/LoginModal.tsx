import type { FC } from "react";
import { Modal } from "antd";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { LoginForm } from "../LoginForm/LoginForm";

interface Props {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: FC<Props> = ({ className, isOpen, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal
      className={clsx(className)}
      title={t("Войти")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <LoginForm onSubmit={onClose} />
    </Modal>
  );
};
