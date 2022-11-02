import LogOut from "../userManagement/authentication/Logout";
import { FaDashcube } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import "./styles/SidebarStyles.css";
import AuthContext from "../userManagement/context/UserContext";
import { useContext } from "react";

export default function Sidebar() {
  const { userType } = useContext(AuthContext);
  var SidebarData;
  if (userType === "Manager") {
    SidebarData = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaDashcube />,
      },
      {
        title: "Products",
        path: "/products",
        icon: <FaPuzzlePiece />,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: <FaCube />,
      },
      {
        title: "Suppliers",
        path: "/suppliers",
        icon: <FaTruck />,
      },
      {
        title: "Users",
        path: "/users",
        icon: <FaUsers />,
      },
    ];
  } else if (userType === "Supplier") {
    SidebarData = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaDashcube />,
      },
      {
        title: "Products",
        path: "/products",
        icon: <FaPuzzlePiece />,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: <FaCube />,
      }
    ];
  } else if (userType === "Accountant") {
    SidebarData = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaDashcube />,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: <FaCube />,
      }
    ];
  } else if (userType === "Site Manager") {
    SidebarData = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FaDashcube />,
      },
      {
        title: "Orders",
        path: "/orders",
        icon: <FaCube />,
      }
    ];
  }

  return (
    <div className="sidebar">
      <div className="brand">
        <span className="title1">EyePax</span>
        <span className="title2">CONSTRUCTIONS</span>
      </div>
      <div className="links">
        <ul className="sidebar-list">
          {SidebarData.map((value, index) => {
            return (
              <li
                key={index}
                onClick={() => (window.location.pathname = value.path)}
                className="sidebar-item"
                id={window.location.pathname === value.path ? "selected" : ""}
              >
                <div id="icon">{value.icon}</div>
                <div id="title">{value.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <LogOut />
    </div>
  );
}
