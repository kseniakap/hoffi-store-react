import React, { useState, useContext } from "react";
import { CustomContext } from "./../Context";
import { useTranslation } from "react-i18next";
import { Pagination } from "antd";
import Categories from "../components/categories/Categories";
import List from "../components/list/List";
import { Link } from "react-router-dom";
import HeaderComponents from "../components/headerComponents/HeaderComponents";
import IMAGES from "../assets/img";
import { motion } from "framer-motion";
import "./../style/style.scss";

//Страница со всеми товарами (2 по счету)
const GoodsPage = ({
  // addToOrder,
  list,
  setList,
}) => {
  const { user } = useContext(CustomContext);
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState(null);

  const isActive = (value) => (sort === value ? "active" : "");
  const [page, setPage] = useState(1);

  const numShow = 9; //кол-во отображаемых товаров

  const chooseCategory = (category) => {
    setSelectedCategory(category);
  };

  const filterListByCountPage = list.filter((item) => {
    if (selectedCategory === "all") {
      return item;
    } else {
      return item.category === selectedCategory;
    }
  });

  const filteredListByCategory = filterListByCountPage.filter((item, id) => {
    return id + 1 <= page * numShow && id >= page * numShow - numShow;
  });

  const sortList = [...filteredListByCategory].sort((a, b) => {
    const A = (a.newPrice && a.price) || a.price;
    const B = (b.newPrice && b.price) || b.price;
    if (sort === "big") {
      return A - B;
    } else if (sort === "less") {
      return B - A;
    }
    return filteredListByCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeaderComponents
        pageTitle={t("goodsPage.headerTitle")}
        headerImage={IMAGES.goodsHeaderImg}
        activeLink={"/goods"}
        link="/"
        textLink={t("homePage.headerMenu.link1")}
      />

      <div className="container">
        <Categories
          chooseCategory={chooseCategory}
          selectedCategory={selectedCategory}
          setPage={setPage}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
            fontSize: "14px",
          }}
          className="topGood"
        >
          <div className="countGoods" style={{ marginBottom: "30px" }}>
            {t("goodsPage.shown")} {filteredListByCategory.length}{" "}
            <span>
              {t("goodsPage.outOf")} {filterListByCountPage.length}{" "}
            </span>
            {t("goodsPage.products")}
          </div>

          {/* Кнопка добавления нового товара */}
          <div className="btnSort">
            {user.email === "admin@gmail.com" && (
              <Link to="/createnewitem" className="btnAddNewGood">
                {t("goodsPage.addBtn")}
              </Link>
            )}

            <div className="containerBtnSort">
              <button
                className={isActive("big")}
                onClick={() => setSort("big")}
              >
                {t("goodsPage.ascending")}
              </button>
              <button
                className={isActive("less")}
                onClick={() => setSort("less")}
              >
                {t("goodsPage.descending")}
              </button>
            </div>
          </div>
        </div>
        <List
          list={sortList}
          setList={setList}
        />
        {filterListByCountPage.length > numShow && (
          <Pagination
            simple
            onChange={setPage}
            current={page}
            total={filterListByCountPage.length}
            pageSize={numShow}
            style={{ margin: "0 auto 100px", textAlign: "center" }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default GoodsPage;
