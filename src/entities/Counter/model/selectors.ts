import { createSelector } from "@reduxjs/toolkit";
import type { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema";

export const selectCounter = (state: StateSchema) => state.counter;

export const selectCounterValue = createSelector(selectCounter, (counter) => counter.value);
