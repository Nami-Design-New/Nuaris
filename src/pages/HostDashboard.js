import React, { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import SideBar from "./../components/ui/dashboard/SideBar";
import NavBar from "../components/ui/dashboard/NavBar";
import Footer from "./../components/ui/dashboard/Footer";

const HostDashboard = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <ProtectedRoute>
      <SideBar sideBarOpen={sideBarOpen} />
      <div className={`main_wrap ${sideBarOpen ? "expand" : ""}`}>
        <NavBar setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} />
        <main className="main_wrapper">
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
