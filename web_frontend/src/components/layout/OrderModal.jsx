import { Modal, Table } from "react-bootstrap";

const OrderModal = (props) => {
  const { order, handleClose } = props;

  return (
    <Modal show={true} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>{order?.OrderId}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="table table-bordered">
          <tbody>
            <tr key={1}>
              <td>
                <h3>Site Manager</h3>
              </td>
              <td>
                <h3>{order?.SiteManager.name}</h3>
              </td>
            </tr>
            <tr key={2}>
              <td>
                <h3>Site Address</h3>
              </td>
              <td>
                <h3>{order?.SiteAddress}</h3>
              </td>
            </tr>
            <tr key={3}>
              <td>
                <h3>No of Products</h3>
              </td>
              <td>
                <h3>{order?.Cart.length}</h3>
              </td>
            </tr>
            <tr key={4}>
              <td>
                <h3>Total Price</h3>
              </td>
              <td>
                <h3>{order?.TotalPrice}</h3>
              </td>
            </tr>
            <tr key={5}>
              <td>
                <h3>Delivery Status</h3>
              </td>
              <td>
                <h3>{order?.DeliveryStatus}</h3>
              </td>
            </tr>
            <tr key={6}>
              <td>
                <h3>Delivery Date</h3>
              </td>
              <td>
                <h3>
                  {order?.DeliveryDate?.toString()?.substring(0, 10)}
                </h3>
              </td>
            </tr>
            <tr key={7}>
              <td>
                <h3>Comment</h3>
              </td>
              <td>
                <h3>{order?.Comment}</h3>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default OrderModal;
