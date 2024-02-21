import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import settingsIcon from "../../../assets/images/settings.svg";
import notificationIcon from "../../../assets/images/notification.svg";
import fav from "../../../assets/images/fav.svg";
import ProfileDropMenu from "./ProfileDropMenu";
import { useSelector } from "react-redux";

const NavBar = ({ setSideBarOpen, sideBarOpen }) => {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const user = useSelector((state) => state.user.user);
  const subUsers = useSelector((state) => state.users.users);

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
            <NavLink to="/dashboard" end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/live-tracker">live tracker</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/NSSM">NSSM</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/Bookings-scheduling">
              Bookings & scheduling
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="settings">
        <ul>
          <li>
            <NavLink to="/dashboard/settings">
              <img src={settingsIcon} alt="setting-icon" />
            </NavLink>
          </li>
          <li className="notification">
            <NavLink to="/dashboard/settings">
              <img src={notificationIcon} alt="notification-icon" />
              <span className="number">3</span>
            </NavLink>
          </li>
          <li className="profile">
            <div
              className="dropdownButton"
              onClick={() => setProfileDropDown(!profileDropDown)}
            >
              <div className="avatar">
                <img src={user && user.logo ? user.logo : fav} alt="avatar" />
              </div>
              <div className="name">
                <h6 className={profileDropDown ? "animate" : ""}>
                  {user && user.commercial_name
                    ? user.commercial_name
                    : "Amwaj Al Bahar"}{" "}
                  <i className="fa-regular fa-angle-right" />
                </h6>
              </div>
            </div>
          </li>
        </ul>
        <ProfileDropMenu
          profileDropDown={profileDropDown}
          user={user}
          subUsers={subUsers}
          setProfileDropDown={setProfileDropDown}
        />
      </div>
    </nav>
  );
};

export default NavBar;
