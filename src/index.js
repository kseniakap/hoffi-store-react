import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// import { StyleRoot } from "radium";
import "./style/style.scss";
import AppWrapper from "./AppWrapper";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <StyleRoot> */}
      <Router>
        <AppWrapper />
      </Router>
    {/* </StyleRoot> */}
  </React.StrictMode>
);
