import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the user's email and password, and if successful, navigate to the home page.
   */
  const login = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the email and password. */
      const loginData = {
        email,
        password,
      };

      /* Sending a POST request to the server with the user's email and password. */
      const result = await axios.post("http://localhost:8000/login", loginData);

      /* Checking if the status is true. */
      if (result) {
        setLoading(false);
        localStorage.setItem("type", result?.data?.type);
        /* Setting the local storage with the type and status. */
        /* Reloading the page. */
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      alert(err.response.data.errorMessage);
      console.error(err.response.data.errorMessage);
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <div className="main-center">
          <h1 style={{ margin: "2%" }}>Login</h1>
        </div>
        <hr />
        <form border="dark" onSubmit={login}>
          <Container>
            <Row className="justify-content-md-center">
              <Form.Group className="mb-3">
                <Col>
                  <Form.Label>Email</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Col>
              </Form.Group>
            </Row>

            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <div className="main-center">
            <Button
              variant="warning"
              size="lg"
              type="submit"
              style={{ width: "60%", float: "center", margin: "5px" }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Login...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
        <hr />
        <div className="main-center">
          <h4>OR</h4>
          <a href="/register">
            {" "}
            <Button
              variant="secondary"
              size="lg"
              type="submit"
              style={{ width: "60%", float: "center", margin: "5px" }}
            >
              Register
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
