import { useState } from "react";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import List from "./../list/List";
import Categories from "../categories/Categories";

function App() {
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  // const [categoryItem, setCategoryItem] = useState([]);

  const addToOrder = (item) => {
    const index = order.findIndex((el) => el.id === item.id);
    if (index !== -1) {
      // Если элемент уже есть в заказе, увеличиваем количество
      const updatedOrder = [...order];
      updatedOrder[index].count += 1;
      console.log(updatedOrder[index].count);
      setOrder(updatedOrder);
    } else {
      setOrder([...order, { ...item, count: 1 }]);
    }
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
    console.log(list);
    console.log(category);
  };

  return (
    <>
      <div className="container">
        <Header
          order={order}
          setOrder={setOrder}
          deleteOrder={deleteOrder}
          setList={setList}
          list={list}
        />
        <Categories chooseCategory={chooseCategory} />
        <List addToOrder={addToOrder} list={list} setList={setList} />
      </div>
      <Footer />
    </>
  );
}

export default App;
