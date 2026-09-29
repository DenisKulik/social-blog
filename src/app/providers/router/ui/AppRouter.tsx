import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteConfig } from "@/shared/config";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
