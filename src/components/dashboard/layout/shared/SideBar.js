import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/images/logoH.svg";
import fav from "../../../../assets/images/fav.svg";
import submenuIcon from "../../../../assets/images/arrow-right.svg"
import sidebarData from "./sidebarData";
import SideBarSubMenu from "./SideBarSubMenu";
import { useState } from "react";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState("");

  function handleOpeningSubmenus(submenu) {
    if (submenu === submenuOpen) {
      console.log(submenu);
      setSubmenuOpen("");
    } else {
      setSubmenuOpen(submenu);
    }
  }

  function handlExpandAsideWhenHover(e){
    if (!sideBarOpen) {
      setSideBarOpen(true);
    }
  }

  return (
    <aside className={`side_bar ${sideBarOpen ? "expand" : ""}`} onMouseOver={handlExpandAsideWhenHover}>
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
          <li className="nav_item" key={index} title={item.label} onClick={() => handleOpeningSubmenus(item.label)}>
            <NavLink end to={item.path} >
              <img src={item.icon} alt={item.alt} />
              {item.label}
              {item?.submenu && 
              <span className={`arrowBox ${submenuOpen === item.label ? "flip" : ""}`} >
                <img src={submenuIcon} alt="toggle submenu" />
              </span>
              }
            </NavLink>
            
            {item?.submenu && <SideBarSubMenu submenu={item?.submenu} isOpen={submenuOpen === item.label} sideBarOpen={sideBarOpen} />}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
