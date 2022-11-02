import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style.css";
import UpdateProfile from "./UpdateProfile";

function Profile() {
  const [userData, setUserData] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  /**
   * If the user has a date of birth, then create a new date object from the date of birth, convert it to
   * ISO string, and then take the first 10 characters of that string and assign it to a new property
   * called dobEdited.
   */
  async function getData() {
    try {
      const result = await axios.get("http://localhost:8000/user/profile");
      if (result.data.dob) {
        const dobEdited = new Date(result.data.dob)
          .toISOString()
          .substring(0, 10);
        result.data.dob = dobEdited;
      }
      setUserData(result.data);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * When the user clicks the update button, navigate to the update page and pass the userData object as
   * state.
   */
  function updateUser() {
    handleShow();
  }

  /**
   * When the user clicks the delete button, delete the user's account.
   */
  async function deleteUser() {
    try {
      if (!window.confirm("Are you sure you wish to delete this account?")) {
        return;
      }

      const result = await axios.delete("http://localhost:8000/user/delete");

      if (result?.status === 201) {
        alert("Account deleted successfully");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  /* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="topHeading">
        <h1>User Profile</h1>
      </div>
      <div className="main-profile">
        {show === true && (
          <UpdateProfile state={userData} handleClose={handleClose} />
        )}
        <div className="sub-main-profile">
          {userData ? (
            <>
              <div>
                <h1>{userData?.name}</h1>
                <hr />
              </div>
              <table className="table table-striped">
                <tbody>
                  <tr key={1}>
                    <td>
                      <h3>ID</h3>
                    </td>
                    <td>
                      <h3>{userData?.id}</h3>
                    </td>
                  </tr>
                  <tr key={2}>
                    <td>
                      <h3>E-mail</h3>
                    </td>
                    <td>
                      <h3>{userData?.email}</h3>
                    </td>
                  </tr>
                  <tr key={3}>
                    <td>
                      <h3>Mobile</h3>
                    </td>
                    <td>
                      <h3>{userData?.mobile}</h3>
                    </td>
                  </tr>
                  <tr key={4}>
                    <td>
                      <h3>Age</h3>
                    </td>
                    <td>
                      <h3>
                        {userData?.age === undefined ? "-" : userData?.age}
                      </h3>
                    </td>
                  </tr>
                  <tr key={5}>
                    <td>
                      <h3>Sex</h3>
                    </td>
                    <td>
                      <h3>
                        {userData?.sex === undefined ? "-" : userData?.sex}
                      </h3>
                    </td>
                  </tr>
                  <tr key={6}>
                    <td>
                      <h3>Address</h3>
                    </td>
                    <td>
                      <h3>
                        {userData?.address === undefined
                          ? "-"
                          : userData?.address}
                      </h3>
                    </td>
                  </tr>
                  <tr key={7}>
                    <td>
                      <h3>User Type</h3>
                    </td>
                    <td>
                      <h3>{userData?.userType}</h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <h1>Loading...</h1>
          )}

          <div className="main-center">
            <button
              className="btn btn-primary forgot-button"
              onClick={updateUser}
            >
              Update Profile
            </button>
            <button
              className="btn btn-danger forgot-button"
              onClick={deleteUser}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
