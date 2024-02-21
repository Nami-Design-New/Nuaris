import { Link } from "react-router-dom";
import useRoutes from "../../../hooks/useRoutes";

export default function RoutePath({ hint }) {
  const { routes } = useRoutes();

  return (
    <div className="route_path">
      {routes.map((route, i) => {
        // check if the current element is the last one
        const isLast = i === routes.length - 1;
        return (
          <>
            <Link className={isLast && "disabled"} to={route.to}>
              {route.name}
            </Link>
            {!isLast && <span> / </span>}
          </>
        );
      })}
      {hint && <small> {hint}</small>}
    </div>
  );
}
