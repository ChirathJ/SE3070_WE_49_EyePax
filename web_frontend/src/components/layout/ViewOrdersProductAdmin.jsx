import { useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "react-bootstrap/Table";

const ViewOrdersProductAdmin = () => {
  const { state } = useLocation();
  console.log(state);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="topHeading">
        <h1>Order Products</h1>
      </div>
      <div className="main">
        <div className="sub-main">
          <div className="head-left">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="search-input"
                placeholder="Search Products"
                type="search"
                name="searchQuery"
                onChange={(product) => {
                  setSearchTerm(product.target.value);
                }}
              ></input>
            </form>
          </div>

          <hr></hr>

          <Table striped style={{ textAlign: "center" }}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="col">
                  <b>#</b>
                </th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Total Price(LKR)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state
                .filter((element) => {
                  if (searchTerm === "") {
                    return element;
                  } else if (
                    element.ProductId.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    element.ProductName.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    element.Supplier.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                  ) {
                    return element;
                  } else {
                    return false;
                  }
                })
                .map((element, id) => {
                  return (
                    <>
                      <tr>
                        <td>{id + 1}</td>
                        <td>{element.ProductId}</td>
                        <td>{element.ProductName}</td>
                        <td>{element.Qty}</td>
                        <td>{element.Supplier}</td>
                        <td>{element.Total}</td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewOrdersProductAdmin;
