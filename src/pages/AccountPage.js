import React from "react";
import { useLocation } from "react-router-dom";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AccountPage = () => {
  const location = useLocation();
  return (
    <>
      <HeaderComponents
        pageTitle="Аккаунт"
        headerImage={IMAGES.aboutUsHeaderImg}
        activeLink={"/login"}
      />
      {location.pathname === "/login" ? <Login /> : <Register />}
    </>
  );
};

export default AccountPage;
