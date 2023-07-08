/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState([]);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        name,
        setName,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </Context.Provider>
  );
};
