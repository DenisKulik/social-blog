import { loginActions, loginInitialState, loginReducer } from "./loginSlice";

describe("loginSlice", () => {
  it("возвращает начальное состояние", () => {
    expect(loginReducer(undefined, { type: "@@INIT" })).toEqual(loginInitialState);
  });

  it("сохраняет имя пользователя", () => {
    const state = loginReducer(loginInitialState, loginActions.setUsername("ivan"));

    expect(state).toEqual({ username: "ivan", password: "" });
  });

  it("сохраняет пароль", () => {
    const state = loginReducer(loginInitialState, loginActions.setPassword("secret"));

    expect(state).toEqual({ username: "", password: "secret" });
  });

  it("перезаписывает предыдущие значения", () => {
    const filled = { username: "ivan", password: "secret" };

    const withNewUsername = loginReducer(filled, loginActions.setUsername("petr"));
    const withNewPassword = loginReducer(withNewUsername, loginActions.setPassword("qwerty"));

    expect(withNewPassword).toEqual({ username: "petr", password: "qwerty" });
    expect(filled).toEqual({ username: "ivan", password: "secret" });
  });
});
