import type { UserSchema } from "@/entities/User";

export interface StateSchema {
  user: UserSchema;
}

export type StateSchemaKey = keyof StateSchema;
