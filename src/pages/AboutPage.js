import React from "react";
import { useTranslation } from "react-i18next";
import AboutUs from "../components/aboutUs/AboutUs";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import { motion } from "framer-motion";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeaderComponents
        pageTitle={t("aboutUsPage.headerTitle")}
        headerImage={IMAGES.aboutUsHeaderImg}
        activeLink={"/about"}
        link="/"
        textLink={t("homePage.headerMenu.link1")}
      />
      <AboutUs />
    </motion.div>
  );
};

export default AboutPage;
