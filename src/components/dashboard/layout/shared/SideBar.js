import React, { useState } from "react";
import logo from "../../../../assets/images/logoH.svg";
import fav from "../../../../assets/images/fav.svg";
import sidebarData from "./sidebarData";
import { Accordion } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  const [hoverExpand, setHoverExpand] = useState(false);

  return (
    <aside
      className={`side_bar ${sideBarOpen ? "expand" : ""} ${
        hoverExpand ? "hoverExpand" : ""
      }`}
      onMouseEnter={() => setHoverExpand(true)}
      onMouseLeave={() => setHoverExpand(false)}
    >
      <div className="logo_wrapper">
        <span className="logo-lg">
          <img src={logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <img src={fav} alt="fav" />
        </span>
      </div>
      <ul className="navigation_menu">
        {sidebarData?.map((item, index) => (
          <Accordion defaultActiveKey={null}>
            <Accordion.Item eventKey={index}>
              <Accordion.Header className="nav_item">
                <NavLink end to={item.path} className="nav_link">
                  <img src={item.icon} alt={item.alt} />
                  <span>{item.label}</span>
                </NavLink>
              </Accordion.Header>
              {item?.submenu && (
                <Accordion.Body className="sub_menu">
                  <ul className="sub_navigation_menu">
                    {item?.submenu.map((item, index) => (
                      <>
                        <li className="sub_nav_item nav_item">
                          <NavLink className="nav_link" to={item.path}>
                            <span>{item.label}</span>
                          </NavLink>
                        </li>
                      </>
                    ))}
                  </ul>
                </Accordion.Body>
              )}
            </Accordion.Item>
          </Accordion>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
