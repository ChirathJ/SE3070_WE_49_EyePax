import React from "react";

import { AuthContextProvider } from "./src/context/UserContext";
import AppNav from "./src/navigation/AppNav";

function App() {
  return (
    <AuthContextProvider>
      <AppNav />
    </AuthContextProvider>
  );
}

export default App;
