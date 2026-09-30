import type { FC } from "react";
import { Spin } from "antd";
import clsx from "clsx";
import * as cls from "./Loader.module.scss";

interface Props {
  className?: string;
  // Показывать индикатор только если грузится дольше указанного времени.
  // Без этого короткие переходы между страницами моргают спиннером.
  delay?: number;
  size?: "small" | "default" | "large";
}

export const Loader: FC<Props> = ({ className, delay, size = "large" }) => {
  return (
    <div className={clsx(cls.Loader, className)}>
      {/* exactOptionalPropertyTypes не даёт передать delay={undefined},
          поэтому optional-пропы прокидываем только когда они заданы. */}
      <Spin {...(delay === undefined ? {} : { delay })} size={size} />
    </div>
  );
};
