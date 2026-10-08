import { useMemo, type ReactNode } from "react";
import { Provider } from "react-redux";
import type { StateSchema } from "../config/StateSchema";
import { createReduxStore } from "../config/store";

export interface StoreProviderProps {
  children: ReactNode;
  initialState?: Partial<StateSchema>;
}

const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  const store = useMemo(() => createReduxStore(initialState), [initialState]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
