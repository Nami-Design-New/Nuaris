import axios from "../util/axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setLogged, setUser } from "../redux/slices/authedUser";

const Logout = () => {
  const [, , deleteCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        delete axios.defaults.headers.common["Authorization"];
        deleteCookie("refreshToken", { path: "/" });
        dispatch(setUser({}));
        dispatch(setLogged(false));
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    performLogout();
  }, [deleteCookie, dispatch, navigate]);

  return null;
};

export default Logout;
