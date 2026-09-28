import { lazy } from "react";
import type { RouteProps } from "react-router-dom";

export enum AppRoutes {
  MAIN = "/",
  ABOUT = "/about",
}

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
};
