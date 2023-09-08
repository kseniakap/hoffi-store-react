import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../i18n";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import {
  MainPage,
  AboutPage,
  GoodsPage,
  TeamPage,
  ContactsPage,
  AccountPage,
  Page404,
} from "./../../pages";

function App() {
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const location = useLocation();

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
        <div className="content">
          <Header
            order={order}
            setOrder={setOrder}
            deleteOrder={deleteOrder}
            setList={setList}
            list={list}
          />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/goods"
              element={
                <GoodsPage
                  chooseCategory={chooseCategory}
                  selectedCategory={selectedCategory}
                  addToOrder={addToOrder}
                  list={filteredList}
                  setList={setList}
                />
              }
            />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/login" element={<AccountPage />} />
            <Route path="/register" element={<AccountPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>

        {location.pathname === "/" ||
        location.pathname === "/about" ||
        location.pathname === "/goods" ||
        location.pathname === "/contacts" ||
        location.pathname === "/team" ||
        location.pathname === "/account" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
