import React, { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
const AuthProvider = (props) => {
    const [auth,setAuth]=useState("");
    const [userName,setUserName]=useState("");
  return (
    <>
      <AuthContext.Provider value={{auth,setAuth,userName,setUserName}}>{props.children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
