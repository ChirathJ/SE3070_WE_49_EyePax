import axios from "axios";
import Router from "./components/routers/Router";
import { AuthContextProvider } from "./components/userManagement/context/UserContext";
import "./App.css";
import Sidebar from "./Components/Sidebar";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthContextProvider>
      <Sidebar />
      <Router />
    </AuthContextProvider>
  );
};

export default App;
