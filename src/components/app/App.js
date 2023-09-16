import { useState, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../i18n";
import Header from "./../header/Header";
import { CustomContext } from "../../Context";
import Footer from "./../footer/Footer";
import {
  MainPage,
  AboutPage,
  GoodsPage,
  OneGoodPage,
  TeamPage,
  TeamMemberPage,
  ContactsPage,
  AccountPage,
  Page404,
} from "./../../pages";

function App() {
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  const location = useLocation();
  const { colorName } = useContext(CustomContext);

  const addToOrder = (item) => {
    // console.log(item);
    const index = order.findIndex((el) => el.id === item.id);
    if (index !== -1) {
      const updatedOrder = [...order];
      updatedOrder[index].count += 1;
      // console.log(updatedOrder[index].count);
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
            <Route
              path="/onegood/:id"
              element={<OneGoodPage addToOrder={addToOrder} />}
            />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/members/:id" element={<TeamMemberPage />} />
            <Route path="/login" element={<AccountPage />} />
            <Route path="/register" element={<AccountPage />} />
            <Route path="/order" element={<AccountPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        {location.pathname === "/login" ||
        location.pathname.includes("/register") ||
        location.pathname.includes("/404") ? (
          ""
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
}

export default App;
