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
import UserList from "../userManagement/user/UserList";
import TopProfile from "../userManagement/user/TopProfile";
import Profile from "../userManagement/user/Profile";
import SupplierList from "../userManagement/user/SupplierList";
import ViewProductsAdmin from "../productManagement/ViewProductsAdmin";
import ViewAllProductsAdmin from "../productManagement/ViewAllProductsAdmin";
import OrderList from "../layout/OrderList";
import OrderListSupplier from "../layout/OrderListSupplier";

function Router() {
  /* Getting the userType from the AuthContext. */
  const { userType } = useContext(AuthContext);
  console.log(userType);
  return (
    <BrowserRouter>
      {userType !== null && <Sidebar />}
      <div className="App">
        {userType !== null && <TopProfile />}
        <Routes>
          {userType === null && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route exact path="/product/new" element={<AddProduct />} />
              <Route exact path="/products/:id" element={<ViewProducts />} />
              <Route exact path="/edit/:id" element={<UpdateProduct />} />
              <Route exact path="/view/:id" element={<ViewProduct />} />
              <Route exact path="/products" element={<SupplierList />} />
            </>
          )}

          {userType === "Manager" && (
            <>
              <Route exact path="/dashboard" element={<Home />} />
              <Route exact path="/product/new" element={<AddProduct />} />
              <Route
                exact
                path="/products/:id"
                element={<ViewProductsAdmin />}
              />
              <Route exact path="/edit/:id" element={<UpdateProduct />} />
              <Route exact path="/view/:id" element={<ViewProduct />} />
              <Route
                exact
                path="/products"
                element={<ViewAllProductsAdmin />}
              />
              <Route exact path="/suppliers" element={<SupplierList />} />

              {/*User Routes for Admin*/}
              <Route path="/users" element={<UserList />} />
              <Route exact path="/orders" element={<OrderList />} />
            </>
          )}

          {userType === "Supplier" && (
            <>
              <Route exact path="/dashboard" element={<Home />} />
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/product/new" element={<AddProduct />} />
              <Route exact path="/products" element={<ViewProducts />} />
              <Route exact path="/edit/:id" element={<UpdateProduct />} />
              <Route exact path="/view/:id" element={<ViewProduct />} />
              <Route exact path="/orders" element={<OrderListSupplier />} />
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
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
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
