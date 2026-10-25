# AGENTS.md

Инструкции для агентов и разработчиков, работающих с проектом **social-blog**.

## Проект

SPA-блог: React 19 + TypeScript 5.9, сборка — webpack 5 (`config/build/*`),
стили — SCSS Modules + Ant Design 6, состояние — Redux Toolkit 2,
роутинг — react-router-dom 7 (`HashRouter`), переводы — i18next,
UI-кит для изоляции — Storybook 10, тесты — Jest 30 (ts-jest + jsdom + Testing Library).

- Менеджер пакетов: **pnpm@10.5.2** (`packageManager` в `package.json`), Node 24 (см. `.github/workflows/`).
- Зависимости ставить только через `pnpm add`; `pnpm-lock.yaml` не править вручную.

## Команды

| Команда                                      | Что делает                                   |
| -------------------------------------------- | -------------------------------------------- |
| `pnpm start`                                 | dev-сервер webpack на порту 3000             |
| `pnpm build:prod` / `pnpm build:dev`         | сборка в `build/`                            |
| `pnpm typecheck`                             | `tsc --noEmit`                               |
| `pnpm lint` / `pnpm lint:fix`                | ESLint + Stylelint для `src/**/*.{css,scss}` |
| `pnpm format` / `pnpm format:check`          | Prettier                                     |
| `pnpm test` / `test:watch` / `test:coverage` | Jest                                         |
| `pnpm storybook` / `pnpm build-storybook`    | Storybook на 6006                            |
| **`pnpm check`**                             | `typecheck && lint && format:check && test`  |

**Перед коммитом обязательно прогнать `pnpm check`** — это же выполняет CI
(`.github/workflows/ci.yml`) на push/PR в `main`, а параллельно собирает
Storybook и прод-бандл. Push в `main` дополнительно деплоит сайт и Storybook
на GitHub Pages (`.github/workflows/deploy.yml`).

## Структура: Feature-Sliced Design

Слои сверху вниз, импорт разрешён только в пределах слоя или вниз:

```
src/
  app/       App, providers (antd, ErrorBoundary, router, StoreProvider),
             routes/RouteConfig, styles, types/global.d.ts
  pages/     MainPage, AboutPage, NotFoundPage
  widgets/   Navbar, Sidebar, PageError
  features/  (зарезервировано под бизнес-действия)
  entities/  Counter (model/, ui/)
  shared/    config (i18n, routeConfig, theme), ui (AppLink, Loader, PageLoader, ...)
```

Правила:

- Алиасы: `@/*` → `src/*`, `@test/*` → `config/jest/*` (едины для tsconfig, webpack и Jest).
- Внутри слайса — относительные импорты; между слоями — только через алиас
  (`import { AppRoutes } from "@/shared/config"`).
- **`shared` не импортирует верхние слои** — правило `no-restricted-imports`
  (`eslint.config.mjs`). Обход через `../`/`../../` запрещён.
- Публичный API слайса — только `index.ts`-баррели; наружу не выходит
  содержимое подпапок напрямую.
- Слайс/компонент делится на `model/` (RTK-слайсы, селекторы), `ui/`
  (компонент, `*.module.scss`, `*.stories.tsx`, `*.test.tsx`), `lib/`, `config/`.
- Новый маршрут регистрируется в двух местах: `shared/config/routeConfig/AppRoutes.ts`
  и `app/routes/ui/RouteConfig.tsx` (страницы подключаются через `lazy()`).

## Конвенции кода

### TypeScript

- Включены `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `verbatimModuleSyntax`, `isolatedModules` — типы импортировать инлайном:
  `import type { FC } from "react"`, `import { Link, type LinkProps } from "..."`.
- Неиспользуемые переменные/аргументы — с префиксом `_`.
- Глобали объявлены в `src/app/types/global.d.ts`: `__IS_DEV__` (DefinePlugin),
  модули `*.module.scss`, `*.svg`, картинки. CSS-модули типизированы как `any`,
  поэтому семейство `@typescript-eslint/no-unsafe-*` в проекте выключено —
  не пытаться вернуть их кастами.
- `default export` используется только для страниц (нужен `lazy()`); всё
  остальное — именованные экспорты.

### React

- Компонент — константа с деструктуризацией пропсов, `Props`/`interface` —
  отдельно над компонентом.
- Классы: `import * as cls from "./X.module.scss"`, условные — через `clsx`.
- Плагин `react-refresh/only-export-components` стоит на `warn`: если файл
  экспортирует помимо компонентов что-то (enum, конфиг), добавить в первую
  строку явный комментарий-дизейбл с причиной (см. `AppLink.tsx:1`,
  `RouteConfig.tsx:1`).
- Иконки — `@ant-design/icons`, компоненты UI — `antd`.

### SCSS / форматирование

- Имена классов: PascalCase по компоненту (`.Sidebar`, `.AppLink`),
  camelCase для модификаторов/деталей (`.collapsed`, `.navItem`).
- Порядок свойств — позиционирование → блочная модель → типографика → визуал
  (stylelint-config-recess-order); связанные декларации разделять пустой строкой.
- Prettier: 100 колонок, отступ 2, двойные кавычки, `;`, `trailingComma: all`, LF.
- Локально исправлять автоформатом: `pnpm lint:fix && pnpm format`.

### Переводы (i18next)

- Ключ — **русская строка-источник**, перевод лежит в
  `public/locales/en/translation.json` (ns `translation`); неймспейсы `main` и
  `about` заведены и пока пусты.
- В компонентах — `useTranslation()` + `t("Русский ключ")`.
- Добавляя новый текст, внести ключ одновременно в `ru` и `en`.

### Состояние (Redux Toolkit)

- Слайс и селекторы — в `entities/<Name>/model/` (`counterSlice.ts`, `selectors.ts`),
  схема состояния — `app/providers/StoreProvider/config/StateSchema.ts`.
- Диспатчить/читать только через `useAppDispatch` / `useAppSelector` из
  `@/app/providers/StoreProvider`, не через сырой `useDispatch/useSelector`.

### Тесты

- Файлы `*.test.ts(x)` лежат рядом с кодом (`roots: ["src"]`).
- Рендер с провайдерами (i18n + store + MemoryRouter) —
  `import { renderWithProviders } from "@test/renderWithProviders"`,
  переводы для тестов — `@test/testI18n`.
- Моки CSS/SVG/файлов — только в `config/jest/mocks/*.js` (CommonJS: их грузит
  `require`, ESM-синтаксис там сломает Jest).
- Проверять типы — `pnpm typecheck`, не тесты: в Jest `diagnostics: false`.
- Описания тестов — на русском; вместо снапшотов — проверки по ролям и классам
  (см. `AppLink.test.tsx`).

### Storybook

- Истории — `*.stories.tsx` рядом с компонентом, `title` вида `shared/Loader`,
  типы `import type { Meta, StoryObj } from "@storybook/react-webpack5"` +
  `satisfies Meta<typeof X>`.
- Загрузчики Storybook продублированы в `.storybook/main.ts`: меняя
  `config/build/buildLoaders.ts`, синхронизировать и его.
- Типы внутри Storybook не проверяются (`check: false`) — их даёт `pnpm typecheck`.

## Do / Don't

**Делать**

- Коммиты в формате Conventional Commits: `feat:`, `fix:`, `chore:`, `style:`,
  `test:`, `docs:` (как в истории репозитория).
- Комментарии, сообщения линтеров и тексты тестов — на русском.
- Прогонять `pnpm check` перед коммитом.

**Не делать**

- Коммитить `build/`, `coverage/`, `storybook-static/`, `node_modules/`.
- Править `pnpm-lock.yaml` вручную или менять версии pnpm/node в CI.
- Тянуть новые зависимости без явной необходимости; обходить
  `pnpm.onlyBuiltDependencies`.
- Импортировать верхние слои из `shared` или соседних слоёв напрямую.
- «Чинить» отключённые `no-unsafe-*` правила кастами.
