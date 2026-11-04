import { memo, useCallback, type ChangeEvent, type FC } from "react";
import { Alert, Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import * as cls from "./LoginForm.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/providers/StoreProvider/lib/hooks";
import { getLoginState, loginActions, useLoginByUsernameMutation } from "../../model";

export interface LoginFormValues {
  username: string;
  password: string;
}

interface Props {
  className?: string;
  onSubmit?: (values: LoginFormValues) => void;
}

export const LoginForm: FC<Props> = memo(({ className, onSubmit }) => {
  const { t } = useTranslation();
  const { username, password } = useAppSelector(getLoginState);
  const dispatch = useAppDispatch();
  const [loginByUsername, { isLoading, isError }] = useLoginByUsernameMutation();

  const onChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(loginActions.setUsername(e.target.value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(loginActions.setPassword(e.target.value));
    },
    [dispatch],
  );

  // TODO: Добавить toast при успешной авторизации и при ошибке авторизации. Сейчас ошибка отображается в форме через isError.
  const submit = async (values: LoginFormValues) => {
    try {
      await loginByUsername(values).unwrap();
      onSubmit?.(values);
    } catch {
      // Ошибка запроса отображается в форме через isError.
    }
  };

  const onFinish = (values: LoginFormValues) => {
    void submit(values);
  };

  return (
    <Form
      className={clsx(cls.LoginForm, className)}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
      {isError && (
        <Alert className={cls.error} type="error" showIcon title={t("Не удалось войти")} />
      )}
      <Form.Item
        label={t("Имя пользователя")}
        name="username"
        rules={[{ required: true, message: t("Введите имя пользователя") }]}
      >
        <Input value={username} autoComplete="username" onChange={onChangeUsername} />
      </Form.Item>
      <Form.Item
        label={t("Пароль")}
        name="password"
        rules={[{ required: true, message: t("Введите пароль") }]}
      >
        <Input.Password
          value={password}
          autoComplete="current-password"
          onChange={onChangePassword}
        />
      </Form.Item>
      <Form.Item className={cls.submit}>
        <Button type="primary" htmlType="submit" block loading={isLoading}>
          {t("Войти")}
        </Button>
      </Form.Item>
    </Form>
  );
});
