import { FaDashcube } from "react-icons/fa";
import { FaPuzzlePiece } from "react-icons/fa";
import { FaCube } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export const SidebarData = [
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
