import React, { useEffect, useState } from "react";
import MapLocationField from "../../../ui/form-elements/MapLocationField";
import MapModal from "../../../ui/map-modal/MapModal";
import DaysAccordion from "../../../ui/DaysAccordion";
import { DAYS } from "../../../../constants";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const LocationAndHoursForm = ({ setForm }) => {
  const [showModal, setShowModal] = useState(false);
  const [serchedPlace, setSerchedPlace] = useState("Search on Map");
  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Prices");
  };
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Main Info");
  };
  const formDataInitial = DAYS.map((day, index) => {
    return {
      day,
      hours: [{ from: "00:00", to: "00:00" }],
      selected: false,
      index,
    };
  });
  const [timingData, setTimingData] = useState(formDataInitial);
  const [LocationPoint, setLocationPoint] = useState({
    lat: 30.04442,
    lng: 31.235712,
  });

  const [formData, setFormData] = useState({
    location_point: LocationPoint,
    location_name: serchedPlace,
    ...timingData,
  });

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, location_name: serchedPlace };
    });
  }, [serchedPlace]);

  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Location & Working hours</h6>
        </div>
        {/* location */}
        <div className="col-12 p-2">
          <MapLocationField
            htmlFor="companyLocationOnMap"
            name={serchedPlace}
            setShowModal={setShowModal}
          />
        </div>
        <div className="col-12 p-2">
          <DaysAccordion formData={timingData} setFormData={setTimingData} />
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
      <MapModal
        showModal={showModal}
        setShowModal={setShowModal}
        setFormData={setLocationPoint}
        title="Company Location"
        formData={LocationPoint}
        setSerchedPlace={setSerchedPlace}
      />
    </form>
  );
};

export default LocationAndHoursForm;
