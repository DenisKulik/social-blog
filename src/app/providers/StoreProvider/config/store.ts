import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/User";
import { loginReducer } from "@/features/AuthByUsername";
import { api } from "@/shared/api";
import type { StateSchema } from "./StateSchema";

const rootReducer = combineReducers({
  user: userReducer,
  loginForm: loginReducer,
  [api.reducerPath]: api.reducer,
});

export const createReduxStore = (initialState?: Partial<StateSchema>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    ...(initialState ? { preloadedState: initialState } : {}),
  });

export type RootState = StateSchema;
export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
