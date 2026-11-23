import type { ProfileSchema } from "@/entities/Profile";
import type { UserSchema } from "@/entities/User";
import type { LoginSchema } from "@/features/AuthByUsername";
import type { api } from "@/shared/api";

export interface StateSchema {
  user: UserSchema;
  profile: ProfileSchema;
  loginForm?: LoginSchema;
  api: ReturnType<typeof api.reducer>;
}

export type StateSchemaKey = keyof StateSchema;
