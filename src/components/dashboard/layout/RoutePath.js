import { Link } from "react-router-dom";
import useRoutes from "../../../hooks/useRoutes";
import React from "react";

export default function RoutePath({ hint }) {
  const { routes } = useRoutes();

  return (
    <div className="route_path">
      {routes.map((route, i) => {
        const isLast = i === routes.length - 1;
        return (
          <React.Fragment>
            <Link className={isLast && "disabled"} to={route.to}>
              {route.name}
            </Link>
            {!isLast && <span> / </span>}
          </React.Fragment>
        );
      })}
      {hint &&
        <small>
          {" "}{hint}
        </small>}
    </div>
  );
}
