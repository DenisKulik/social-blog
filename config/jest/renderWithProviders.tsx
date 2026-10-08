import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { StoreProvider } from "@/app/providers/StoreProvider";
import type { StateSchema } from "@/app/providers/StoreProvider";
import { testI18n } from "./testI18n";

interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  /** Пропустить MemoryRouter для компонентов без роутера. */
  withRouter?: boolean;
  /** Начальное состояние store (например, для данных в useSelector). */
  initialState?: Partial<StateSchema>;
}

/**
 * render с провайдерами, которые есть почти в каждом компоненте:
 * i18next, store и роутер. Без них react-i18next уходит в Suspense,
 * а react-router бросает ошибку на useLocation вне контекста.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { withRouter = true, initialState, ...options }: RenderWithProvidersOptions = {},
): RenderResult =>
  render(ui, {
    ...options,
    wrapper: ({ children }) => (
      <I18nextProvider i18n={testI18n}>
        <StoreProvider {...(initialState ? { initialState } : {})}>
          {withRouter ? <MemoryRouter>{children}</MemoryRouter> : children}
        </StoreProvider>
      </I18nextProvider>
    ),
  });
