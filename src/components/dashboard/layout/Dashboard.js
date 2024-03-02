import HostDashboard from "../../../pages/HostDashboard";
import AgentDashboard from "../../../pages/AgentDashboard";
import { ROLES } from "../../../constants";
import UserSupport from "../../../pages/UserSupport";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import axios from "../../../util/axios";
import { useState } from "react";
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
  const userId = decodedToken?.user_id;

  async function getUser(userId) {
    // Important: prevent re-rendering if userRole is already set
    if (userRole) return;
    const res = await axios.get(`/users/${userId}`);
    const access = await axios.post("/users/token/verify/", {
      refresh: refreshToken,
    });

    const { subuser_set } = res?.data;

    const requestRole = subuser_set[0].role;
    setUserRole(requestRole);
    dispatch(setUser(res?.data));
    dispatch(setToken(access.data.access));

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${access.data.access}`;
  }

  // - if no userId redirect to login
  if (decodedToken && (!userId || isExpired)) {
    removeCookie("refreshToken");
    return navigate("/login");
  } else if (decodedToken) {
    // - fetch user with id
    getUser(userId);
  } else {
    return navigate("/login");
  }

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
