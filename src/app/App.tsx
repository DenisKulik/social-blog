import { Link } from "react-router-dom";
import clsx from "clsx";
import "./styles/index.scss";
import { useTheme } from "@/app/providers";
import AppRouter from "./providers/router";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={clsx("app", theme)}>
      <Link to="/about">About</Link>
      <Link to="/">Main</Link>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <AppRouter />
    </div>
  );
};

export default App;
