import React from "react";
import Presentation from "../presentation/Presentation";
import Categories from "../categories/Categories";
import List from "../list/List";

const MainPage = ({selectedCategory, chooseCategory, addToOrder, list, setList}) => {
  return (
    <>
      <Presentation />
      <Categories chooseCategory={chooseCategory} selectedCategory={selectedCategory}/>
      <List addToOrder={addToOrder} list={list} setList={setList} />
    </>
  );
};

export default MainPage;
