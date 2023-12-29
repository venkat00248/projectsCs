import "./MainLayout.scss";
import { useRoutes } from "react-router";
import { routes } from "../../auth/routes/routes";
import { Header } from "../../header/Header";
export const MainLayout = () => {
  const routeResult: any = useRoutes(routes);

  return (
    <div id="layout-wrapper">
		<Header/>
    <section className="main-content">
      <section className="page-content">
		{routeResult}
    </section>
    </section> 
      </div>
  );
};
