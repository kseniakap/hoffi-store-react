import React from "react";
import SideBar from "../adminPanel/sideBar/SideBar";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "../adminPanel/navBar/NavBar";
import {
  AdminMainPage,
  AdminOrderPage,
  AdminUserPage,
  AdminAllGoodsPage,
} from "./adminPanel";
import { Page404 } from "./../pages";
import { AnimatePresence } from "framer-motion";

import "./../style/style.scss";
import WrappperCreateNewGood from "../components/addNewGood/WrapperCreateNewGood";

const AdminPage = () => {
  return (
    <div className="adminContainer">
      <SideBar />
      <div className="containerAdmin">
        <NavBar />
        <div className="contentAdmin">
          <AnimatedRoutes />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AdminMainPage />} />
        <Route path="/users" element={<AdminUserPage />} />
        <Route path="/goods" element={<AdminAllGoodsPage />} />
        <Route path="/order" element={<AdminOrderPage />} />
        <Route path="/newgood" element={<WrappperCreateNewGood />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </AnimatePresence>
  );
};
