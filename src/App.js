import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ServicesProviderDashboard from "./pages/ServicesProviderDashboard";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { CookiesProvider } from "react-cookie";
import Dashboard from "./components/dashboard/layout/Dashboard";

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
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route
              path="/service-provider-dashboard/*"
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
