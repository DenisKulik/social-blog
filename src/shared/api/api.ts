import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

export const API_URL = "http://localhost:8000";

/**
 * json-server в json-server/index.js защищает все маршруты, кроме /login,
 * проверкой наличия заголовка authorization.
 */
export const getAuthHeaders = (): Record<string, string> => {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (!storedUser) {
    return {};
  }

  try {
    const { username } = JSON.parse(storedUser) as { username?: string };

    return username ? { authorization: username } : {};
  } catch {
    return {};
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: () => ({}),
});
