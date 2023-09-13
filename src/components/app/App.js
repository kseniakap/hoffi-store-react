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

  return (
    <>
      <div className="global_container">
        <div className="content">
          <Header order={order} setOrder={setOrder} deleteOrder={deleteOrder} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/goods"
              element={
                <GoodsPage
                  addToOrder={addToOrder}
                  list={list}
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
        location.pathname === "/login" ||
        location.pathname === "/register" ? (
          <Footer />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
