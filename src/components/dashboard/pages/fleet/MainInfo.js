import React, { useState } from "react";
import MainInfoForm from "../../layout/fleet/MainInfoForm";
import LocationForm from "./../../layout/fleet/LocationForm";
import CrewForm from "./../../layout/fleet/CrewForm";
import PolicyForm from "../../layout/fleet/PolicyForm";

const MainInfo = () => {
  const [form, setForm] = useState("Main Info");
  let formComponent;
  if (form === "Main Info") {
    formComponent = <MainInfoForm setForm={setForm} />;
  } else if (form === "Location") {
    formComponent = <LocationForm setForm={setForm} />;
  } else if (form === "Crew") {
    formComponent = <CrewForm setForm={setForm} />;
  } else {
    formComponent = <PolicyForm setForm={setForm} />;
  }
  return (
    <div className="fleet_form__wrapper">
      <div className="wizard_tabs">
        {["Main Info", "Location", "Crew", "Policy"].map((fo, i) => (
          <div
            key={i}
            className={`wizard_tab ${form === fo ? "active" : ""}`}
            onClick={() => setForm(fo)}
          >
            <div className="step_no">{i + 1}</div>
            <h6>{fo}</h6>
          </div>
        ))}
      </div>
      <div className="bg_white_card">{formComponent}</div>
    </div>
  );
};

export default MainInfo;
