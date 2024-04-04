import React, { useState } from "react";
import PageHeader from "../../layout/PageHeader";
import PackageInfoForm from "../../layout/packages/PackageInfoForm";
import PackagePriceTime from "../../layout/packages/PackagePriceTime";
import PolicyForm from "../../layout/packages/PolicyForm";

const TripPackagesForm = () => {
  const [form, setForm] = useState("Package Info");
  let formComponent;
  if (form === "Package Info") {
    formComponent = <PackageInfoForm setForm={setForm} />;
  } else if (form === "Package Time & Price") {
    formComponent = <PackagePriceTime setForm={setForm} />;
  } else {
    formComponent = <PolicyForm setForm={setForm} />;
  }
  return (
    <section className="section-main-content">
      <header className="flex-header">
        <PageHeader name="Create Package" />
      </header>
      <div className="row m-0">
        <div className="addon_form_wrapper">
          <div className="wizard_tabs">
            {["Package Info", "Package Time & Price", "Policy"].map((fo, i) => (
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

export default TripPackagesForm;
