import React from "react";
import { Route, Routes } from "react-router-dom";
import PageHeader from "../layout/PageHeader";
import SideBar from "../layout/fleet/SideBar";
import Media from "./fleet/Media";
import Pricing from "./fleet/Pricing";
import MoreInfo from "./fleet/MoreInfo";
import MainInfo from "./fleet/MainInfo";
import WorkingHours from "./fleet/WorkingHours";
import AddOnsConnected from "./fleet/AddOnsConnected";
import BoatSpecification from "./fleet/BoatSpecification";

const AddYacht = () => {
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Add a new yacht / boat" />
      </header>
      <div className="row m-0">
        <div className="col-lg-4 col-12 p-2">
          <SideBar />
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
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default AddYacht;
