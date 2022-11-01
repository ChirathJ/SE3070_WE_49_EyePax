import React, { useContext } from "react";
import SupplierList from "../components/Product/SupplierList";
import ViewProduct from "../components/Product/ViewProduct";
import ViewProducts from "../components/Product/ViewProducts";
import Login from "../components/authentication/Login";
import List from "../components/List";
import AuthContext from "../context/UserContext";

function AppNav() {
    const { userType } = useContext(AuthContext);
    
  return (
    <>
    <ViewProducts/>
      {userType === "null" && <Login />}
      {userType === "Supplier" && <List />}
    </>
  );
}

export default AppNav;
