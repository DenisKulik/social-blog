import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./index.scss";

const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));

const App = () => {
  return (
    <div className="app">
      <Link to="/about">About</Link>
      <Link to="/">Main</Link>
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
