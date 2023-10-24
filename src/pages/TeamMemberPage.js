import React from "react";
import TeamMember from "../components/teamMember/TeamMember";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import { useTranslation } from "react-i18next";
import IMAGES from "../assets/img";
import { motion } from "framer-motion";

const TeamMemberPage = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeaderComponents
        pageTitle={t("ourTeamPage.oneMember")}
        headerImage={IMAGES.memberHeaderImg}
        activeLink={"/members"}
        link="/team"
        textLink={t("ourTeamPage.headerTitle")}
      />
      <TeamMember />
    </motion.div>
  );
};

export default TeamMemberPage;
