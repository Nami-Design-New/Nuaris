import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "../../layout/PageHeader";
import SideBar from "../../layout/fleet/SideBar";
import Media from "./Media";
import Pricing from "./Pricing";
import MoreInfo from "./MoreInfo";
import MainInfo from "./MainInfo";
import WorkingHours from "./WorkingHours";
import AddOnsConnected from "./AddOnsConnected";
import BoatSpecification from "./BoatSpecification";
import VesselStatusForm from "../../layout/fleet/VesselStatusForm";

const AddYacht = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Add a new yacht / boat" />
      </header>
      <div className="row m-0">
        <div className="col-lg-4 col-12 p-2">
          <div className="sideBar_wrap">
            <SideBar />
            <VesselStatusForm />
          </div>
        </div>
        <div className="col-lg-8 col-12 p-2">
          <Routes>
            <Route path="/" element={<MainInfo />} />
            <Route path="/media-photos" element={<Media />} />
            <Route path="/boat-specification" element={<BoatSpecification />} />
            <Route path="/working-hours" element={<WorkingHours />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/add-ons-connected" element={<AddOnsConnected />} />
            <Route path="/more-info" element={<MoreInfo />} />
            <Route path="*" element={<MainInfo />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default AddYacht;
