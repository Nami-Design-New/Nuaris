import { useLocation } from "react-router-dom";
import capitalizeWord from "../util/capitalizeWord";

export default function useRoutes() {
  const { pathname } = useLocation();

  // get an array of all visited routes
  let filteredRoutes = pathname?.split("/");
  filteredRoutes = filteredRoutes.filter((e) => e !== "");

  // array of objects containing all links names and thier href
  // {name: string, to: string}
  const routes = [];

  // replace - with a space and capitalize
  const capitalizedRoutes = filteredRoutes.map((route) => {
    return route
      ?.split("-")
      .map((word) => capitalizeWord(word))
      .join(" ");
  });

  // assign route names and href to loobableRoutes array
  filteredRoutes.reduce((acc, curr, i) => {
    routes.push({
      name: capitalizedRoutes[i],
      to: acc + `/${curr}`,
    });
    return acc + `/${curr}`;
  }, "");

  return { routes, filteredRoutes, capitalizedRoutes };
}
