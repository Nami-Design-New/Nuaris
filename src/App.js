import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./components/dashboard/layout/Dashboard";

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
            <Route path="/logout" element={<Logout />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Provider>
      </CookiesProvider>
    </main>
  );
};

export default App;
