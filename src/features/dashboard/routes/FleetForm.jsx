import { useState } from "react";
import PageHeader from "./../layout/PageHeader";
import { useParams } from "react-router-dom";
import SideBar from "../components/fleet/SideBar";

export default function FleetForm() {
  const [yacht, setYacht] = useState({});
  const { id } = useParams();
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader
          name={id ? "Edit yacht / boat" : "Add a new yacht / boat"}
        />
      </header>
      <div className="row m-0">
        <div className="col-lg-3 col-12 p-2">
          <div className="sideBar_wrap">
            <SideBar />
            {/* <VesselStatusForm yacht={yacht} /> */}
          </div>
        </div>
        {/* <div className="col-lg-9 col-12 p-2">
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
        </div> */}
      </div>
    </section>
  );
}
