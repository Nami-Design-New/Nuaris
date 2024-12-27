import { NavLink } from "react-router-dom";
import sidebarData from "./sidebarData";

export default function SideBar({ createdYachtId, id }) {
  return (
    <aside className="fleet_side_bar">
      <ul className="navigation_menu">
        {sidebarData.map((item, index) => (
          <li className="nav_item" key={index} title={item.label}>
            <NavLink
              end
              to={
                createdYachtId
                  ? `${item.path}?yacht_id=${createdYachtId}`
                  : id && item.path === "/dashboard/fleet/add-yacht"
                  ? `/dashboard/fleet/edit-yacht/${id}/`
                  : item.path
              }
            >
              <img src={item.icon} alt={item.alt} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
