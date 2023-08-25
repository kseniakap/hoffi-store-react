import React from "react";
import Categories from "../categories/Categories";
import List from "../list/List";

const Goods = ({
  selectedCategory,
  chooseCategory,
  addToOrder,
  list,
  setList,
}) => {
  return (
    <>
      <Categories
        chooseCategory={chooseCategory}
        selectedCategory={selectedCategory}
      />
      <List addToOrder={addToOrder} list={list} setList={setList} />
    </>
  );
};

export default Goods;
