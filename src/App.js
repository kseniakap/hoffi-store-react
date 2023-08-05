import { useState, useEffect } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import List from "./components/list/List";


function App() {
  const [list, setList] = useState();

  useEffect(() => {
    fetch("https://64cd27f5bb31a268409a6c77.mockapi.io/list").then((res) =>
      res
        .json()
        .then((json) => {
          setList(json);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [list]);

  return (
    <>
      <div className="container">
        <Header />
        <List list={list}/>
      </div>
      <Footer />
    </>
  );
}

export default App;
