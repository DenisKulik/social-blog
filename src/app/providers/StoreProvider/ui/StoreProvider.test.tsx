import { render, screen } from "@testing-library/react";
import { StoreProvider, useAppSelector } from "@/app/providers/StoreProvider";
import type { StateSchema } from "@/app/providers/StoreProvider";

const UserViaStore = () => {
  const authData = useAppSelector((state) => state.user.authData);

  return <span data-testid="username">{authData?.username ?? "нет данных"}</span>;
};

describe("StoreProvider", () => {
  it("компоненты читают состояние одного store", () => {
    const initialState: Partial<StateSchema> = {
      user: { authData: { id: "1", username: "ivan" } },
    };

    render(
      <StoreProvider initialState={initialState}>
        <UserViaStore />
        <UserViaStore />
      </StoreProvider>,
    );

    expect(screen.getAllByTestId("username")).toHaveLength(2);
    expect(screen.getAllByTestId("username").map((node) => node.textContent)).toEqual([
      "ivan",
      "ivan",
    ]);
  });

  it("гидратит store из initialState", () => {
    const initialState: Partial<StateSchema> = {
      user: { authData: { id: "2", username: "petr" } },
    };

    render(
      <StoreProvider initialState={initialState}>
        <UserViaStore />
      </StoreProvider>,
    );

    expect(screen.getByTestId("username")).toHaveTextContent("petr");
  });

  it("создаёт новый store для каждого рендера", () => {
    const { unmount } = render(
      <StoreProvider initialState={{ user: { authData: { id: "1", username: "ivan" } } }}>
        <UserViaStore />
      </StoreProvider>,
    );

    expect(screen.getByTestId("username")).toHaveTextContent("ivan");

    unmount();

    render(
      <StoreProvider>
        <UserViaStore />
      </StoreProvider>,
    );

    expect(screen.getByTestId("username")).toHaveTextContent("нет данных");
  });
});
