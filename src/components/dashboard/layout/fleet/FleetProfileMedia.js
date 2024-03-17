import React from "react";
import MapCard from "../../../ui/map-modal/MapCard";
import FleetMediaSwiper from "../../layout/fleet/FleetMediaSwiper";
import { COUNTRIES_NAMES } from "../../../../constants";

export default function FleetProfileMedia({ fleet }) {
  const getCountryName = (countryCode) => {
    return COUNTRIES_NAMES[countryCode] || countryCode;
  };

  return (
    <React.Fragment>
      <div className="col-lg-5 col-12 p-2">
        <FleetMediaSwiper
          media={{ images: fleet?.images, video: fleet?.video_link }}
        />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard
          title={"Vessel Location"}
          location={`${fleet?.city}, ${getCountryName(fleet?.country)}`}
          lat={fleet?.location?.lat}
          lng={fleet?.location?.lng}
        />
      </div>
      <div className="col-lg-auto flex-grow-1 col-12 p-2">
        <MapCard
          title={"Meeting Client Place"}
          location={`${fleet?.city}, ${getCountryName(fleet?.country)}`}
          lat={fleet?.meeting_location?.lat}
          lng={fleet?.meeting_location?.lng}
        />
      </div>
    </React.Fragment>
  );
}
