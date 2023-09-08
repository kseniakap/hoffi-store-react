import React from "react";
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
  return (
    <>
      <HeaderComponents
        pageTitle="Товары"
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
