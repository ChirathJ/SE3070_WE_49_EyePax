import React from "react";
import ViewProducts from "./screens/ViewProducts";

import {AuthContextProvider} from "./src/context/UserContext";
import AppNav from "./src/navigation/AppNav";

function App() {
  return (
    <AuthContextProvider>
      <AppNav />
      <ViewProducts/>
    </AuthContextProvider>
  );
};


export default App;

