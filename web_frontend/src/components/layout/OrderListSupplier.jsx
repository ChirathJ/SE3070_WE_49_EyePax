/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import OrderModal from "./OrderModal";

const OrderListSupplier = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function OrderListSupplier() {
    /* Returning the data in the form of a table. */
    return orders?.map((current, index) => {
      /* Checking if the name contains the search string or if the search string is empty. */
      return (
        <tr key={index}>
          <td>{current.SiteManager.name}</td>
          <td>{current.Cart.length}</td>
          <td>{current.SiteAddress}</td>
          <td>{current.TotalPrice}</td>
          <td>{current.DeliveryStatus}</td>
          <td>
            <button
              className="btn btn-outline-secondary"
              onClick={viewUser.bind(this, current)}
            >
              <RemoveRedEyeIcon />
            </button>
          </td>
        </tr>
      );
    });
  }

  /**
   * When the user clicks on a row, the user's data is set to the state and the modal is shown.
   */
  function viewUser(data) {
    setOrder(data);
    handleShow();
  }

  useEffect(() => {
    /**
     * "getall" is an async function that uses axios to get data from the server, and then sets the
     * state of the notes and totalPage variables.
     */
    const getall = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/order/getAll`);
        console.log(result);
        /* Setting the state of the notes and totalPage variables. */
        setOrders(result?.data?.data);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    getall();
  }, []);

  return (
    <div>
      <div className="topHeading">
        <h1>Orders</h1>
      </div>
      <div className="main">
        {show === true && (
          <OrderModal order={order} handleClose={handleClose} />
        )}
        <div className="sub-main">
          <div className="head-left">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              // onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <hr />
          <Table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Site Manager</th>
                <th>No of Products</th>
                <th>Site Address</th>
                <th>Total Price</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{OrderListSupplier()}</tbody>
          </Table>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default OrderListSupplier;
