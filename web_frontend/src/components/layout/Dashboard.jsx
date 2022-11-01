import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import logo from "./dash.jpg";
import axios from "axios";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState("");

  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/user/get-count");
      setUsersCount(result.data.total);
      console.log("result", result);
    } catch (err) {
      console.error(err);
    }
  }

  /* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="topHeading">
        <h1>Dashboard</h1>
      </div>
      <div className="main">
        <Container>
          <Row className="justify-content-md">
            <Col>
              <div
                className="sub-dash1"
                style={{
                  backgroundImage: "url(" + logo + ")",
                  backgroundSize: "auto",
                }}
              >
                <h1 style={{ marginTop: "40px", marginLeft: "25px" }}>
                  Requests
                </h1>
                <span className="dash_value" style={{ marginLeft: "80px" }}>
                  0
                </span>
              </div>
              <div className="sub-dash2">
                <h1 style={{ textAlign: "left" }}>Recent Orders</h1>
                <hr />
                <Table className="table table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Site Name</th>
                      <th>Manager</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Site 1</td>
                      <td>Manager 1</td>
                      <td>Pending</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Site 2</td>
                      <td>Manager 2</td>
                      <td>Completed</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Site 3</td>
                      <td>Manager 3</td>
                      <td>Delivered</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Site 4</td>
                      <td>Manager 4</td>
                      <td>Completed</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Site 5</td>
                      <td>Manager 5</td>
                      <td>Shipped</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col>
              <div className="sub-dash3">
                <h1>Pending Orders</h1>
                <span className="dash_value">0</span>
              </div>
              <div className="sub-dash3">
                <h1>Completed Orders</h1>
                <span className="dash_value">0</span>
              </div>
              <div className="sub-dash3">
                <h1>Total Users</h1>
                <span className="dash_value">{usersCount}</span>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
