import { userActions, type User } from "@/entities/User";
import { api } from "@/shared/api";
import { USER_LOCALSTORAGE_KEY } from "@/shared/const/localstorage";

export interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginByUsername: build.mutation<User, LoginByUsernameProps>({
      query: (authData) => ({
        url: "/login",
        method: "POST",
        body: authData,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
          dispatch(userActions.setAuthData(data));
        } catch {
          // Ошибка запроса отображается в форме через состояние мутации.
        }
      },
    }),
  }),
});

export const { useLoginByUsernameMutation } = authApi;
