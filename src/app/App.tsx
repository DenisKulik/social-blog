import { Suspense } from "react";
import "./styles/index.scss";
import { AppRouter, useThemeVariables } from "@/app/providers";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";

const App = () => {
  const themeVariables = useThemeVariables();

  return (
    <div className="app" style={themeVariables}>
      <Suspense fallback="">
        <Navbar />
        <div className="contentPage">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
