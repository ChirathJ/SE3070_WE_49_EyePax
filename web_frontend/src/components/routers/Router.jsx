import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "../layout/Dashboard";
import AuthContext from "../userManagement/context/UserContext";
import Login from "../userManagement/authentication/Login";
import Register from "../userManagement/authentication/Register";
import Dashboard from "../layout/Dashboard";

import AddProduct from "../productManagement/AddProduct";
import ViewProduct from "../productManagement/ViewProduct";
import UpdateProduct from "../productManagement/UpdateProduct";
import ViewProducts from "../productManagement/ViewProducts";
import Sidebar from "../layout/Sidebar";

function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {userType !== null && <Sidebar />}
      <div className="App">
        <Routes>
          {userType === null && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route exact path="/product/new" element={<AddProduct />} />
              <Route exact path="/products" element={<ViewProducts />} />
              <Route exact path="/edit/:id" element={<UpdateProduct />} />
              <Route exact path="/view/:id" element={<ViewProduct />} />
            </>
          )}

          {userType === "Manager" && (
            <>
              <Route exact path="/dashboard" element={<Home />} />

              {/*User Routes for Admin*/}
              {/* <Route path="/users/add" element={<AddUser />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/update" element={<UpdateUser />} />
                <Route path="/users/report" element={<UserReport />} /> */}
            </>
          )}

          {userType === "Supplier" && (
            <>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/product/new" element={<AddProduct />} />
                <Route exact path="/products" element={<ViewProducts />} />
                <Route exact path="/edit/:id" element={<UpdateProduct />} />
                <Route exact path="/view/:id" element={<ViewProduct />} />
            </>
          )}

          {userType === "Accountant" && (
            <>
              <Route exact path="/" element={<Dashboard />} />
            </>
          )}

          {userType === "Site Manager" && (
            <>
              <Route exact path="/" element={<Dashboard />} />
            </>
          )}

          {userType === "Supplier" ||
          userType === "Manager" ||
          userType === "Accountant" ||
          userType === "Site Manager" ? (
            <>
              {/* <Route path="/profile" element={<Profile />} />
                <Route path="/profile/update" element={<UpdateProfile />} />
                <Route
                  path="/profile/change-password"
                  element={<ChangePassword />}
                /> */}
            </>
          ) : (
            ""
          )}

          <Route exact path="*" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
