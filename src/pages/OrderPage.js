import React from "react";
import { useTranslation } from "react-i18next";
import GoodInBasket from "../components/goodInBasket/GoodInBasket";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import "./../style/style.scss";

const OrderPage = () => {
  const { t } = useTranslation();
  return (
    <>
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
    </>
  );
};

export default OrderPage;
