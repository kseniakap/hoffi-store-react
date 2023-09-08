import React from "react";
import AboutUs from "../components/aboutUs/AboutUs";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";

const AboutPage = () => {
  return (
    <>
      <HeaderComponents
        pageTitle="Про нас"
        headerImage={IMAGES.aboutUsHeaderImg}
        activeLink={"/about"}
      />
      <AboutUs />
    </>
  );
};

export default AboutPage;
