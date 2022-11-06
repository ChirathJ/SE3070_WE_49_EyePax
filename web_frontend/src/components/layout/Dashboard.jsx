import { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import logo from "./dash.jpg";
import axios from "axios";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [requestedCount, setRequestedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  async function getData() {
    try {
      const resultUsersCount = await axios.get(
        "http://localhost:8000/user/get-count"
      );
      setUsersCount(resultUsersCount.data.total);

      const resultRequestedCount = await axios.get(
        "http://localhost:8000/order/approval/Rejected"
      );
      setRequestedCount(resultRequestedCount.data.data);

      const resultCompletedCount = await axios.get(
        "http://localhost:8000/order/get-count/Delivered"
      );
      setCompletedCount(resultCompletedCount.data.data);

      const resultPendingCount = await axios.get(
        "http://localhost:8000/order/get-count/Not Delivered"
      );
      console.log(resultPendingCount.data.data);
      setPendingCount(resultPendingCount.data.data);
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
                  {requestedCount}
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
                <span className="dash_value">{pendingCount}</span>
              </div>
              <div className="sub-dash3">
                <h1>Completed Orders</h1>
                <span className="dash_value">{completedCount}</span>
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
