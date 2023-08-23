import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import { MainPage, About, Contacts, Page404 } from "./../pages";


function App() {
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addToOrder = (item) => {
    const index = order.findIndex((el) => el.id === item.id);
    if (index !== -1) {
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
    setSelectedCategory(category);
  };

  const filteredList =
    selectedCategory === "all"
      ? list
      : list.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="global_container">
        <div className="container content">
          <Header
            order={order}
            setOrder={setOrder}
            deleteOrder={deleteOrder}
            setList={setList}
            list={list}
          />

          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  chooseCategory={chooseCategory}
                  selectedCategory={selectedCategory}
                  addToOrder={addToOrder}
                  list={filteredList}
                  setList={setList}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
