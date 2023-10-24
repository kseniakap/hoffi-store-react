import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AccountPage = () => {
  const location = useLocation();

  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeaderComponents
        pageTitle={t("accountPage.headerTitle")}
        headerImage={IMAGES.aboutUsHeaderImg}
        activeLink={"/login"}
        link="/"
        textLink={t("homePage.headerMenu.link1")}
      />
      {location.pathname === "/login" ? <Login /> : <Register />}
    </motion.div>
  );
};

export default AccountPage;
