import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { testI18n } from "./testI18n";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  /** Пропустить MemoryRouter для компонентов без роутера. */
  withRouter?: boolean;
}

/**
 * render с провайдерами, которые есть почти в каждом компоненте:
 * i18next и роутер. Без них react-i18next уходит в Suspense,
 * а react-router бросает ошибку на useLocation вне контекста.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { withRouter = true, ...options }: RenderWithProvidersOptions = {},
): RenderResult =>
  render(ui, {
    ...options,
    wrapper: ({ children }) => (
      <I18nextProvider i18n={testI18n}>
        {withRouter ? <MemoryRouter>{children}</MemoryRouter> : children}
      </I18nextProvider>
    ),
  });
