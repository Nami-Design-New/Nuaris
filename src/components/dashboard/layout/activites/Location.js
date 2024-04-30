import React, { useEffect, useState } from "react";

import SubmitButton from "../../../ui/form-elements/SubmitButton";
import MapWithMarker from "../../../ui/map-modal/MapWithMarker";
import CustomInputField from "../../../ui/form-elements/CustomInputField";
const Location = ({ setForm }) => {
  const [loading, setLoading] = useState(false);
  const [serchedPlace, setSerchedPlace] = useState("Search on Map");
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Working hours");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };

  const [LocationPoint, setLocationPoint] = useState({
    lat: 30.04442,
    lng: 46.6753,
  });

  const [formData, setFormData] = useState({
    location_point: LocationPoint,
    location_name: "",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Location</h6>
        </div>
        {/* location */}
        <div className="col-12 p-2">
          <CustomInputField
            label={"Location Name"}
            placeholder={"write here"}
            value={formData.location_name}
            onChange={(e) =>
              setFormData({ ...formData, location_name: e.target.value })
            }
          />
        </div>
        <div className="col-12 p-2">
          {mapLoaded && (
            <MapWithMarker
              formData={LocationPoint}
              setFormData={setLocationPoint}
              setSerchedPlace={setSerchedPlace}
            />
          )}
        </div>
        <div className="col-12 p-2 pt-4 d-flex gap-3">
          <button className="next_btn" onClick={handleBack}>
            Back
          </button>
          <SubmitButton
            loading={loading}
            name="Save"
            className="save_btn ms-auto"
          />
          <button className="next_btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Location;
