import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/dashboard/layout/NavBar";
import Footer from "../components/dashboard/layout/Footer";
import SideBar from "../components/dashboard/layout/SideBar";
import Nssm from "../components/dashboard/pages/Nssm";
import InviteUser from "../components/dashboard/pages/InviteUser";
import CreateUser from "../components/dashboard/pages/CreateUser";
import Permissions from "./../components/dashboard/pages/Permissions";
import CreatePermission from "../components/dashboard/pages/CreatePermission";
import EditPermissions from "../components/dashboard/pages/EditPermissions";
import Fleet from "../components/dashboard/pages/Fleet";
import AddYacht from "../components/dashboard/pages/AddYacht";
import FleetProfile from "../components/dashboard/pages/fleet/FleetProfile";
import axios from "../util/axios";
import { useDispatch } from "react-redux";
import { setPositions } from "../redux/slices/positions";
import EditUser from "../components/dashboard/pages/EditUser";
import AddOns from "../components/dashboard/pages/AddOns";
import AddNewAddOn from "../components/dashboard/pages/AddNewAddOn";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const dispatch = useDispatch();

  async function getAllData() {
    const positions = axios.get("/positions/?page_size=1000");
    const [positionsData] = await Promise.all([positions]);
    dispatch(setPositions(positionsData.data));
  }
  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <div className={`main_wrap ${sideBarOpen ? "expand" : ""}`}>
        <NavBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
        <main className="main_wrapper">
          <Routes>
            <Route path="/NSSM" element={<Nssm />} />
            {/* invite-user */}
            <Route path="/invite-user/" element={<InviteUser />} />
            <Route path="/invite-user/create-user" element={<CreateUser />} />
            <Route path="/invite-user/permissions" element={<Permissions />} />
            <Route
              path="/invite-user/edit-user/:employeeId"
              element={<EditUser />}
            />
            <Route
              path="/invite-user/permissions/edit-permissions/:groupId"
              element={<EditPermissions />}
            />
            <Route
              path="/invite-user/permissions/create-permissions"
              element={<CreatePermission />}
            />
            {/* fleets */}
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/fleet/:fleetId" element={<FleetProfile />} />
            <Route path="/fleet/add-yacht/*" element={<AddYacht />} />
            {/* add ons */}
            <Route path="/addons" element={<AddOns />} />
            <Route path="/addons/add-new-addon" element={<AddNewAddOn />} />
            {/* error redirect */}
            <Route path="*" element={<>404 page</>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HostDashboard;
