import { useState } from "react";
import { NavLink } from "react-router-dom";
import { s3Url } from "../../../utils/constants";
import SettingsMenu from "./SettingsMenu";
import NotificationMenu from "./NotificationMenu";
import ProfileMenu from "./ProfileMenu";
import useGetOrganizationInfo from "../../../hooks/user/useGetOrganizationInfo";

export default function NavBar({ manualExpand, setManualExpand }) {
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { data: organization } = useGetOrganizationInfo();

  return (
    <nav className="navbar">
      <div className="links">
        <ul>
          <li>
            <button
              className={`menuToggler ${manualExpand === true ? "expand" : ""}`}
              onClick={() => setManualExpand(!manualExpand)}
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
            <NavLink to="/dashboard/bookings-scheduling">
              Bookings & scheduling
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="settings">
        <ul>
          <li className="settings-gear">
            <NavLink
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              to={null}
            >
              <img src="/images/icons/settings.svg" alt="setting-icon" />
            </NavLink>
            <SettingsMenu
              setIsOpen={setIsSettingsOpen}
              isOpen={isSettingsOpen}
            />
          </li>

          <li className="notification">
            <NavLink
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              to={null}
            >
              <img
                src="/images/icons/notification.svg"
                alt="notification-icon"
              />
              <span className="number">3</span>
            </NavLink>
            <NotificationMenu
              setIsOpen={setIsNotificationOpen}
              isOpen={isNotificationOpen}
            />
          </li>

          <li className="profile">
            <div
              className="dropdownButton"
              onClick={() => setProfileDropDown(!profileDropDown)}
            >
              <div className="avatar">
                <img
                  src={s3Url + organization?.logo || "/images/fav.svg"}
                  alt="avatar"
                />
              </div>
              <div className="name">
                <h6 className={profileDropDown ? "animate" : ""}>
                  {organization?.commercial_name || "Organization Name"}
                  <i className="fa-regular fa-angle-right" />
                </h6>
              </div>
            </div>
          </li>
        </ul>
        <ProfileMenu
          profileDropDown={profileDropDown}
          organization={organization}
          setProfileDropDown={setProfileDropDown}
        />
      </div>
    </nav>
  );
}
