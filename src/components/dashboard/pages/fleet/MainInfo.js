import React, { useState } from "react";
import MainInfoForm from "../../layout/fleet/MainInfoForm";
import LocationForm from "./../../layout/fleet/LocationForm";
import CrewForm from "./../../layout/fleet/CrewForm";
import PolicyForm from "../../layout/fleet/PolicyForm";

const MainInfo = () => {
  const [form, setForm] = useState("Main Info");
  const [formData, setFormData] = useState({
    lat: 18.2206,
    lng: 42.5047,
  });
  let formComponent;
  if (form === "Main Info") {
    formComponent = (
      <MainInfoForm
        formData={formData}
        setFormData={setFormData}
        setForm={setForm}
      />
    );
  } else if (form === "Location") {
    formComponent = (
      <LocationForm
        formData={formData}
        setFormData={setFormData}
        setForm={setForm}
      />
    );
  } else if (form === "Crew") {
    formComponent = (
      <CrewForm
        formData={formData}
        setFormData={setFormData}
        setForm={setForm}
      />
    );
  } else {
    formComponent = (
      <PolicyForm
        formData={formData}
        setFormData={setFormData}
        setForm={setForm}
      />
    );
  }
  return (
    <div className="fleet_form__wrapper">
      <div className="wizard_tabs">
        {["Main Info", "Location", "Crew", "Policy"].map((fo, i) => (
          <div
            className={`wizard_tab ${form === fo ? "active" : ""}`}
            onClick={() => setForm(fo)}
          >
            <div className="step_no">{i + 1}</div>
            <h6>{fo}</h6>
          </div>
        ))}
      </div>
      <div className="wizard_content">
        <form>{formComponent}</form>
      </div>
    </div>
  );
};

export default MainInfo;
