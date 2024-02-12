import React from "react";
import ProtectedRoute from "./../components/ProtectedRoute";

const ServicesProviderDashboard = () => {
  return (
    <ProtectedRoute>
      <div>ServicesProviderDashboard</div>
    </ProtectedRoute>
  );
};

export default ServicesProviderDashboard;
