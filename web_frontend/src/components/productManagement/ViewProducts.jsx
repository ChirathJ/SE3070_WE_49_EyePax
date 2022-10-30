import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NavLink } from "react-router-dom";
import { deldata } from "./context/ContextProvider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SummarizeIcon from "@mui/icons-material/Summarize";
import PaginationComponent from "./PaginationComponent";
import {
  Col,
  Row,
  Button,
  Form,
  Container,
  Card
} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ViewProducts = () => {
  const [getproductdata, setProductdata] = useState([]);
  


  const { setDLTdata } = useContext(deldata);
  const [searchTerm, setSearchTerm] = useState("");

  const getdata = async () => {

    const res = await fetch(`http://localhost:8000/product/viewp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await res.json();


    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setProductdata(data.getproductdata);
      
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getdata()]);

  const deleteproduct = async (id) => {
    const res2 = await fetch(`http://localhost:8000/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    } else {
      alert("Deleted Product Details Successfully");
      console.log("product deleted");
      setDLTdata(deletedata);
      getdata();
    }
  };

  return (
    <>
      <div className="container">
        <div className="mt-5">
          
            
              <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ marginLeft: "100px" }}
              >
                <h1
                  className="navbar-brand"
                  style={{ marginRight: "100px", marginLeft: "100px", fontSize: "40px" }}
                >
                  Products
                </h1>
                </nav>
                <Card style={{backgroundColor:""}}>
                <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ marginLeft: "100px" }}
              >
                <a href="/product/new" style={{ marginRight: "10px" }}>
                  <button
                    className="btn btn-warning my-1 my-sm-0"
                    style={{  }}
                    type="submit"
                  >
                     Add Product
                  </button>
                </a>
    

                <div style={{}}>
                  <form className="form-inline my-2 my-lg-0">
                    <input
                      className="form-control mr-sm-2"
                      style={{
                        width: "530px",
                        marginLeft: "100px",
                        marginRight: "0px",
                        borderRadius:"25px"
                      }}
                      placeholder="Search Products"
                      type="search"
                      name="searchQuery"
                      onChange={(product) => {
                        setSearchTerm(product.target.value);
                      }}
                    ></input>
                  </form>
                </div>
</nav>
            
          
          <hr></hr>

          <div className="container">
          
            <Table striped style={{ textAlign: "center" }}>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th scope="col">
                    <b>#</b>
                  </th>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Price(LKR)</th>
                  <th>Supplier</th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getproductdata.filter((element) => {
                    if (searchTerm === "") {
                      return element;
                    } else if (
                      element.ProductCode.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      element.ProductName.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      element.Qty.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      ) ||
                      element.Price.toLowerCase().includes(
                        searchTerm.toLowerCase()
                      )
                    ) {
                      return element;
                    } else {

                      return false;
                    }
                  }).map((element, id) => {
                    return (
                      <>
                        <tr>
                          <td>{id + 1}</td>
                          <td>
                          <Dropdown>
        <Dropdown.Toggle id="" variant="">
        {element.ProductName}
        </Dropdown.Toggle>

        <Dropdown.Menu variant="">
          <Dropdown.Item href="#/action-2"><NavLink to={`/view/${element._id}`}><i className="btn btn-outline-success"><RemoveRedEyeIcon></RemoveRedEyeIcon> View Product</i></NavLink></Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3" ><NavLink to={`/edit/${element._id}`}><i className="btn btn-outline-warning"><EditIcon></EditIcon> Edit Product</i></NavLink></Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4"><i
                              className="btn btn-outline-danger"
                              onClick={() => deleteproduct(element._id)}
                            ><DeleteIcon></DeleteIcon> Delete Product</i></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
                          </td>
                          <td>{element.Description}</td>
                          <td>{element.Qty}</td>
                          <td>{element.Price}</td>
                          <td>{element.Description}</td>
                          <td>
                          <NavLink to={`/view/${element._id}`}>
                              
                              
                                <Button className="btn btn-warning my-1 my-sm-0" style={{margin:"10px"}}>Approve</Button>
                              
                            </NavLink>
                            <NavLink to={`/delete/${element._id}`}>
                              
                              
                                <Button className="btn btn-black my-1 my-sm-0">Reject</Button>
                              
                            </NavLink>
          
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </Table>
            
          </div>
          </Card>
        </div>

      
      
      </div>
    </>
  );
};

export default ViewProducts;
