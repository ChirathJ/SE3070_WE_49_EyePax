import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Col,
  Row,
  Button,
  Form,
  Container
} from "react-bootstrap";
import axios from "axios";
import { Modal } from "react-bootstrap";

const AddProduct = (props) => {

  const navigate = useNavigate();

  const [inpval, setINP] = useState({
    ProductCode: "",
    ProductName: "",
    Description: "",
    Qty: "",
    Price: "",
    Image: ""
  })

  const addinpdata = async (e) => {
    e.preventDefault();
    const data =new FormData();
    data.append('ProductCode',inpval.ProductCode);
    data.append('ProductName',inpval.ProductName);
    data.append('Price',inpval.Price);
    data.append('Image',inpval.Image);
    data.append('Qty',inpval.Qty);
    data.append('Description',inpval.Description);

    axios.post("http://localhost:8000/product/new", data).then(()=>{

      if(data){
        alert("Add Product Details Successfully");
      navigate("/products")
      }
      }).catch((err)=>{
        if (!inpval.ProductCode || !inpval.ProductName || !inpval.Description || !inpval.Qty || !inpval.Price || !inpval.Image) {
          alert("Please enter all product details")
          return 0;
      }else if(inpval.Qty>20){
          alert("Qty should be less than 20")
        }else if(inpval.Description.length>20){
          alert("Description should be less than 20 characters")
        }
      })
    }
    const setdata = (e) => {
      setINP({...inpval, [e.target.name]: e.target.value});
  }

  const handlePhoto = (e) => {
    setINP({...inpval, Image: e.target.files[0]});
  }

  return (
    <div style={{ marginLeft: "100px", marginTop: "10px", marginBottom: "100px" }}>
      <Container>
        <Modal
        dialogClassName="my-modal"
        show={true}
        onHide={props.handleModalClose}
        backdrop="static"
      >
        <a href='/products'><Modal.Header closeButton></Modal.Header></a>
        <Modal.Title style={{ textAlign: "center" }}>Add Product</Modal.Title>
        <br></br>
        
        <Modal.Body>
        <form className="formCard" border="dark">
          <Row className="justify-content-md-center">
            
              <Form.Group className="mb-3">
                <Form.Label>Product Code :</Form.Label>
                <input
                class="border border-warning"
                  placeholder="Enter Product Code"
                  value={inpval.ProductCode} onChange={setdata} name="ProductCode"
                  style={{width:"700px", marginLeft:"25px", borderRadius:"10px"}}
                />
              </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
              <Form.Group className="mb-3">
                <Form.Label>Product Name :</Form.Label>
                <input
                class="border border-warning"
                  placeholder="Enter Product Name"
                  value={inpval.ProductName} onChange={setdata} name="ProductName"
                  style={{width:"700px", marginLeft:"20px", borderRadius:"10px"}}
                />
              </Form.Group>
              </Row>
              <Row className="justify-content-md-center">
              <Form.Group className="mb-3">
                <Form.Label>Description :</Form.Label>
                <input
                class="border border-warning"
                  placeholder="Enter Product Description"
                  as="textarea"
                  rows={8}
                  value={inpval.Description} onChange={setdata} name="Description"
                  style={{width:"700px", marginLeft:"43px", borderRadius:"10px"}}
                />
              </Form.Group>
              </Row>

              <Row className="justify-content-md-center">
                <Col>
              <Form.Group className="mb-3">
              
                <Form.Label>Qty :</Form.Label>
                <input
                class="border border-warning"
                  placeholder="Enter Qty"
                  value={inpval.Qty} onChange={setdata} name="Qty"
                  style={{width:"300px", marginLeft:"97px", borderRadius:"10px"}}
                />
                
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3">
                <Form.Label>Price :</Form.Label>
                <input
                  class="border border-warning"
                  placeholder="Enter Price"
                  value={inpval.Price} onChange={setdata} name="Price"
                  style={{width:"250px", marginLeft:"35px", borderRadius:"10px"}}
                />
              </Form.Group>
              </Col>
              </Row>

              <Row className="justify-content-md-center">
                <Col>
                <Form.Group className="mb-3">
                <Form.Label>Image :</Form.Label>
                <input
                class="border border-warning"
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto} name="Image"
                  style={{width:"250px", marginLeft:"74px", borderRadius:"10px"}}
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Label>* Product will enable to purchase after manager approval</Form.Label></Col>
              </Row>
              
              

              

              <Row className="justify-content-md-center">
<Col>
<Button
                variant="outline-warning"
                size="lg"
                type="submit"
                style={{ width: "56%", marginLeft: "120px" }}
                onClick={addinpdata}
              >
                Add Product
              </Button>

              
           
              

              </Col>

              

      
<Col>
<a href="/products"><Button variant="outline-warning" size="lg" style={{ width: "56%", marginLeft: "5px" }}>
                Cancel
              </Button></a>
              </Col>
            </Row>

            
          
        </form>

        

        </Modal.Body>
        </Modal>
      </Container>
    </div>
  )
}
export default AddProduct;