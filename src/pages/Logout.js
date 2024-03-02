import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [, , deleteCookie] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    deleteCookie("token");
    navigate("/login");
  }, [deleteCookie, navigate]);
  return null;
}
