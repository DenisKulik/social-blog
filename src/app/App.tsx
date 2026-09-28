import clsx from "clsx";
import "./styles/index.scss";
import { useTheme } from "@/app/providers";
import AppRouter from "./providers/router";
import { Navbar } from "@/widgets/Navbar";

const App = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={clsx("app", theme)}>
      <Navbar />
      <AppRouter />
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default App;
