import HostDashboard from "../../../pages/HostDashboard";
import AgentDashboard from "../../../pages/AgentDashboard";
import { ROLES } from "../../../constants";
import UserSupport from "../../../pages/UserSupport";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import axios from "../../../util/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setToken,
  setUser,
} from "../../../redux/slices/authenticatedUserSlice";

export default function Dashboard() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authedUser = useSelector((state) => state.user.user);
  const refreshToken = cookies?.refreshToken;

  if (!refreshToken) {
    navigate("/logout");
  }

  const { decodedToken, isExpired } = useJwt(refreshToken || "");

  useEffect(() => {
    if (isExpired || !refreshToken) {
      return navigate("/logout");
    }
    if (!authedUser.id && decodedToken?.user_id) {
      const userId = decodedToken?.user_id;
      // get user
      axios
        .get(`/users/${userId}`, {
          headers: {
            Authorization: null,
          },
        })
        .then((res) => {
          dispatch(setUser(res.data));
        });
    }
    // get token
    axios
      .post(`/users/token/refresh/`, {
        refresh: refreshToken,
      })
      .then((res) => {
        dispatch(setToken(res.data.access));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
      });
  }, [authedUser, decodedToken, dispatch, isExpired, navigate, refreshToken]);

  // - render dashboard based on user role
  if (!authedUser.id) {
    return null;
  }
  if (authedUser.current_role === ROLES.HOST) {
    return <HostDashboard />;
  }
  if (authedUser.current_role === ROLES.AGENT) {
    return <AgentDashboard />;
  }
  if (authedUser.current_role === ROLES.SERVICE_PROVIDER) {
    return <UserSupport />;
  }
  return null;
}
