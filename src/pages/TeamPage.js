import React from "react";
import HeaderComponents from "./../components/headerComponents/HeaderComponents"
import Team from "../components/team/Team";
import IMAGES from "./../assets/img";

const TeamPage = () => {
  return (
    <>
      <HeaderComponents
        pageTitle="Наша команда"
        headerImage={IMAGES.teamHeaderImg}
        activeLink={"/team"}
      />
      <Team />
    </>
  );
};

export default TeamPage;
