import { Modal, Table } from "react-bootstrap";

const UserModal = (props) => {
  const { user, handleClose } = props;

  return (
    <Modal show={true} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <h1>{user?.name}</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="table table-bordered">
          <tbody>
            <tr key={1}>
              <td>
                <h3>ID</h3>
              </td>
              <td>
                <h3>{user?.id}</h3>
              </td>
            </tr>
            <tr key={2}>
              <td>
                <h3>E-mail</h3>
              </td>
              <td>
                <h3>{user?.email}</h3>
              </td>
            </tr>
            <tr key={3}>
              <td>
                <h3>Mobile</h3>
              </td>
              <td>
                <h3>{user?.mobile}</h3>
              </td>
            </tr>
            <tr key={4}>
              <td>
                <h3>Age</h3>
              </td>
              <td>
                <h3>{user?.age === undefined ? "-" : user?.age}</h3>
              </td>
            </tr>
            <tr key={5}>
              <td>
                <h3>Sex</h3>
              </td>
              <td>
                <h3>{user?.sex === undefined ? "-" : user?.sex}</h3>
              </td>
            </tr>
            <tr key={6}>
              <td>
                <h3>Address</h3>
              </td>
              <td>
                <h3>{user?.address === undefined ? "-" : user?.address}</h3>
              </td>
            </tr>
            <tr key={7}>
              <td>
                <h3>User Type</h3>
              </td>
              <td>
                <h3>{user?.userType}</h3>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default UserModal;
