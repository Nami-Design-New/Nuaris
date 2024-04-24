import React, { useState } from "react";
import PageHeader from "../../layout/shared/PageHeader";
import MainInfoForm from "../../layout/activites/MainInfoForm";
import Prices from "../../layout/activites/Prices";
import Policy from "../../layout/activites/Policy";
import WorkingHours from "../../layout/activites/WorkingHours";
import Location from "../../layout/activites/Location";

const ActivitiesForm = () => {
  const [form, setForm] = useState("Main Info");
  let formComponent;
  if (form === "Main Info") {
    formComponent = <MainInfoForm setForm={setForm} />;
  } else if (form === "Location") {
    formComponent = <Location setForm={setForm} />;
  } else if (form === "Prices") {
    formComponent = <Prices setForm={setForm} />;
  } else if (form === "Working hours") {
    formComponent = <WorkingHours setForm={setForm} />;
  } else {
    formComponent = <Policy setForm={setForm} />;
  }
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Add New Activity" />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="wizard_tabs">
            {["Main Info", "Location", "Working hours", "Prices", "Policy"].map(
              (fo, i) => (
                <div
                  key={i}
                  className={`wizard_tab ${form === fo ? "active" : ""}`}
                  onClick={() => setForm(fo)}
                >
                  <div className="step_no">{i + 1}</div>
                  <h6>{fo}</h6>
                </div>
              )
            )}
          </div>
          <div className="bg_white_card">{formComponent}</div>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesForm;
