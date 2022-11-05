import React, { useContext } from "react";
import Login from "../components/authentication/Login";
import AuthContext from "../context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./BottomNav";
import SupplierList from "../components/Product/SupplierList";

function AppNav() {
  const { userType } = useContext(AuthContext);

  return (
    <>
      {userType === null && <SupplierList />}
      {userType === "Site Manager" && (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      )}
    </>
  );
}

export default AppNav;
