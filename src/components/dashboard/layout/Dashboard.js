import HostDashboard from "../../../pages/HostDashboard";
import AgentDashboard from "../../../pages/AgentDashboard";
import { ROLES } from "../../../constants";
import UserSupport from "../../../pages/UserSupport";

export default function Dashboard() {
  // const [cookies] = useCookies();
  // // const role = cookies.role;
  // const idExist = cookies.id;
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!idExist) {
  //     navigate("/login");
  //   }
  // }, [idExist, navigate]);
  // const user = useUserFromCookies();

  // TODO: remove
  const role = "host";

  if (role === ROLES.HOST) {
    return <HostDashboard />;
  }

  if (role === ROLES.AGENT) {
    return <AgentDashboard />;
  }

  if (role === ROLES.SERVICE_PROVIDER) {
    return <UserSupport />;
  }
}
