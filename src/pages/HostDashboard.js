import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const HostDashboard = () => {
  return (
    <ProtectedRoute>
      <div>HostDashboard</div>
    </ProtectedRoute>
  );
};

export default HostDashboard;
