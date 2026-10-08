import { counterActions, counterReducer } from "./counterSlice";

describe("counterSlice", () => {
  it("инкрементирует value на 1", () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 });
  });

  it("декрементирует value на 1", () => {
    expect(counterReducer(undefined, counterActions.decrement())).toEqual({ value: -1 });
  });

  it("устанавливает значение через setValue", () => {
    expect(counterReducer(undefined, counterActions.setValue(42))).toEqual({ value: 42 });
  });
});
