/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Table } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import UserModal from "./UserModal";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";

const UserList = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(10);
  const [filter, setFilter] = useState("All");
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const navigate = useNavigate();

  function userList() {
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
              <RemoveRedEyeIcon />
            </button>
            &nbsp;
            <button
              className="btn btn-outline-warning"
              onClick={updateUser.bind(this, current)}
            >
              <EditIcon />
            </button>
            &nbsp;
            <button
              className="btn btn-outline-danger"
              onClick={() => {
                deleteUser(current);
              }}
            >
              <DeleteIcon />
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

  /**
   * When the user clicks the update button, navigate to the update page and pass the user object as
   * state.
   */
  function updateUser(data) {
    setUser(data);
    handleShowEdit();
  }

  function addNew() {
    handleShowAdd();
  }

  /**
   * When the Admin clicks the delete button, delete the user account.
   */
  const deleteUser = async (data) => {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }

      const result = await axios.delete(
        "http://localhost:8000/user/delete/" + data._id
      );

      if (result?.status === 201) {
        alert("Account deleted successfully");
        navigate("/users");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  const accountantFilter = (e) => {
    e.preventDefault();
    setFilter("Accountant");
  };
  const managerFilter = (e) => {
    e.preventDefault();
    setFilter("Manager");
  };
  const siteManagerFilter = (e) => {
    e.preventDefault();
    setFilter("Site Manager");
  };
  const supplierFilter = (e) => {
    e.preventDefault();
    setFilter("Supplier");
  };
  const allFilter = (e) => {
    e.preventDefault();
    setFilter("All");
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        const result = await axios.get(
          `http://localhost:8000/user/?page=${currentPage}&size=${totalItems}&search=${search}&filter=${filter}`
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
          `http://localhost:8000/user/?page=${currentPage}&size=${totalItems}&search=${search}&filter=${filter}`
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
  }, [currentPage, filter, totalItems]);

  return (
    <div>
      <div className="topHeading">
        <h1>Users</h1>
      </div>
      <div className="main">
        {show === true && <UserModal user={user} handleClose={handleClose} />}
        {showEdit === true && (
          <UpdateUser state={user} handleClose={handleCloseEdit} />
        )}
        {showAdd === true && <AddUser handleClose={handleCloseAdd} />}
        <div className="sub-main">
          <div className="head-left">
            <button
              className="btn btn-warning"
              style={{
                marginLeft: "40px",
                marginRight: "20px",
                width: "200px",
                height: "50px",
              }}
              onClick={addNew.bind(this)}
            >
              <AddCircleIcon /> Add User
            </button>
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <div className="dropdown">
              <a
                href="*"
                id="dropdownLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <button
                  className="btn btn-primary"
                  style={{
                    width: "200px",
                    height: "50px",
                    marginInline: "20px",
                  }}
                >
                  <FilterAltIcon /> {filter}
                </button>
              </a>
              <ul className="dropdown-menu" aria-labelledby="dropdownLink">
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={accountantFilter}
                >
                  Accountant
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={managerFilter}
                >
                  Manager
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={siteManagerFilter}
                >
                  Site Manager
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={supplierFilter}
                >
                  Supplier
                </button>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={allFilter}
                >
                  All
                </button>
              </ul>
            </div>
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
            <tbody>{userList()}</tbody>
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

export default UserList;
