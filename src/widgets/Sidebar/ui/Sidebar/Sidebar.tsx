import { useState } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { clsx } from "clsx";
import { ThemeSwitcher } from "@/shared/ui";
import * as cls from "./Sidebar.module.scss";

interface Props {
  className?: string;
}

export const Sidebar = ({ className }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      className={clsx(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
    >
      <Button className={cls.toggle} type="text" onClick={onToggle}>
        <MenuOutlined />
      </Button>
      <div className={cls.switchers}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};
