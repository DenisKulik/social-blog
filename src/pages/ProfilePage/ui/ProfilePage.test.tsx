import { screen } from "@testing-library/react";
import { renderWithProviders } from "@test/renderWithProviders";
import ProfilePage from "./ProfilePage";

describe("ProfilePage", () => {
  it("просит войти в систему, если пользователь не авторизован", () => {
    renderWithProviders(<ProfilePage />);

    expect(
      screen.getByText("Войдите в систему, чтобы просматривать профиль пользователя"),
    ).toBeInTheDocument();
  });
});
