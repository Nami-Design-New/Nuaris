import { useState } from "react";
// import MainInfoForm from "./MainInfoForm";
// import MainInfoForm from "../../layout/fleet/MainInfoForm";
// import LocationForm from "./../../layout/fleet/LocationForm";
// import CrewForm from "./../../layout/fleet/CrewForm";
// import PolicyForm from "../../layout/fleet/PolicyForm";

const MainInfo = ({ yacht }) => {
  const [form, setForm] = useState("Main Info");

  return (
    <div className="inner_form_wrapper">
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
      <div className="bg_white_card">
        {/* {form === "Main Info" && <MainInfoForm yacht={yacht} />} */}
      </div>
    </div>
  );
};

export default MainInfo;
