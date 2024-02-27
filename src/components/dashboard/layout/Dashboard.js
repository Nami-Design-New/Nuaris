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
import { setUser } from "../../../redux/slices/authenticatedUserSlice";

export default function Dashboard() {
  const [cookies, , removeCookie] = useCookies();
  const token = cookies.token;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(null);

  if (!token) navigate("/login");

  const { decodedToken, isExpired } = useJwt(token);
  const userId = decodedToken?.user_id;

  async function getUser(userId) {
    const res = await axios.get(`/users/${userId}`);
    const { id, subuser_set } = res?.data;

    const userRole = subuser_set?.map((e) => (e.id === id ? e.role : null))[0];

    setUserRole(userRole);
    dispatch(setUser(res?.data));
  }

  // - if no userId redirect to login
  if (decodedToken && (!userId || isExpired)) {
    removeCookie("token");
    navigate("/login");
  } else if (decodedToken) {
    // - fetch user with id
    getUser(userId);
  } else {
    navigate("/login");
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
}
