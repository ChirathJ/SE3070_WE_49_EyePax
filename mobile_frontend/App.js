import React from "react";

import { AuthContextProvider } from "./src/context/UserContext";
import AppNav from "./src/navigation/AppNav";
import Tabs from "./src/navigation/BottomNav";


function App() {
  return (
    <AuthContextProvider>
      <AppNav />
   
    </AuthContextProvider>
  );
}

export default App;
