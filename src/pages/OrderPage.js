import React from "react";
import { useTranslation } from "react-i18next";
import GoodInBasket from "../components/goodInBasket/GoodInBasket";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import { motion } from "framer-motion";
import "./../style/style.scss";

const OrderPage = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeaderComponents
        pageTitle="Корзина"
        headerImage={IMAGES.orderHeaderImg}
        activeLink={"/order"}
        link="/"
        textLink={t("homePage.headerMenu.link1")}
      />
      <div className="container">
        <GoodInBasket />
      </div>
    </motion.div>
  );
};

export default OrderPage;
