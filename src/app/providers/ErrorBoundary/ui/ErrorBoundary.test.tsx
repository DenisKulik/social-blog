import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { BugButton } from "./BugButton";
import ErrorBoundary from "./ErrorBoundary";

const ERROR_MESSAGE = "Что-то пошло не так";
const ERROR_PAGE_TEXT = "Произошла непредвиденная ошибка";
const RELOAD_BUTTON_TEXT = "Обновить страницу";

const thrownError = new Error(ERROR_MESSAGE);

const Thrower = () => {
  throw thrownError;
};

const renderWithBoundary = (children: ReactNode) =>
  render(<ErrorBoundary>{children}</ErrorBoundary>);

describe("ErrorBoundary", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("рендерит children, пока ошибка не поймана", () => {
    renderWithBoundary(<p>Контент</p>);

    expect(screen.getByText("Контент")).toBeInTheDocument();
    expect(screen.queryByText(ERROR_PAGE_TEXT)).not.toBeInTheDocument();
  });

  it("показывает PageError вместо children, если потомок бросил ошибку", () => {
    renderWithBoundary(<Thrower />);

    expect(screen.getByText(ERROR_PAGE_TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: RELOAD_BUTTON_TEXT }),
    ).toBeInTheDocument();
  });

  it("логирует ошибку и информацию о компоненте", () => {
    renderWithBoundary(<Thrower />);

    expect(console.log).toHaveBeenCalledWith(thrownError, expect.anything());
  });

  it("не сбрасывает состояние ошибки при повторном рендере", () => {
    const { rerender } = renderWithBoundary(<Thrower />);

    rerender(
      <ErrorBoundary>
        <p>Контент</p>
      </ErrorBoundary>,
    );

    expect(screen.queryByText("Контент")).not.toBeInTheDocument();
    expect(screen.getByText(ERROR_PAGE_TEXT)).toBeInTheDocument();
  });
});

describe("ErrorBoundary с BugButton", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("до нажатия показывает только кнопку", () => {
    renderWithBoundary(<BugButton />);

    expect(
      screen.getByRole("button", { name: "throw error" }),
    ).toBeInTheDocument();
    expect(screen.queryByText(ERROR_PAGE_TEXT)).not.toBeInTheDocument();
  });

  it("после нажатия ловит ошибку и показывает PageError", async () => {
    const user = userEvent.setup();

    renderWithBoundary(<BugButton />);

    await user.click(screen.getByRole("button", { name: "throw error" }));

    expect(screen.getByText(ERROR_PAGE_TEXT)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: RELOAD_BUTTON_TEXT }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "throw error" }),
    ).not.toBeInTheDocument();
  });
});
