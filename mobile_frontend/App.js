<<<<<<< HEAD
import React from 'react';
import AddProduct from './screens/AddProduct'

const App = () => {
  return (
      <AddProduct/>
=======
import React from "react";

import {AuthContextProvider} from "./src/context/UserContext";
import AppNav from "./src/navigation/AppNav";

function App() {
  return (
    <AuthContextProvider>
      <AppNav />
    </AuthContextProvider>
>>>>>>> c7659c91f4eced703466c91a3318f3a12567b2a7
  );
};

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c7659c91f4eced703466c91a3318f3a12567b2a7
