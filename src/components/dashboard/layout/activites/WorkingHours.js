import React, { useEffect, useState } from "react";
import { DAYS } from "../../../../constants";
import DaysAccordion from "../../../ui/DaysAccordion";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const WorkingHours = ({ setForm }) => {
  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    setForm("Prices");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Location");
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
  const [formData, setFormData] = useState({
    ...timingData,
  });

  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Working hours</h6>
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
    </form>
  );
};

export default WorkingHours;
