import React from "react";
import { NavLink } from "react-router-dom";
import settingsIcon from "../../../assets/images/settings.svg";
import notificationIcon from "../../../assets/images/notification.svg";
import avatar from "../../../assets/images/avatar.png";

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
      <div className="settings">
        <ul>
          <li>
            <NavLink to="/host-dashboard/settings">
              <img src={settingsIcon} alt="setting-icon" />
            </NavLink>
          </li>
          <li className="notification">
            <NavLink to="/host-dashboard/settings">
              <img src={notificationIcon} alt="notification-icon" />
              <span className="number">3</span>
            </NavLink>
          </li>
          <li className="profile">
            <div className="dropdownButton">
              <div className="avatar">
                <img src={avatar} alt="avatar" />
              </div>
              <div className="name">
                <h6>
                  Amwaj Al Bahar <i className="fa-regular fa-angle-right" />
                </h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
