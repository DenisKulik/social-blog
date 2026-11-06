import { useEffect, type ReactNode } from "react";
import { useStore } from "react-redux";
import type { Reducer } from "@reduxjs/toolkit";
import type { AppStore } from "../config/store";
import type { StateSchemaKey } from "../config/StateSchema";
import { useAppDispatch } from "../lib/hooks";

interface Props {
  reducers: Partial<Record<StateSchemaKey, Reducer>>;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

/**
 * Подключает редьюсеры фичи к store на время жизни компонента.
 * Селекторы асинхронных редьюсеров должны иметь начальное значение
 * на случай первого рендера до выполнения эффекта.
 */
export const DynamicModuleLoader = ({ reducers, removeAfterUnmount = true, children }: Props) => {
  const store = useStore() as AppStore;
  const dispatch = useAppDispatch();

  useEffect(() => {
    Object.entries(reducers).forEach(([key, reducer]) => {
      if (!reducer) {
        return;
      }

      store.reducerManager.add(key as StateSchemaKey, reducer);
      dispatch({ type: `@@INIT ${key}` });
    });

    return () => {
      if (!removeAfterUnmount) {
        return;
      }

      Object.keys(reducers).forEach((key) => {
        store.reducerManager.remove(key as StateSchemaKey);
        dispatch({ type: `@@REMOVE ${key}` });
      });
    };
  }, [dispatch, reducers, removeAfterUnmount, store]);

  return <>{children}</>;
};
