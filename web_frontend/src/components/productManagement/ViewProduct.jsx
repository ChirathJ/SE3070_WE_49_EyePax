import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, Button, Table } from "react-bootstrap";
import "./Styles/PopUpStyles.css";

const ViewProduct = () => {

  const [getproductdata, setProductdata] = useState([]);
 

  const { id } = useParams("");
  

  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/product/view/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();


    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setProductdata(data)
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mt-3" style={{ marginLeft: "100px" }}>
      <Modal
        dialogClassName="my-modal"
        show={true}
        backdrop="static"
      >
        <a href='/products'><Modal.Header closeButton></Modal.Header></a>
        <Modal.Title style={{ textAlign: "center" }}>{getproductdata.ProductName}</Modal.Title>
        <br></br>
       <img src={typeof (getproductdata.Image) !== 'undefined' ? require(`../productManagement/ProductImages/${getproductdata.Image}`) : 'Error'} style={{ width: "400px", height: "300px", margin: "auto" }} alt="Product" />
        <Modal.Body>
          <Table bordered responsive>
            <tbody>
              
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Product Code</b>
                </td>
                <td>{getproductdata.ProductCode}</td>
              </tr>
          
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Product Name</b>
                </td>
                <td>{getproductdata.ProductName}</td>
              </tr>

          
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Qty</b>
                </td>
                <td>{getproductdata.Qty}</td>
              </tr>
              
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Price</b>
                </td>
                <td>{getproductdata.Price}</td>
              </tr>
             
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Description</b>
                </td>
                <td>{getproductdata.Description}</td>
              </tr>
              


               
              
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <a href='/products'><Button variant="danger">
            Close
          </Button></a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ViewProduct
