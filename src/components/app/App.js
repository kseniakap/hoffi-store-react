import { useState } from "react";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import List from "./../list/List";

function App() {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const deleteOrder = (id) => {
    setOrder(order.filter((el) => el.id !== id));
  };

  return (
    <>
      <div className="container">
        <Header order={order} deleteOrder={deleteOrder} />
        <List addToOrder={addToOrder} />
      </div>
      <Footer />
    </>
  );
}

export default App;
