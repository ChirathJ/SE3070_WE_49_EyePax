import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

const UpdateProfile = (props) => {
  const { state, handleClose } = props;

  const [name, setName] = useState(state?.name);
  const [email, setEmail] = useState(state?.email);
  const [mobile, setMobile] = useState(state?.mobile);
  const [age, setAge] = useState(state?.age);
  const [tempSex, setTempSex] = useState(state?.sex);
  const [sex, setSex] = useState(state?.sex);
  const [address, setAddress] = useState(state?.address);
  const [loading, setLoading] = useState(false);

  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const update = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the same name as the variables. */
      const updateData = {
        name,
        email,
        mobile,
        age,
        sex,
        userType: state?.userType,
        address,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.put(
        "http://localhost:8000/user/update",
        updateData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 201) {
        setLoading(false);
        alert(result?.data?.Message);
        /* Reloading the page. */
        navigate("/profile");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      alert(err?.response?.data?.errorMessage);
      console.error(err?.response?.data?.errorMessage);
    }
  };

  /**
   * When the user clicks the reset button, clear all the form fields.
   */
  const resetForm = () => {
    setName(state.name);
    setEmail(state.email);
    setMobile(state.mobile);
    setAge(state.age);
    setSex(state.sex);
    setAddress(state.address);
  };

  const sexHandler = (e) => {
    setSex(e.value);
    setTempSex(e);
  };

  useEffect(() => {
    if (state?.sex !== undefined) {
      setTempSex({
        label: state?.sex,
      });
      setSex(state?.sex);
    }
  }, [state]);

  return (
    <Modal show={true} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>Update Profile</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={update} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail*</Form.Label>
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
                  <Form.Label>Phone Number*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    maxLength="10"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Age*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Sex*</Form.Label>
                  <Select
                    options={sexOptions}
                    value={tempSex}
                    onChange={sexHandler}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control type="text" disabled value={state?.userType} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Address*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
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
                  variant="primary"
                  size="lg"
                  type="submit"
                  style={{ width: "70%", float: "left", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Updating...</span>
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProfile;
