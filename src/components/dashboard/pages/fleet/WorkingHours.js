import React, { useState } from "react";
import DaysAccordion from "../../../ui/DaysAccordion";

const WorkingHours = () => {
  const [formData, setFormData] = useState({});
  return (
    <div className="fleet_form__wrapper">
      <div className="bg_white_card">
        <form className="form-ui">
          <div className="row m-0">
            <div className="col-12 p-2">
              <h6 className="form_title">Working Hours</h6>
            </div>
            <div className="col-12 p-2">
              <DaysAccordion formData={formData} setFormData={setFormData} />
            </div>
            <div className="col-12 p-2 pt-4 d-flex gap-3 ">
              <button className="save_btn ms-auto">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkingHours;
