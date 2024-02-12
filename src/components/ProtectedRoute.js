import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const hasCookie = cookies.token;

  useEffect(
    () => {
      if (!hasCookie) navigate("/login");
    },
    [hasCookie, navigate]
  );
  return hasCookie ? children : null;
};

export default ProtectedRoute;
