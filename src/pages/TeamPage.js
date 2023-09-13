import React from "react";
import { useTranslation } from "react-i18next";
import HeaderComponents from "./../components/headerComponents/HeaderComponents";
import Team from "../components/team/Team";
import IMAGES from "./../assets/img";

const TeamPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderComponents
        pageTitle={t("ourTeamPage.headerTitle")}
        headerImage={IMAGES.teamHeaderImg}
        activeLink={"/team"}
      />
      <Team />
    </>
  );
};

export default TeamPage;
