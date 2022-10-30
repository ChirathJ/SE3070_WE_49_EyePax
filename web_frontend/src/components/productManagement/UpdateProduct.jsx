import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import { Col, Row, Button, Form, Container } from "react-bootstrap";


const UpdateProduct = () => {

  const { setUPdata } = useContext(updatedata)

  const navigate = useNavigate("");

  const [inpval, setINP] = useState({
    ProductCode: "",
    ProductName: "",
    Description: "",
    Qty: "",
    Price: "",
    Image: ""
  })

  const setdata = (e) => {
   
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

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
      console.log("Please enter all product details")
      return 0;
    } else {
      setINP(data)
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateproduct = async (e) => {
    e.preventDefault();

    const { ProductCode, ProductName, Price, Image, Qty, Description } = inpval;

    const res2 = await fetch(`http://localhost:8000/product/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ProductCode, ProductName, Price, Image, Qty, Description
      })
    });

    const data2 = await res2.json();
   

    if (res2.status === 422 || !data2) {
      alert("Please enter all product details");
    }else if(Qty>100){
      alert("Maximum Partipants are 100")
    }else if(inpval.Description.length>20){
      alert("Client name should be less than 20 characters")
    }else {
      alert("Update Product Details Successfully")
      navigate("/view")
      setUPdata(data2);
    }
  }

  return (
    <div style={{ marginLeft: "100px", marginTop: "10px", marginBottom: "100px" }}>
      <Container>
        <h1>Update Product - {inpval.ProductCode}</h1>
        <hr></hr>
        <form className="formCard" border="dark">
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Product Code</Form.Label>
                <Form.Control value={inpval.ProductCode} onChange={setdata} name="ProductCode" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control value={inpval.ProductName} onChange={setdata} name="ProductName" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control value={inpval.Price} onChange={setdata} name="Price" />
              </Form.Group>

              

              

              <NavLink to={`/view`}><Button variant="secondary" size="lg" style={{ width: "100%" }}>
                Back
              </Button></NavLink>
            </Col>

            <Col>
              

              <Form.Group className="mb-3">
                <Form.Label>Qty</Form.Label>
                <Form.Control value={inpval.Qty} onChange={setdata} name="Qty" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control value={inpval.Image} onChange={setdata} name="Image" />
              </Form.Group>

              
              {/* <Form.Group className="mb-3">
                <Form.Label>Event Image *</Form.Label>
                <Form.Control type='file' onChange={setdata} name="EventImage" />
              </Form.Group> */}
              <Button variant="primary" size="lg" type="submit" style={{ width: "100%" }} onClick={updateproduct}>
                Submit
              </Button>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={8}
                  value={inpval.Description} onChange={setdata} name="Description"
                />
              </Form.Group>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  )
}

export default UpdateProduct;





