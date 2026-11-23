import { createJsonResponse } from "@test/mockFetchResponse";
import { createReduxStore } from "@/app/providers/StoreProvider";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import type { Profile } from "../../types/profile";
import { fetchProfileData } from "./fetchProfileData";

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

describe("fetchProfileData", () => {
  const fetchMock = jest.spyOn(globalThis, "fetch");

  beforeEach(() => {
    localStorage.clear();
    fetchMock.mockReset();
  });

  afterAll(() => {
    fetchMock.mockRestore();
  });

  it("загружает профиль по GET /profile с заголовком авторизации", async () => {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify({ id: "1", username: "admin" }));
    fetchMock.mockResolvedValue(createJsonResponse(profile));

    const store = createReduxStore();
    const result = await store.dispatch(fetchProfileData()).unwrap();

    expect(result).toEqual(profile);
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8000/profile", {
      headers: { authorization: "admin" },
    });
    expect(store.getState().profile.data).toEqual(profile);
    expect(store.getState().profile.isLoading).toBe(false);
  });

  it("сохраняет ошибку при неуспешном ответе", async () => {
    fetchMock.mockResolvedValue(createJsonResponse({ message: "Error" }, 500));

    const store = createReduxStore();
    await store.dispatch(fetchProfileData());

    expect(store.getState().profile.data).toBeUndefined();
    expect(store.getState().profile.error).toBe("Не удалось загрузить профиль");
    expect(store.getState().profile.isLoading).toBe(false);
  });

  it("сохраняет ошибку при сетевом сбое", async () => {
    fetchMock.mockRejectedValue(new Error("network"));

    const store = createReduxStore();
    await store.dispatch(fetchProfileData());

    expect(store.getState().profile.error).toBe("Не удалось загрузить профиль");
  });
});
