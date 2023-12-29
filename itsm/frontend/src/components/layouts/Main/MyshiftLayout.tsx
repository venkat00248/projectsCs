import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import "./MyShiftLayout.scss";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router";
import { routes } from "../../auth/routes/routes";
import { Authenticate } from "../../uidashboard/Authenticate";
import { Layout } from "../../molecules/API/Layout";

export const MyshiftLayout = () => {
  const [themeClassName, setThemeClassName] = useState('');
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const routeResult: any = useRoutes(routes);
  useEffect(() => {
    setThemeClassName(theme ? 'darkLayout' : '');
  }, [theme]);

  return (
    <div className={`myShiftLayout ${themeClassName}`}>
      <Header />
      <div className="main-content">
        {/* <Sidebar /> */}
        <div className="routing">
          <div className="layoutRouting" >
            {routeResult}
          </div>
        </div>
      </div>
    </div>
  );
};
