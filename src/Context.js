import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CustomContext = createContext();

export const Context = (props) => {
  const [user, setUser] = useState({
    login: "",
  });
  const [error, setError] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [imgChoose, setImgChoose] = useState(null);
  const [colorName, setColorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const registerUser = (data) => {
    axios
      .post("http://localhost:3001/register", { ...data, orders: [] })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginUser = (data) => {
    axios
      .post("http://localhost:3001/login", data)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(true);
        } else {
          console.error(error);
        }
      });
  };

  const logOutUser = () => {
    localStorage.removeItem("user");
    setUser({
      login: "",
    });
  };

  const formatPrice = (p) => {
    if (!p) return "";
    const priceStr = p.toString();
    return priceStr.length > 3
      ? priceStr.slice(0, -3) + " " + priceStr.slice(-3)
      : priceStr;
  };

  const value = {
    cardOpen,
    setCardOpen,
    user,
    setUser,
    registerUser,
    logOutUser,
    loginUser,
    error,
    setError,
    formatPrice,
    imgChoose,
    setImgChoose,
    colorName,
    setColorName,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
