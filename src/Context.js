import React, { createContext, useState } from "react";

export const CustomContext = createContext();

export const Context = (props) => {
  const [count, setCount] = useState(1);
  const [user, setUser] = useState({
    id: 1,
    name: "Max",
    email: "max@mail.ru",
  });

  const value = {
    count,
    setCount,
    user,
    setUser,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
