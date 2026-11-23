import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";
import type { Profile } from "../types/profile";
import { profileInitialState, profileReducer } from "./profileSlice";

const profile: Profile = {
  first: "Elon",
  lastname: "Musk",
  age: 55,
  currency: "RUB",
  country: "Russia",
  city: "Moscow",
  username: "admin",
  avatar: "avatar.jpg",
};

describe("profileSlice", () => {
  it("возвращает начальное состояние", () => {
    expect(profileReducer(undefined, { type: "@@INIT" })).toEqual(profileInitialState);
  });

  it("ставит isLoading при загрузке", () => {
    const state = profileReducer(
      profileInitialState,
      fetchProfileData.pending("requestId", undefined),
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it("сохраняет данные при успешной загрузке", () => {
    const state = profileReducer(
      profileInitialState,
      fetchProfileData.fulfilled(profile, "requestId", undefined),
    );

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(profile);
  });

  it("сохраняет ошибку при неудачной загрузке", () => {
    const state = profileReducer(
      profileInitialState,
      fetchProfileData.rejected(
        new Error("fail"),
        "requestId",
        undefined,
        "Не удалось загрузить профиль",
      ),
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe("Не удалось загрузить профиль");
  });
});
