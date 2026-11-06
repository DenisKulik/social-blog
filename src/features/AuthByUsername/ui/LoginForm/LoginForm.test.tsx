import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@test/renderWithProviders";
import { createJsonResponse } from "@test/mockFetchResponse";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { LoginForm } from "./LoginForm";

const authUser = { id: "1", username: "ivan" };
const credentials = { username: "ivan", password: "secret" };

const renderLoginForm = (onSubmit = jest.fn()) => {
  renderWithProviders(<LoginForm onSubmit={onSubmit} />, { withRouter: false });

  return onSubmit;
};

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(await screen.findByLabelText("Имя пользователя"), credentials.username);
  await user.type(screen.getByLabelText("Пароль"), credentials.password);
};

describe("LoginForm", () => {
  const fetchMock = jest.spyOn(globalThis, "fetch");

  beforeEach(() => {
    localStorage.clear();
    fetchMock.mockReset();
  });

  afterAll(() => {
    fetchMock.mockRestore();
  });

  it("показывает поля формы и кнопку входа", async () => {
    renderLoginForm();

    expect(await screen.findByLabelText("Имя пользователя")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Войти" })).toBeInTheDocument();
  });

  it("обновляет значения полей при вводе", async () => {
    const user = userEvent.setup();

    renderLoginForm();
    await fillForm(user);

    expect(screen.getByLabelText("Имя пользователя")).toHaveValue(credentials.username);
    expect(screen.getByLabelText("Пароль")).toHaveValue(credentials.password);
  });

  it("показывает ошибки валидации для пустых полей", async () => {
    const user = userEvent.setup();

    renderLoginForm();
    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(await screen.findByText("Введите имя пользователя")).toBeInTheDocument();
    expect(screen.getByText("Введите пароль")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("отправляет форму и вызывает onSubmit при успешном входе", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(createJsonResponse(authUser));

    const onSubmit = renderLoginForm();
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Войти" }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(credentials);
    });
    expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(JSON.stringify(authUser));
  });

  it("показывает ошибку и не вызывает onSubmit, если вход не удался", async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValue(createJsonResponse({ message: "Unauthorized" }, 401));

    const onSubmit = renderLoginForm();
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(await screen.findByText("Не удалось войти")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();
  });
});
