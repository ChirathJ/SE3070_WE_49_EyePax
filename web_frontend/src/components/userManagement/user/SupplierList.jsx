/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import UserModal from "./UserModal";
import { useNavigate } from "react-router-dom";

const SupplierList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(10);
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  function supplierList() {
    /* Returning the data in the form of a table. */
    return users?.map((current, index) => {
      /* Checking if the name contains the search string or if the search string is empty. */
      return (
        <tr key={index}>
          <td>{current.id}</td>
          <td>{current.name}</td>
          <td>{current.email}</td>
          <td className="d-flex justify-content-center">
            <button
              className="btn btn-outline-secondary"
              onClick={viewUser.bind(this, current)}
            >
              <RemoveRedEyeIcon /> Supplier
            </button>
            &nbsp;
            <button
              className="btn btn-outline-secondary"
              onClick={viewProduct.bind(this, current)}
            >
              <RemoveRedEyeIcon /> Products
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
    setUser(data);
    handleShow();
  }

  function viewProduct(data) {
    navigate("/products/" + data._id, { state: data });
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const result = await axios.get(
          `http://localhost:8000/user/?page=${currentPage}&size=${totalItems}&search=${search}&filter=Supplier`
        );
        /* Setting the state of the notes and totalPage variables. */
        setUsers(result?.data?.users);
        setTotalPage(result?.data?.totalPage);
        setTotal(result?.data?.total);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
  };

  useEffect(() => {
    /**
     * "getall" is an async function that uses axios to get data from the server, and then sets the
     * state of the notes and totalPage variables.
     */
    const getall = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8000/user/?page=${currentPage}&size=${totalItems}&search=${search}&filter=Supplier`
        );
        /* Setting the state of the notes and totalPage variables. */
        setUsers(result?.data?.users);
        setTotalPage(result?.data?.totalPage);
        setTotal(result?.data?.total);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    };
    getall();
  }, [currentPage, totalItems]);

  return (
    <div>
      <div className="topHeading">
        <h1>Suppliers</h1>
      </div>
      <div className="main">
        {show === true && <UserModal user={user} handleClose={handleClose} />}
        <div className="sub-main">
          <div className="head-left">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>
          <hr />
          <Table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{supplierList()}</tbody>
          </Table>
          <hr />
          <PaginationComponent
            pageNo={currentPage}
            setPageNo={setCurrentPage}
            itemsPerPage={totalItems}
            setItemsPerPage={setTotalItems}
            totalCount={total}
            pageCount={totalPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SupplierList;
