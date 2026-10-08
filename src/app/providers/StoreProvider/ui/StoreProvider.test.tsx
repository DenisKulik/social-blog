import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { counterActions, selectCounterValue } from "@/entities/Counter";
import { StoreProvider, useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider";
import type { StateSchema } from "@/app/providers/StoreProvider";

const CounterViaStore = () => {
  const value = useAppSelector(selectCounterValue);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span data-testid="value">{value}</span>
      <button onClick={() => dispatch(counterActions.increment())}>+</button>
    </div>
  );
};

describe("StoreProvider", () => {
  it("накапливает состояние внутри одного store", async () => {
    const user = userEvent.setup();

    render(
      <StoreProvider>
        <CounterViaStore />
        <CounterViaStore />
      </StoreProvider>,
    );

    expect(screen.getAllByTestId("value")).toHaveLength(2);
    expect(screen.getAllByTestId("value").map((node) => node.textContent)).toEqual(["0", "0"]);

    await user.click(screen.getAllByRole("button")[0]!);

    expect(screen.getAllByTestId("value").map((node) => node.textContent)).toEqual(["1", "1"]);
  });

  it("гидратит store из initialState", () => {
    const initialState: Partial<StateSchema> = {
      counter: { value: 5 },
    };

    render(
      <StoreProvider initialState={initialState}>
        <CounterViaStore />
      </StoreProvider>,
    );

    expect(screen.getByTestId("value")).toHaveTextContent("5");
  });
});
