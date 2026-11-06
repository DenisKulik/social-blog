import type { StateSchema } from "@/app/providers";
import { loginInitialState } from "../../slice/loginSlice";

export const getLoginState = (state: StateSchema) => state.loginForm ?? loginInitialState;
