import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Изолированный экземпляр i18next для Storybook: без http-бэкенда и
// language detector, поэтому init() завершается синхронно и компоненты
// не уходят в Suspense. Ключи переводов и есть значения — словарём
// в файле-превью пользуется только LanguageSwitcher для демонстрации.
export const storybookI18n = i18next.createInstance();

void storybookI18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  initAsync: false,
  resources: {
    ru: { translation: {} },
    en: { translation: {} },
  },
  interpolation: { escapeValue: false },
});
