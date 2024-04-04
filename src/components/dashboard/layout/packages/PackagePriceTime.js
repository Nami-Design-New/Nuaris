import React, { useState } from "react";
import { DAYS } from "../../../../constants";
import PricingAccordion from "./PricingAccordion";
import SubmitButton from "../../../ui/form-elements/SubmitButton";

const PackagePriceTime = ({ setForm }) => {
  const periodInitial = {
    start_date: "",
    end_date: "",
    price: "",
    price_type: ""
  };
  const formDataInitial = DAYS.map((day, index) => {
    return {
      day,
      periods: [periodInitial],
      selected: false,
      index
    };
  });
  const [formData, setFormData] = useState(formDataInitial);
  const [loading] = useState(false);

  const handleBack = (e) => {
    e.preventDefault();
    setForm("Package Info");
  };

  return (
    <form className="form-ui">
      <div className="row">
        <div className="col-12 p-2">
          <h6 className="form_title">Package Time & Price</h6>
        </div>
        <div className="col-12 p-2">
          <PricingAccordion formData={formData} setFormData={setFormData} />
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
        </div>
      </div>
    </form>
  );
};

export default PackagePriceTime;
