/* eslint-disable react-refresh/only-export-components -- конфиг маршрутов с lazy-компонентами, а не Fast Refresh boundary */
import { lazy } from "react";
import type { RouteProps } from "react-router-dom";
import { AppRoutes } from "@/shared/config";
import NotFoundPage from "@/pages/NotFoundPage";

const MainPage = lazy(() => import("@/pages/MainPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));

export const RouteConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: AppRoutes.MAIN,
    element: <MainPage />,
  },
  [AppRoutes.ABOUT]: {
    path: AppRoutes.ABOUT,
    element: <AboutPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
