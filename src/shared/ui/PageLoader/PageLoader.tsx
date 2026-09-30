import type { FC } from "react";
import { clsx } from "clsx";
import { Loader } from "../Loader";
import * as cls from "./PageLoader.module.scss";

interface Props {
  // Та же задержка, что у Loader: не показывать индикатор на быстрых
  // переходах, иначе он моргает при каждом клике по меню.
  delay?: number;
  className?: string;
}

/**
 * Лоадер на всю область страницы. Сам Loader размеров не задаёт, поэтому
 * в flex-контейнере схлопывается до габаритов спиннера — обёртка
 * растягивает его на весь свободный контент и центрирует по обеим осям.
 */
export const PageLoader: FC<Props> = ({ delay, className }) => {
  return (
    <div className={clsx(cls.PageLoader, className)}>
      {/* exactOptionalPropertyTypes не даёт передать delay={undefined}. */}
      <Loader {...(delay === undefined ? {} : { delay })} />
    </div>
  );
};
