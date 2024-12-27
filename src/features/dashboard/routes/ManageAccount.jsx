import { Outlet } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import SideBar from "../components/manage-account/SideBar";

const ManageAccount = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Manage Your Nuaris Account" />
      </header>
      <div className="row">
        <div className="col-lg-3 col-12 p-2">
          <SideBar />
        </div>
        <div className="col-lg-9 col-12 p-2">
          <main className="routes_wrapper">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
};

export default ManageAccount;
