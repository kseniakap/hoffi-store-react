import { useState, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "../../i18n";
import Header from "./../header/Header";
import Footer from "./../footer/Footer";
import {
  MainPage,
  AboutPage,
  GoodsPage,
  OneGoodPage,
  TeamPage,
  TeamMemberPage,
  OrderPage,
  FinishPage,
  AccountPage,
  AdminPage,
  AddNewGood,
  Page404,
} from "./../../pages";
import { CustomContext } from "../../Context";

function App() {
  const [list, setList] = useState([]);
  const { user } = useContext(CustomContext);
  const location = useLocation();

  return (
    <>
      <div className="global_container">
        <div className="content">
          <Header />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/goods"
              element={<GoodsPage list={list} setList={setList} />}
            />
            <Route path="/onegood/:id" element={<OneGoodPage list={list} />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/members/:id" element={<TeamMemberPage />} />
            <Route path="/login" element={<AccountPage />} />
            <Route path="/register" element={<AccountPage />} />
            <Route path="/order" element={<AccountPage />} />
            <Route path="/finish" element={<FinishPage />} />
            {user.email === "admin@gmail.com" && (
              <Route path="/admin" element={<AdminPage />} />
            )}
            {user.email === "admin@gmail.com" && (
              <Route path="/createnewitem" element={<AddNewGood />} />
            )}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        {location.pathname === "/login" ||
        location.pathname.includes("/register") ||
        location.pathname.includes("/404") ||
        location.pathname.includes("/admin") ||
        location.pathname.includes("/createnewitem") ? (
          ""
        ) : (
          <Footer />
        )}
      </div>
    </>
  );
}

export default App;
