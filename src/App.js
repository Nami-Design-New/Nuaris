import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Regiester from "./pages/Regiester";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <main className="App">
      <ToastContainer />
      <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Regiester />} />
          <Route path="/Reset-Password" element={<ResetPassword />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Provider>
    </main>
  );
};

export default App;
