import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ setSideBarOpen, sideBarOpen }) => {
  return (
    <nav>
      <div className="links">
        <ul>
          <li>
            <button
              className={`menuToggler ${sideBarOpen === true ? "expand" : ""}`}
              onClick={() => setSideBarOpen(!sideBarOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </li>
          <li>
            <NavLink to="/host-dashboard">DashBoard</NavLink>
          </li>
          <li>
            <NavLink to="/host-dashboard/live-tracker">live tracker</NavLink>
          </li>
          <li>
            <NavLink to="/host-dashboard/NSSM">NSSM</NavLink>
          </li>
          <li>
            <NavLink to="/host-dashboard/Bookings-scheduling">
              Bookings & scheduling
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="settings" />
    </nav>
  );
};

export default NavBar;
