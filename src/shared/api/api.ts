import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL = "http://localhost:8000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: () => ({}),
});
