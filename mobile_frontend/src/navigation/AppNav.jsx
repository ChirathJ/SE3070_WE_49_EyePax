import React, { useContext } from "react";
import Login from "../components/authentication/Login";
import List from "../components/List";
import AuthContext from "../context/UserContext";

function AppNav() {
    const { userType } = useContext(AuthContext);
    
  return (
    <>
      {userType === null && <Login />}
      {userType === "Supplier" && <List />}
    </>
  );
}

export default AppNav;
