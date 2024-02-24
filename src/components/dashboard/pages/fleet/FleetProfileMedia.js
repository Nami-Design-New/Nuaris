import MapCard from "../../../ui/map-modal/MapCard";
import FleetMediaSwiper from "../../layout/fleet/FleetMediaSwiper";

export default function FleetProfileMedia({ fleet }) {
  return (
    <div className="row container fleet-page-first-row mx-auto">
      <div className="col-lg-5 col-12 p-2">
        <FleetMediaSwiper media={fleet?.media} />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard />
      </div>
    </div>
  );
}
