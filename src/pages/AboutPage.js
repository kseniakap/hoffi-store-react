import React from "react";
import { useTranslation } from 'react-i18next'
import AboutUs from "../components/aboutUs/AboutUs";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";

const AboutPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <HeaderComponents
        pageTitle={t('aboutUsPage.headerTitle')}
        headerImage={IMAGES.aboutUsHeaderImg}
        activeLink={"/about"}
      />
      <AboutUs />
    </>
  );
};

export default AboutPage;
