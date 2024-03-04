import HostDashboard from "../../../pages/HostDashboard";
import AgentDashboard from "../../../pages/AgentDashboard";
import { ROLES } from "../../../constants";
import UserSupport from "../../../pages/UserSupport";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import axios from "../../../util/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUser,
} from "../../../redux/slices/authenticatedUserSlice";

export default function Dashboard() {
  const [cookies, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);

  const refreshToken = cookies?.refreshToken;
  const { decodedToken, isExpired } = useJwt(refreshToken || "");

  useEffect(() => {
    if (!refreshToken) {
      navigate("/login");
      removeCookie("refreshToken");
    }

    if (decodedToken && !isExpired) {
      const userId = decodedToken?.user_id;
      const user = axios.get(`/users/${userId}`);
      user
        .then((res) => {
          dispatch(setUser(res.data));
          setUserRole(res.data.current_role);
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });

      const token = axios.post(`/users/token/refresh/`, {
        refresh: refreshToken,
      });

      token
        .then((res) => {
          dispatch(setToken(res.data.access));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.access}`;
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    } else if (isExpired) {
      navigate("/login");
      removeCookie("refreshToken");
    }
  }, [decodedToken, isExpired, dispatch, refreshToken, navigate, removeCookie]);

  // - render dashboard based on user role
  if (userRole === ROLES.HOST) {
    return <HostDashboard />;
  }

  if (userRole === ROLES.AGENT) {
    return <AgentDashboard />;
  }

  if (userRole === ROLES.SERVICE_PROVIDER) {
    return <UserSupport />;
  }

  return null;
}
