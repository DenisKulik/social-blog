import { Button } from "antd";
import { counterActions } from "../model/counterSlice";
import { selectCounterValue } from "../model/selectors";
import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider/lib/hooks";

export const Counter = () => {
  const value = useAppSelector(selectCounterValue);
  const dispatch = useAppDispatch();

  return (
    <div>
      <span data-testid="counter-value">{value}</span>
      <Button onClick={() => dispatch(counterActions.increment())}>+</Button>
      <Button onClick={() => dispatch(counterActions.decrement())}>-</Button>
    </div>
  );
};
