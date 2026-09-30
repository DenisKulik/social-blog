import { useTranslation } from "react-i18next";
import cls from "./PageError.module.scss";
import { Button } from "antd";
import { clsx } from "clsx";

interface Props {
  className?: string;
}

export const PageError = ({ className }: Props) => {
  const { t } = useTranslation();

  const reloadPage = () => {
    location.reload();
  };

  return (
    <div className={clsx(cls.PageError, [className])}>
      <p>{t("Произошла непредвиденная ошибка")}</p>
      <Button onClick={reloadPage}>{t("Обновить страницу")}</Button>
    </div>
  );
};
