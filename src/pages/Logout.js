import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authenticatedUserSlice";

export default function Logout() {
  const [, , deleteCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteCookie("refreshToken");
    navigate("/login");
    dispatch(logout());
  }, [deleteCookie, navigate, dispatch]);
  return null;
}
