import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrency, setUser } from "../../../redux/slices/authedUser";
import useGetUser from "../../../hooks/user/useGetUser";
import SideBar from "./SideBar";
import Footer from "./Footer";
import NavBar from "./NavBar";
import useGetOrganizationInfo from "../../../hooks/user/useGetOrganizationInfo";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const { data: user } = useGetUser();
  const { data: organization } = useGetOrganizationInfo();
  const [hoverExpand, setHoverExpand] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
    if (organization) {
      dispatch(setCurrency(organization?.currency));
    }
  }, [user, dispatch, organization]);

  return (
    <>
      <SideBar
        manualExpand={manualExpand}
        setManualExpand={setManualExpand}
        hoverExpand={hoverExpand}
        setHoverExpand={setHoverExpand}
      />
      <main className={`main_wrap ${manualExpand ? "expand" : ""}`}>
        <NavBar manualExpand={manualExpand} setManualExpand={setManualExpand} />
        <div className="router_wrapper">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}
