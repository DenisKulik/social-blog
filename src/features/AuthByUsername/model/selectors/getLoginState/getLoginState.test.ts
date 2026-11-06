import type { StateSchema } from "@/app/providers";
import { loginInitialState } from "../../slice/loginSlice";
import { getLoginState } from "./getLoginState";

describe("getLoginState", () => {
  it("возвращает loginForm из состояния", () => {
    const loginForm = { username: "ivan", password: "secret" };

    expect(getLoginState({ loginForm } as StateSchema)).toBe(loginForm);
  });

  it("возвращает начальное состояние, пока редьюсер не подключён", () => {
    expect(getLoginState({} as StateSchema)).toBe(loginInitialState);
  });
});
