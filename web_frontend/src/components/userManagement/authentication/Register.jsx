import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Select from "react-select";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const supplierRegister = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the same name as the variables. */
      const RegisterData = {
        name,
        email,
        mobile,
        address,
        userType: "Supplier",
        password,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.post(
        "http://localhost:8000/supplier/register",
        RegisterData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 201) {
        setLoading(false);
        alert("Verification Email Sent successfully");
        /* Removing the type and status from local storage. */
        localStorage.removeItem("type");
        /* Reloading the page. */
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  /**
   * When the user clicks the reset button, clear all the form fields.
   */
  const resetForm = (e) => {
    setName("");
    setEmail("");
    setAddress("");
    setMobile("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div className="main-center">
          <h1>Supplier Register</h1>
        </div>
        <hr />
        <form onSubmit={supplierRegister} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Phone Number"
                    maxLength="10"
                    required
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Button
                  onClick={resetForm}
                  variant="secondary"
                  size="lg"
                  style={{ width: "70%", float: "right", margin: "5px" }}
                >
                  Reset
                </Button>
              </Col>
              <Col>
                <Button
                  variant="warning"
                  size="lg"
                  type="submit"
                  style={{ width: "70%", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default Register;
