import { TextDecoder, TextEncoder } from "node:util";

// Полифилы окружения. Подключается через setupFiles, а не
// setupFilesAfterEnv: файл выполняется до того, как jest подгрузит
// тестовый модуль, иначе react-router v7 падает на TextEncoder.

// jsdom не отдаёт TextEncoder/TextDecoder, а react-router v7 и
// @testing-library на них опираются.
globalThis.TextEncoder ??= TextEncoder;
globalThis.TextDecoder ??= TextDecoder as typeof globalThis.TextDecoder;

// antd через cssinjs читает matchMedia при выборе темы и локали,
// а responsive-компоненты — ResizeObserver. В jsdom их нет.
globalThis.matchMedia ??= (query: string): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as MediaQueryList;

globalThis.ResizeObserver ??= class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// i18next-http-backend тянет переводы из /locales. В тестах переводы
// задаются напрямую, поэтому сеть не нужна.
globalThis.fetch ??= () =>
  Promise.reject(new Error("fetch is not available in tests"));
