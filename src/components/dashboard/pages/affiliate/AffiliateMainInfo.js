import { useState } from "react";
import AffiliateMainInfoForm from "./AffiliateMainInfoForm";
import AffiliateServicesForm from "./AffiliateServicesForm";

function AffiliateMainInfo({ affiliate }) {
  const [form, setForm] = useState("Main Info");

  let formComponent;
  switch (form) {
    case "Main Info":
      formComponent = (
        <AffiliateMainInfoForm setForm={setForm} affiliate={affiliate} />
      );
      break;
    case "Services":
      formComponent = (
        <AffiliateServicesForm setForm={setForm} affiliate={affiliate} />
      );
      break;
    default:
      formComponent = (
        <AffiliateMainInfoForm setForm={setForm} affiliate={affiliate} />
      );
      break;
  }

  return (
    <div className="fleet_form__wrapper">
      <div className="wizard_tabs">
        {["Main Info", "Services"].map((fo, i) => (
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
}

export default AffiliateMainInfo;
