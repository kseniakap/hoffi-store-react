import React from "react";
import TeamMember from "../components/teamMember/TeamMember";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import { useTranslation } from "react-i18next";
import IMAGES from "../assets/img";

const TeamMemberPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderComponents
        pageTitle={t("ourTeamPage.oneMember")}
        headerImage={IMAGES.memberHeaderImg}
        activeLink={"/members"}
        link="/team"
        textLink={t("ourTeamPage.headerTitle")}
      />
      <TeamMember />
    </>
  );
};

export default TeamMemberPage;
