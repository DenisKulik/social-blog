import type { FC } from "react";
import { Button, Dropdown, type MenuProps } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/shared/config";
import * as cls from "./LanguageSwitcher.module.scss";

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: "English",
  ru: "Русский",
};

interface Props {
  className?: string;
}

export const LanguageSwitcher: FC<Props> = ({ className }) => {
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.resolvedLanguage ?? i18n.language) as SupportedLanguage;

  const items: MenuProps["items"] = SUPPORTED_LANGUAGES.map((language) => ({
    key: language,
    label: LANGUAGE_NAMES[language],
  }));

  const onSelect: MenuProps["onClick"] = ({ key }) => {
    if (key !== currentLanguage) {
      void i18n.changeLanguage(key);
    }
  };

  const label = t("Переключить язык");

  return (
    <Dropdown
      trigger={["click"]}
      menu={{ items, onClick: onSelect, selectedKeys: [currentLanguage] }}
    >
      <Button
        className={clsx(cls.LanguageSwitcher, className)}
        type="text"
        icon={<GlobalOutlined />}
        aria-label={label}
        title={label}
      >
        {LANGUAGE_NAMES[currentLanguage]}
      </Button>
    </Dropdown>
  );
};
