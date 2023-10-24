import React from "react";
import SideBar from "../adminPanel/sideBar/SideBar";
import NavBar from "../adminPanel/navBar/NavBar";
import { AdminMainPage, AdminOrderPage,AdminUserPage } from "./adminPanel";
import { Route, Routes, useLocation } from "react-router-dom";
import "./../style/style.scss";

const AdminPage = () => {
  return (
    <div className="adminContainer">
      <SideBar />
      <div className="containerAdmin">
        <NavBar />
        <div className="contentAdmin">
          <Routes>
            <Route path="/" element={<AdminMainPage />} />
            <Route path="/users" element={<AdminUserPage />} />
            <Route path="/order" element={<AdminOrderPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

