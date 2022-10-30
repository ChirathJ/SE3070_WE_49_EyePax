import React from "react";
import { SidebarData } from "./SidebarData";
import "./styles/SidebarStyles.css";

export default function Sidebar() {
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
    </div>
  );
}
