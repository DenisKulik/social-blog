import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/User";
import type { StateSchema } from "./StateSchema";

const rootReducer = combineReducers({
  user: userReducer,
});

export const createReduxStore = (initialState?: Partial<StateSchema>) =>
  configureStore({
    reducer: rootReducer,
    ...(initialState ? { preloadedState: initialState } : {}),
  });

export type RootState = StateSchema;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
