import React, { useState, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { CustomContext } from "../../Context";
import {
  MainPage,
  AboutPage,
  GoodsPage,
  OneGoodPage,
  TeamPage,
  TeamMemberPage,
  OrderPage,
  FinishPage,
  AccountPage,
  AdminPage,
  AddNewGood,
  Page404,
} from "./../../pages";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const [list, setList] = useState([]);
  const { user } = useContext(CustomContext);
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/goods"
          element={<GoodsPage list={list} setList={setList} />}
        />
        <Route path="/onegood/:id" element={<OneGoodPage list={list} />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/members/:id" element={<TeamMemberPage />} />
        <Route path="/login" element={<AccountPage />} />
        <Route path="/register" element={<AccountPage />} />
        <Route path="/order" element={<AccountPage />} />
        <Route path="/finish" element={<FinishPage />} />
        {user.email === "admin@gmail.com" && (
          <Route path="/createnewitem" element={<AddNewGood />} />
        )}
        {user.email === "admin@gmail.com" && (
          <Route path="/admin/*" element={<AdminPage />} />
        )}
          {user.email === "admin@gmail.com" && (
          <Route path="/users" element={<AdminPage />} />
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
