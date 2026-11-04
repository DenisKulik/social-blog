import { userActions } from "@/entities/User/model/slice/userSlice";
import "./styles/index.scss";
import { AppRouter, useAppDispatch, useThemeVariables } from "@/app/providers";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { useEffect } from "react";

const App = () => {
  const themeVariables = useThemeVariables();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className="app" style={themeVariables}>
      <Navbar />
      <div className="contentPage">
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
