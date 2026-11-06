import { createJsonResponse } from "@test/mockFetchResponse";
import { createReduxStore } from "@/app/providers/StoreProvider";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";
import { authApi } from "./authApi";

const authUser = { id: "1", username: "ivan" };
const credentials = { username: "ivan", password: "secret" };

describe("authApi", () => {
  const fetchMock = jest.spyOn(globalThis, "fetch");

  beforeEach(() => {
    localStorage.clear();
    fetchMock.mockReset();
  });

  afterAll(() => {
    fetchMock.mockRestore();
  });

  it("отправляет данные для входа на POST /login", async () => {
    fetchMock.mockResolvedValue(createJsonResponse(authUser));

    const store = createReduxStore();
    await store.dispatch(authApi.endpoints.loginByUsername.initiate(credentials)).unwrap();

    const request = fetchMock.mock.calls[0]?.[0] as Request;

    expect(request.url).toBe("http://localhost:8000/login");
    expect(request.method).toBe("POST");
    expect(request.body).toBe(JSON.stringify(credentials));
  });

  it("сохраняет пользователя в localStorage и store при успешном входе", async () => {
    fetchMock.mockResolvedValue(createJsonResponse(authUser));

    const store = createReduxStore();
    const result = await store
      .dispatch(authApi.endpoints.loginByUsername.initiate(credentials))
      .unwrap();

    expect(result).toEqual(authUser);
    expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBe(JSON.stringify(authUser));
    expect(store.getState().user.authData).toEqual(authUser);
  });

  it("не сохраняет данные при ошибке входа", async () => {
    fetchMock.mockResolvedValue(createJsonResponse({ message: "Unauthorized" }, 401));

    const store = createReduxStore();
    const result = await store.dispatch(authApi.endpoints.loginByUsername.initiate(credentials));

    expect(result.error).toBeDefined();
    expect(localStorage.getItem(USER_LOCALSTORAGE_KEY)).toBeNull();
    expect(store.getState().user.authData).toBeUndefined();
  });
});
