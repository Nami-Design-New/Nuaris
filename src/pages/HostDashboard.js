import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// layout elements
import NavBar from "../components/dashboard/layout/NavBar";
import Footer from "../components/dashboard/layout/Footer";
import SideBar from "../components/dashboard/layout/SideBar";
// nav pages
import Nssm from "../components/dashboard/pages/Nssm";
// invite use and permissions
import InviteUser from "../components/dashboard/pages/inviteAndPermissions/InviteUser";
import CreateUser from "../components/dashboard/pages/inviteAndPermissions/CreateUser";
import Permissions from "./../components/dashboard/pages/inviteAndPermissions/Permissions";
import CreatePermission from "../components/dashboard/pages/inviteAndPermissions/CreatePermission";
import EditPermissions from "../components/dashboard/pages/inviteAndPermissions/EditPermissions";
import EditUser from "../components/dashboard/pages/inviteAndPermissions/EditUser";
// fleet
import Fleet from "../components/dashboard/pages/fleet/Fleet";
import AddYacht from "../components/dashboard/pages/fleet/AddYacht";
import FleetProfile from "../components/dashboard/pages/fleet/FleetProfile";
// addons
import AddOns from "../components/dashboard/pages/addons/AddOns";
import AddNewAddOn from "../components/dashboard/pages/addons/AddNewAddOn";
// trip packages
import TripPackages from "../components/dashboard/pages/packages/TripPackages";
import TripPackagesForm from "../components/dashboard/pages/packages/TripPackagesForm";
// activities
import Activities from "../components/dashboard/pages/activites/Activities";
import ActivitiesForm from "../components/dashboard/pages/activites/ActivitiesForm";
// mange account
import ManageAccount from "../components/dashboard/pages/manage-account/ManageAccount";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

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
            <Route path="/addons/edit-addon/:id" element={<AddNewAddOn />} />
            {/* trip packages */}
            <Route path="/trip-packages" element={<TripPackages />} />
            <Route
              path="/trip-packages/create-package"
              element={<TripPackagesForm />}
            />
            <Route
              path="/trip-packages/edit-package/:id"
              element={<TripPackagesForm />}
            />
            {/* activities */}
            <Route path="/activities" element={<Activities />} />
            <Route
              path="/activities/add-new-activity"
              element={<ActivitiesForm />}
            />
            {/* manage account */}
            <Route path="/manage-account" element={<ManageAccount />} />
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
