import { useMemo, type CSSProperties } from "react";
import { theme } from "antd";

export const useThemeVariables = (): CSSProperties => {
  const { token } = theme.useToken();

  return useMemo(
    () =>
      ({
        "--bg-color": token.colorBgLayout,
        "--surface-color": token.colorBgContainer,
        "--text-color": token.colorText,
        "--text-secondary-color": token.colorTextSecondary,
        "--primary-color": token.colorPrimary,
        "--divider-color": token.colorBorderSecondary,
        "--border-color": token.colorBorder,
        "--fill-hover-color": token.colorFillTertiary,
      }) as CSSProperties,
    [token],
  );
};
