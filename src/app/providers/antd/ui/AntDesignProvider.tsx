import type { FC, ReactNode } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import { useTranslation } from "react-i18next";
import { Theme, useTheme } from "@/shared/config/theme";

const ANT_DESIGN_LOCALES: Record<string, typeof enUS> = {
  en: enUS,
  ru: ruRU,
};

interface AntDesignProviderProps {
  children: ReactNode;
}

export const AntDesignProvider: FC<AntDesignProviderProps> = ({ children }) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage ?? i18n.language;

  return (
    <ConfigProvider
      locale={ANT_DESIGN_LOCALES[language] ?? enUS}
      theme={{
        algorithm: theme === Theme.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
};
