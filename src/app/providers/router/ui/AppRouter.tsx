import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteConfig } from "@/app/routes";
import { PageLoader } from "@/shared/ui";

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader delay={200} />}>
      <Routes>
        {Object.entries(RouteConfig).map(([routeName, { path, element }]) => (
          <Route
            key={routeName}
            path={path}
            element={<div className="pageWrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
