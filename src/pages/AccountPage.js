import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AccountPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  return (
    <>
      <HeaderComponents
        pageTitle={t("accountPage.headerTitle")}
        headerImage={IMAGES.aboutUsHeaderImg}
        activeLink={"/login"}
      />
      {location.pathname === "/login" ? <Login /> : <Register />}
    </>
  );
};

export default AccountPage;
