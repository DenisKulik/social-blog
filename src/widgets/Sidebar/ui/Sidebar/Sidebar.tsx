import { useState, type ReactNode } from "react";
import { Button } from "antd";
import { HomeOutlined, InfoCircleOutlined, MenuOutlined } from "@ant-design/icons";
import { clsx } from "clsx";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { AppRoutes } from "@/shared/config";
import * as cls from "./Sidebar.module.scss";

interface NavItem {
  to: string;
  labelKey: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { to: AppRoutes.MAIN, labelKey: "Главная страница", icon: <HomeOutlined /> },
  { to: AppRoutes.ABOUT, labelKey: "О нас", icon: <InfoCircleOutlined /> },
];

interface Props {
  className?: string;
}

export const Sidebar = ({ className }: Props) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className={clsx(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
      <Button className={cls.toggle} type="text" onClick={onToggle}>
        <MenuOutlined />
      </Button>
      <nav className={cls.nav}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === AppRoutes.MAIN}
            className={({ isActive }) => clsx(cls.navItem, { [cls.active]: isActive })}
          >
            <span className={cls.navIcon}>{item.icon}</span>
            <span className={cls.navLabel}>{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
