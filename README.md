# social-blog

Одностраничное приложение-блог на React. Проект **в самом начале разработки**: сейчас
собрана каркасная оболочка приложения, навигация, темы, переводы и инфраструктура
(сборка, тесты, линтеры, Storybook, CI) — наполнение появится позже.

- Сайт: <https://deniskulik.github.io/social-blog/>
- Storybook: <https://deniskulik.github.io/social-blog/storybook/>

## Что уже есть

- Шапка с переключателем языка и темы, кнопка «Войти» с модальным окном (заглушка).
- Боковое меню с навигацией по страницам и возможностью свернуть.
- Страницы: главная, «О проекте», 404 — маршруты подключаются лениво (`lazy`).
- Счётчик на Redux Toolkit как пример работы со стором.
- Светлая/тёмная тема и переводы ru/en.
- Компоненты `shared/ui` с историями Storybook и тестами.

## Технологии

| Область          | Стек                                              |
| ---------------- | ------------------------------------------------- |
| Язык и фреймворк | TypeScript 5.9, React 19                          |
| Сборка           | webpack 5 (Babel + ts-loader, SCSS Modules, SVGR) |
| UI               | Ant Design 6, `@ant-design/icons`                 |
| Состояние        | Redux Toolkit 2, react-redux 9                    |
| Роутинг          | react-router-dom 7 (`HashRouter`)                 |
| Переводы         | i18next, react-i18next                            |
| Тесты            | Jest 30, ts-jest, Testing Library                 |
| Код-стайл        | ESLint 10, Stylelint 17, Prettier                 |
| Компоненты       | Storybook 10                                      |
| Пакеты           | pnpm 10 (Node 24)                                 |

## Структура

Архитектура — Feature-Sliced Design, слои сверху вниз:

```
src/
  app/       приложение, провайдеры (роутер, стор, antd, ErrorBoundary)
  pages/     страницы (MainPage, AboutPage, NotFoundPage)
  widgets/   крупные блоки (Navbar, Sidebar, PageError)
  features/  бизнес-действия (пока пусто)
  entities/  доменные модели (Counter)
  shared/    переиспользуемые конфиги и UI (i18n, тема, роуты, AppLink, Loader)
```

Правила слоёв, алиасы и конвенции кода описаны в [AGENTS.md](./AGENTS.md).

## Установка и запуск

```bash
pnpm install
pnpm start        # dev-сервер на http://localhost:3000
```

## Основные команды

| Команда                             | Что делает                         |
| ----------------------------------- | ---------------------------------- |
| `pnpm start`                        | dev-сервер с горячей перезагрузкой |
| `pnpm build:prod`                   | продакшен-сборка в `build/`        |
| `pnpm typecheck`                    | проверка типов (`tsc --noEmit`)    |
| `pnpm lint` / `pnpm lint:fix`       | ESLint + Stylelint                 |
| `pnpm format` / `pnpm format:check` | Prettier                           |
| `pnpm test` / `pnpm test:coverage`  | Jest                               |
| `pnpm storybook`                    | Storybook на порту 6006            |
| **`pnpm check`**                    | typecheck + lint + формат + тесты  |

Перед коммитом прогоняйте `pnpm check` — ровно эта проверка выполняется в CI.

## Сборка и деплой

```bash
pnpm build:prod        # результат в build/
pnpm build-storybook   # результат в storybook-static/
```

При пуше в `main` GitHub Actions собирает проект, прогоняет `pnpm check` и
публикует сайт вместе со Storybook на GitHub Pages
(`.github/workflows/ci.yml`, `.github/workflows/deploy.yml`).

## Документация для разработчиков

- [AGENTS.md](./AGENTS.md) — команды, структура FSD, конвенции TypeScript/React/SCSS,
  правила тестов, переводов и Storybook.

## Лицензия

ISC
