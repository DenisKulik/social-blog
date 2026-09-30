import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppLink, AppLinkTheme } from "./AppLink";

const renderAppLink = (ui: React.ReactElement) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("AppLink", () => {
  it("рендерит переданный текст как ссылку", () => {
    renderAppLink(<AppLink to="/about">О проекте</AppLink>);

    expect(screen.getByRole("link", { name: "О проекте" })).toHaveAttribute(
      "href",
      "/about",
    );
  });

  it("по умолчанию применяет primary-тему", () => {
    renderAppLink(<AppLink to="/">Главная</AppLink>);

    expect(screen.getByRole("link")).toHaveClass("AppLink", "primary");
  });

  it("переключается на secondary-тему по переданному theme", () => {
    renderAppLink(
      <AppLink to="/" theme={AppLinkTheme.SECONDARY}>
        Помощь
      </AppLink>,
    );

    expect(screen.getByRole("link")).toHaveClass("AppLink", "secondary");
    expect(screen.getByRole("link")).not.toHaveClass("primary");
  });

  it("мержит переданный className, не теряя классы темы", () => {
    renderAppLink(
      <AppLink to="/" className="extra">
        Обо мне
      </AppLink>,
    );

    expect(screen.getByRole("link")).toHaveClass("AppLink", "primary", "extra");
  });
});
