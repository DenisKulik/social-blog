import type { FC } from "react";
import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";
import * as cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface Props extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
}

export const AppLink: FC<Props> = (props) => {
  const {
    to,
    className,
    children,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  } = props;

  return (
    <Link
      to={to}
      className={clsx(cls.AppLink, cls[theme], className)}
      {...otherProps}
    >
      {children}
    </Link>
  );
};
