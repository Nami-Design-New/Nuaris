import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import PageHeader from "../../layout/shared/PageHeader";
import SideBar from "../../layout/fleet/SideBar";
import Media from "./Media";
import Pricing from "./Pricing";
import MoreInfo from "./MoreInfo";
import MainInfo from "./MainInfo";
import WorkingHours from "./WorkingHours";
import AddOnsConnected from "./AddOnsConnected";
import BoatSpecification from "./BoatSpecification";
import VesselStatusForm from "../../layout/fleet/VesselStatusForm";
import axios from "../../../../util/axios";

const AddYacht = () => {
  const [yacht, setYacht] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchYacht = async () => {
      try {
        const response = await axios.get(`/yachts/${id}/`);
        setYacht(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchYacht();
    }
  }, [id]);

  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name={yacht ? "Edit yacht / boat" : "Add a new yacht / boat"} />
      </header>
      <div className="row m-0">
        <div className="col-lg-4 col-12 p-2">
          <div className="sideBar_wrap">
            <SideBar />
            <VesselStatusForm yacht={yacht} />
          </div>
        </div>
        <div className="col-lg-8 col-12 p-2">
          <Routes>
            <Route path="/" element={<MainInfo yacht={yacht} />} />
            <Route path="/media-photos" element={<Media yacht={yacht} />} />
            <Route
              path="/boat-specification"
              element={<BoatSpecification yacht={yacht} />}
            />
            <Route
              path="/working-hours"
              element={<WorkingHours yacht={yacht} />}
            />
            <Route path="/pricing" element={<Pricing yacht={yacht} />} />
            <Route
              path="/add-ons-connected"
              element={<AddOnsConnected yacht={yacht} />}
            />
            <Route path="/more-info" element={<MoreInfo yacht={yacht} />} />
            <Route path="*" element={<MainInfo yacht={yacht} />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default AddYacht;
