import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SideBarSubMenu from "./SideBarSubMenu";
import submenuIcon from "../../../../assets/images/arrow-right.svg";
import useRoutes from "../../../../hooks/useRoutes";
import { checkIsItemActive } from "../../../../util/helpers";

function NavigationItem({ item, sideBarOpen }) {
  const [submenuOpen, setSubmenuOpen] = useState("");
  const currentRoute = useRoutes().filteredRoutes.slice(-1).join();
  const isActive = checkIsItemActive(item, currentRoute);

  function handleOpeningSubmenus(submenu) {
    if (submenu === submenuOpen) {
      setSubmenuOpen("");
    } else {
      setSubmenuOpen(submenu);
    }
  }

  return (
    <li
      className="nav_item"
      title={item.label}
      onClick={() => handleOpeningSubmenus(item.label)}
    >
      {item?.submenu ? (
        <>
          <div className={`nav_link ${isActive ? "active" : ""}`}>
            <img src={item.icon} alt={item.alt} />
            {item.label}
            {item?.submenu && (
              <span
                className={`arrowBox ${
                  submenuOpen === item.label ? "flip" : ""
                }`}
              >
                <img src={submenuIcon} alt="toggle submenu" />
              </span>
            )}
          </div>
          <SideBarSubMenu
            submenu={item?.submenu}
            isOpen={submenuOpen === item.label}
            sideBarOpen={sideBarOpen}
          />
        </>
      ) : (
        <NavLink end to={item.path}>
          <img src={item.icon} alt={item.alt} />
          {item.label}
          {item?.submenu && (
            <span
              className={`arrowBox ${submenuOpen === item.label ? "flip" : ""}`}
            >
              <img src={submenuIcon} alt="toggle submenu" />
            </span>
          )}
        </NavLink>
      )}
    </li>
  );
}

export default NavigationItem;
