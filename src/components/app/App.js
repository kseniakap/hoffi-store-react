import { useState } from "react";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import List from "./../list/List";
import Categories from "../categories/Categories";

function App() {
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([])
  const [categoryItem, setCategoryItem] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const deleteOrder = (id) => {
    setOrder(order.filter((el) => el.id !== id));
  };

  const chooseCategory = (category) => {
    // if (category === "all") {
    //   setCategoryItem([]);
    // } else {
    //   setCategoryItem(categoryItem.filter((el) => el.category === category));
    // }
    console.log(category);
  };

  return (
    <>
      <div className="container">
        <Header order={order} deleteOrder={deleteOrder} />
        <Categories chooseCategory={chooseCategory} />
        <List addToOrder={addToOrder} list={list} setList={setList}/>
      </div>
      <Footer />
    </>
  );
}

export default App;
