import React from "react";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import { useTranslation } from "react-i18next";
import OneGood from "../components/oneGood/OneGood";
import IMAGES from "../assets/img";

const OneGoodPage = ({ list }) => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderComponents
        pageTitle={t("goodsPage.goodOne")}
        headerImage={IMAGES.memberHeaderImg}
        activeLink={"/onegood"}
        link="/goods"
        textLink={t("goodsPage.headerTitle")}
      />
      <OneGood list={list} />
    </>
  );
};

export default OneGoodPage;
