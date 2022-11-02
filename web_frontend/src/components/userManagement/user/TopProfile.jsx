import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "./Profile-art.png";

export default function TopProfile() {
  const [userData, setUserData] = useState("");

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

  /* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);
  return (
    <a href="/profile">
      <div className="topProfile">
        <div className="topProfile__left">
          <h4>{userData.name}</h4>
          <h5>{userData.userType}</h5>
        </div>
        <img src={logo} width={60} height={60} alt="profile" />
      </div>
    </a>
  );
}
