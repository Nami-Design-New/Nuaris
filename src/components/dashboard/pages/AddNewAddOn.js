import React from "react";
import { useState } from "react";
import MainInfoForm from "../layout/addons/MainInfoForm";
import WorkingTime from "./../layout/addons/WorkingTime";
import Prices from "../layout/addons/Prices";
import PageHeader from "../layout/PageHeader";

const AddNewAddOn = () => {
  const [form, setForm] = useState("Main Info");
  let formComponent;
  if (form === "Main Info") {
    formComponent = <MainInfoForm setForm={setForm} />;
  } else if (form === "Working Time") {
    formComponent = <WorkingTime setForm={setForm} />;
  } else {
    formComponent = <Prices setForm={setForm} />;
  }
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Add New addons" />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="wizard_tabs">
            {["Main Info", "Working Time", "Prices"].map((fo, i) => (
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
      </div>
    </section>
  );
};

export default AddNewAddOn;
