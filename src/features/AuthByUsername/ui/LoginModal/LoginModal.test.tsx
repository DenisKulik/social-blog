import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@test/renderWithProviders";
import { createJsonResponse } from "@test/mockFetchResponse";
import { LoginModal } from "./LoginModal";

const authUser = { id: "1", username: "ivan" };
const credentials = { username: "ivan", password: "secret" };

describe("LoginModal", () => {
  const fetchMock = jest.spyOn(globalThis, "fetch");

  beforeEach(() => {
    localStorage.clear();
    fetchMock.mockReset();
  });

  afterAll(() => {
    fetchMock.mockRestore();
  });

  it("не показывает форму, когда модалка закрыта", () => {
    renderWithProviders(<LoginModal isOpen={false} onClose={jest.fn()} />, {
      withRouter: false,
    });

    expect(screen.queryByLabelText("Имя пользователя")).not.toBeInTheDocument();
  });

  it("показывает заголовок и форму, когда модалка открыта", async () => {
    renderWithProviders(<LoginModal isOpen onClose={jest.fn()} />, { withRouter: false });

    const dialog = await screen.findByRole("dialog", { name: "Войти" });

    expect(within(dialog).getByLabelText("Имя пользователя")).toBeInTheDocument();
    expect(within(dialog).getByLabelText("Пароль")).toBeInTheDocument();
  });

  it("вызывает onClose при закрытии модалки", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    renderWithProviders(<LoginModal isOpen onClose={onClose} />, { withRouter: false });

    const dialog = await screen.findByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("закрывает модалку после успешного входа", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(createJsonResponse(authUser));

    const onClose = jest.fn();
    renderWithProviders(<LoginModal isOpen onClose={onClose} />, { withRouter: false });

    const dialog = await screen.findByRole("dialog");
    await user.type(within(dialog).getByLabelText("Имя пользователя"), credentials.username);
    await user.type(within(dialog).getByLabelText("Пароль"), credentials.password);
    await user.click(within(dialog).getByRole("button", { name: "Войти" }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });
});
