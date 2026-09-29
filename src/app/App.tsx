import clsx from "clsx";
import "./styles/index.scss";
import { useTheme } from "@/app/providers";
import AppRouter from "./providers/router";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className={clsx("app", theme)}>
      <Navbar />
      <div className="contentPage">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
