import { NavLink } from "react-router-dom";

function SideBarSubMenu({
  submenu,
  sideBarOpen,
  isOpen,
}) {

  return (
    <ul
      className={`navigation_menu sub_menu ${
        isOpen && sideBarOpen ? "show" : ""
      }`}
    >
      {submenu.map((item, index) => (
        <li className="nav_item" key={index} title={item.label}>
          <NavLink end to={item.path} >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default SideBarSubMenu;
