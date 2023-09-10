import React from "react";
import { useTranslation } from 'react-i18next'
import Categories from "../components/categories/Categories";
import List from "../components/list/List";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";

const GoodsPage = ({
  selectedCategory,
  chooseCategory,
  addToOrder,
  list,
  setList,
}) => {
  const { t } = useTranslation()
  return (
    <>
      <HeaderComponents
        pageTitle={t('goodsPage.headerTitle')}
        headerImage={IMAGES.goodsHeaderImg}
        activeLink={"/goods"}
      />
      <div className="container">
        <Categories
          chooseCategory={chooseCategory}
          selectedCategory={selectedCategory}
        />
        <List addToOrder={addToOrder} list={list} setList={setList} />
      </div>
    </>
  );
};

export default GoodsPage;
