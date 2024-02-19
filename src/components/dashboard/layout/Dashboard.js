import HostDashboard from "../../../pages/HostDashboard";
import AgentDashboard from "../../../pages/AgentDashboard";
import { ROLES } from "../../../constants";
import ServicesProviderDashboard from "../../../pages/ServicesProviderDashboard";
import { useUserFromCookies } from "../../../hooks/UserAuthed";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [cookies] = useCookies();
  // const role = cookies.role;
  const idExist = cookies.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!idExist) {
      navigate("/login");
    }
  }, [idExist, navigate]);

  const user = useUserFromCookies();

  // TODO: remove
  const role = "host";

  if (role === ROLES.HOST) {
    return <HostDashboard />;
  }

  if (role === ROLES.AGENT) {
    return <AgentDashboard />;
  }

  if (role === ROLES.SERVICE_PROVIDER) {
    return <ServicesProviderDashboard />;
  }

  return <>user support</>;
}
