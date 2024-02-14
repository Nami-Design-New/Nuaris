import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import HostDashboard from "./pages/HostDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import ServicesProviderDashboard from "./pages/ServicesProviderDashboard";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";

const App = () => {
  return (
    <main className="App">
      <ToastContainer />
      <CookiesProvider>
        <Provider store={store}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/host-dashboard/*" element={<HostDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route
              path="/service-provider-dashboard"
              element={<ServicesProviderDashboard />}
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </Provider>
      </CookiesProvider>
    </main>
  );
};

export default App;
