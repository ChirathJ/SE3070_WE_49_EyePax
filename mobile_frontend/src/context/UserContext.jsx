import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* Setting the state of the component. */
  const [userType, setUserType] = useState("Site Manager");
  const [userId, setUserId] = useState("6361784ffd4e045a5e549e7c");

  function setType(type) {
    setUserType(type);
  }

  function logout() {
    setUserType(null);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  /* Returning the AuthContext.Provider component with the value of userType and status. */
  return (
    <AuthContext.Provider value={{ userId, userType, setType, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
