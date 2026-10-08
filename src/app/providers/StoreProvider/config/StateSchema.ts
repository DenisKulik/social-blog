import type { CounterSchema } from "@/entities/Counter";

export interface StateSchema {
  counter: CounterSchema;
}

export type StateSchemaKey = keyof StateSchema;
