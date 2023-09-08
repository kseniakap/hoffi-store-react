import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "./Context";
import "./style/style.scss";

const App = lazy(() => import("./components/app/App"));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Загрузка....</div>}>
      <Router>
        <Context>
          <App />
        </Context>
        <ScrollToTop />
      </Router>
    </Suspense>
  </React.StrictMode>
);
