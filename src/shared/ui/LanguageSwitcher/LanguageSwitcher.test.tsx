import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@test/renderWithProviders";
import { testI18n } from "@test/testI18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

const SWITCH_LABEL = "Переключить язык";
const CURRENT_LANGUAGE = "Русский";
const OTHER_LANGUAGE = "English";

const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: SWITCH_LABEL }));
};

describe("LanguageSwitcher", () => {
  beforeEach(async () => {
    await testI18n.changeLanguage("ru");
  });

  it("показывает имя текущего языка", () => {
    renderWithProviders(<LanguageSwitcher />, { withRouter: false });

    expect(screen.getByRole("button", { name: SWITCH_LABEL })).toHaveTextContent(CURRENT_LANGUAGE);
  });

  it("мержит переданный className", () => {
    renderWithProviders(<LanguageSwitcher className="extra" />, {
      withRouter: false,
    });

    expect(screen.getByRole("button")).toHaveClass("LanguageSwitcher", "extra");
  });

  it("по клику открывает меню со всеми поддерживаемыми языками", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher />, { withRouter: false });
    await openMenu(user);

    expect(await screen.findByRole("menuitem", { name: CURRENT_LANGUAGE })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: OTHER_LANGUAGE })).toBeInTheDocument();
  });

  it("отмечает текущий язык выбранным", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher />, { withRouter: false });
    await openMenu(user);

    const current = await screen.findByRole("menuitem", { name: CURRENT_LANGUAGE });

    expect(current).toHaveClass("ant-dropdown-menu-item-selected");
  });

  it("переключает язык на выбранный в меню", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LanguageSwitcher />, { withRouter: false });
    await openMenu(user);

    await user.click(await screen.findByRole("menuitem", { name: OTHER_LANGUAGE }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: SWITCH_LABEL })).toHaveTextContent(OTHER_LANGUAGE);
    });
  });

  it("не меняет язык, если выбран текущий", async () => {
    const user = userEvent.setup();
    const changeLanguage = jest.spyOn(testI18n, "changeLanguage");

    renderWithProviders(<LanguageSwitcher />, { withRouter: false });
    await openMenu(user);

    await user.click(await screen.findByRole("menuitem", { name: CURRENT_LANGUAGE }));

    expect(changeLanguage).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: SWITCH_LABEL })).toHaveTextContent(CURRENT_LANGUAGE);
  });
});
