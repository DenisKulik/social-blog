import type { FC } from "react";
import { Button, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import * as cls from "./LoginForm.module.scss";

export interface LoginFormValues {
  username: string;
  password: string;
}

interface Props {
  className?: string;
  onSubmit?: (values: LoginFormValues) => void;
}

export const LoginForm: FC<Props> = ({ className, onSubmit }) => {
  const { t } = useTranslation();

  const onFinish = (values: LoginFormValues) => {
    onSubmit?.(values);
  };

  return (
    <Form
      className={clsx(cls.LoginForm, className)}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
    >
      <Form.Item
        label={t("Имя пользователя")}
        name="username"
        rules={[{ required: true, message: t("Введите имя пользователя") }]}
      >
        <Input autoComplete="username" />
      </Form.Item>
      <Form.Item
        label={t("Пароль")}
        name="password"
        rules={[{ required: true, message: t("Введите пароль") }]}
      >
        <Input.Password autoComplete="current-password" />
      </Form.Item>
      <Form.Item className={cls.submit}>
        <Button type="primary" htmlType="submit" block>
          {t("Войти")}
        </Button>
      </Form.Item>
    </Form>
  );
};
