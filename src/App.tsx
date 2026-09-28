import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import "./styles/index.scss";
import { useTheme } from "./theme/useTheme";

const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={clsx("app", theme)}>
      <Link to="/about">About</Link>
      <Link to="/">Main</Link>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
