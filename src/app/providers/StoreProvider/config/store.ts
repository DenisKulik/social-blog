import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/entities/User";
import { api } from "@/shared/api";
import { createReducerManager } from "./reducerManager";
import type { StateSchema } from "./StateSchema";

const staticReducers = {
  user: userReducer,
  [api.reducerPath]: api.reducer,
};

export const createReduxStore = (initialState?: Partial<StateSchema>) => {
  const reducerManager = createReducerManager(staticReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    ...(initialState ? { preloadedState: initialState } : {}),
  });

  return Object.assign(store, { reducerManager });
};

export type AppStore = ReturnType<typeof createReduxStore>;
export type RootState = StateSchema;
export type AppDispatch = AppStore["dispatch"];
