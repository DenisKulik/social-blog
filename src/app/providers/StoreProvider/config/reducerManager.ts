import { combineReducers, type Reducer, type UnknownAction } from "@reduxjs/toolkit";
import type { StateSchema, StateSchemaKey } from "./StateSchema";

type ReducerMap = Record<string, Reducer>;

export interface ReducerManager {
  getReducerMap: () => ReducerMap;
  reduce: (state: Partial<StateSchema> | undefined, action: UnknownAction) => StateSchema;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

/**
 * Управляет динамическими редьюсерами: позволяет подключать их к store
 * по мере загрузки фич и отключать после размонтирования.
 */
export const createReducerManager = (initialReducers: ReducerMap): ReducerManager => {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);
  let keysToRemove: StateSchemaKey[] = [];

  return {
    getReducerMap: () => reducers,

    reduce: (state, action) => {
      if (keysToRemove.length > 0) {
        state = { ...state };
        for (const key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }

      return combinedReducer(state, action) as StateSchema;
    },

    add: (key, reducer) => {
      if (reducers[key]) {
        return;
      }

      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },

    remove: (key) => {
      if (!reducers[key]) {
        return;
      }

      delete reducers[key];
      keysToRemove.push(key);
      combinedReducer = combineReducers(reducers);
    },
  };
};
