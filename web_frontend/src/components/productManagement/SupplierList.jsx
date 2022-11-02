import React, { useState, useEffect, useContext } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { NavLink } from "react-router-dom";
import { deldata } from "./context/ContextProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Container,
  Card,
} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';

const SupplierList = () => {
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
      console.log(data.getproductdata);
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <>
    <Container>
      <div className="" style={{}}>
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
                  <th>Supplier Name</th>
                  
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
                          
                          <td>{element.user}</td>
                          <td><NavLink to={`/products/${element.user}`}><i className="btn btn-outline-success"><RemoveRedEyeIcon></RemoveRedEyeIcon> View Product</i></NavLink></td>
                          
                          
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
      </Container>
    </>
  );
};

export default SupplierList;
