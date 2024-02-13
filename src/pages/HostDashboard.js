import React, { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "./../components/ui/dashboard/SideBar";
import NavBar from "../components/ui/dashboard/NavBar";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <ProtectedRoute>
      <SideBar sideBarOpen={sideBarOpen} />
      <div className={`main_wrap ${sideBarOpen ? "expand" : ""}`}>
        <NavBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
      </div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
