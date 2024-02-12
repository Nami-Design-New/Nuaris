import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";

const AgentDashboard = () => {
  return (
    <ProtectedRoute>
      <div>AgentDashboard</div>
    </ProtectedRoute>
  );
};

export default AgentDashboard;
