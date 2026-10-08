import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "@/entities/Counter";
import type { StateSchema } from "./StateSchema";

const rootReducer = combineReducers({
  counter: counterReducer,
});

export const createReduxStore = (initialState?: Partial<StateSchema>) =>
  configureStore({
    reducer: rootReducer,
    ...(initialState ? { preloadedState: initialState } : {}),
  });

export type RootState = StateSchema;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
