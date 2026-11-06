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

// @rc-component/form использует MessageChannel для отложенных задач формы,
// а jsdom его не предоставляет. Достаточно setTimeout-очереди.
globalThis.MessageChannel ??= class MessageChannel {
  port1 = { onmessage: null as ((event: MessageEvent) => void) | null };

  port2 = {
    postMessage: () => {
      setTimeout(() => this.port1.onmessage?.({ data: null } as MessageEvent), 0);
    },
  };
} as unknown as typeof globalThis.MessageChannel;

// fetchBaseQuery создаёт Request перед вызовом fetch, а jsdom его не даёт.
globalThis.Request ??= class Request {
  url: string;
  method: string;
  headers: Headers;
  body: BodyInit | null;

  constructor(input: string | URL, init: RequestInit = {}) {
    this.url = String(input);
    this.method = init.method ?? "GET";
    this.headers = new Headers(init.headers);
    this.body = init.body ?? null;
  }
} as unknown as typeof globalThis.Request;

// i18next-http-backend тянет переводы из /locales. В тестах переводы
// задаются напрямую, поэтому сеть не нужна.
globalThis.fetch ??= () => Promise.reject(new Error("fetch is not available in tests"));

// DefinePlugin в webpack подставляет эту константу на этапе сборки,
// в Jest её нет — объявляем глобально, иначе любой модуль, импортирующий
// shared/config, падает на ReferenceError.
(globalThis as typeof globalThis & { __IS_DEV__?: boolean }).__IS_DEV__ ??= false;
