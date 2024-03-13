import React from "react";
import SubmitButton from "../../../ui/form-elements/SubmitButton";
import { useState } from "react";

const Prices = ({ setForm }) => {
  const [loading] = useState(false);
  const handleBack = (e) => {
    e.preventDefault();
    setForm("Working Time");
  };
  return (
    <form className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Prices</h6>
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

export default Prices;
