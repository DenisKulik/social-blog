import { useTranslation } from "react-i18next";
import * as cls from "./NotFoundPage.module.scss";
import { clsx } from "clsx";

interface Props {
  className?: string;
}

const NotFoundPage = ({ className }: Props) => {
  const { t } = useTranslation();

  return <div className={clsx(cls.NotFoundPage, [className])}>{t("Страница не найдена")}</div>;
};

export default NotFoundPage;
