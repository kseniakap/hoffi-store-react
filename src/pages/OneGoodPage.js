import React from "react";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import { useTranslation } from "react-i18next";
import OneGood from "../components/oneGood/OneGood";
import IMAGES from "../assets/img";
import { motion } from "framer-motion";
import transitions from "@material-ui/core/styles/transitions";

const OneGoodPage = ({ list }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: -window.innerWidth, transition: { duration: 0.5 } }}
    >
      <HeaderComponents
        pageTitle={t("goodsPage.goodOne")}
        headerImage={IMAGES.memberHeaderImg}
        activeLink={"/onegood"}
        link="/goods"
        textLink={t("goodsPage.headerTitle")}
      />
      <OneGood list={list} />
    </motion.div>
  );
};

export default OneGoodPage;
