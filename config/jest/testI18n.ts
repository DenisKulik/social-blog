import i18next from "i18next";
import { initReactI18next } from "react-i18next";

// Тестовый экземпляр i18next вместо боевого: без http-бэкенда и
// language detector, поэтому init() завершается синхронно и компоненты
// не уходят в Suspense. Ключи переводов и есть значения — словарь пуст.
export const testI18n = i18next.createInstance();

void testI18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",
  initAsync: false,
  resources: {
    ru: { translation: {} },
    en: { translation: {} },
  },
  interpolation: { escapeValue: false },
});
