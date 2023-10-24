import React from "react";
import { useTranslation } from "react-i18next";
import HeaderComponents from "./../components/headerComponents/HeaderComponents";
import Team from "../components/team/Team";
import IMAGES from "./../assets/img";
import { motion } from "framer-motion";

const TeamPage = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeaderComponents
        pageTitle={t("ourTeamPage.headerTitle")}
        headerImage={IMAGES.teamHeaderImg}
        activeLink={"/team"}
        link="/"
        textLink={t("homePage.headerMenu.link1")}
      />
      <Team />
    </motion.div>
  );
};

export default TeamPage;
