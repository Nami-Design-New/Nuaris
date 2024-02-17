import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/logoH.svg";
import fav from "../../../assets/images/fav.svg";
import sidebarData from "./sidebarData";

const SideBar = ({ sideBarOpen }) => {
  return (
    <aside className={`side_bar ${sideBarOpen ? "expand" : ""}`}>
      <div className="logo_wrapper">
        <span className="logo-lg">
          <img src={logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <img src={fav} alt="fav" />
        </span>
      </div>
      <ul className="navigation_menu">
        {sidebarData.map((item, index) => (
          <li className="nav_item" key={index} title={item.label}>
            <NavLink to={item.path}>
              <img src={item.icon} alt={item.alt} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
