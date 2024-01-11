
import {useLocation } from "react-router-dom";
import "../../i18n";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";

import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="global_container">
        <div className="content">
          {location.pathname === "/admin" || location.pathname.startsWith('/admin/')  ? null : <Header />}
          <AnimatedRoutes />
        </div>
        {
        location.pathname.includes("/404") ||
        location.pathname.includes("/admin") ||
        location.pathname.includes("/createnewitem") ? (
          ""
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
}

export default App;
