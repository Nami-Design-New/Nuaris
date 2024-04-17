import React from "react";
import PageHeader from "../../layout/PageHeader";
import SideBar from "../../layout/manage-account/SideBar";
import { Route, Routes } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import RegisterVat from "./RegisterVat";

const ManageAccount = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Manage Your Nuaris Account" />
      </header>
      <div className="row m-0">
        <div className="col-lg-4 col-12 p-2">
          <SideBar />
        </div>
        <div className="col-lg-8 col-12 p-2">
          <main className="routes_wrapper">
            <Routes>
              <Route path="/" element={<ProfileInfo />} />
              <Route path="/register-vat" element={<RegisterVat />} />
              <Route
                path="/inovice-design-settings"
                element={<RegisterVat />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ManageAccount;
