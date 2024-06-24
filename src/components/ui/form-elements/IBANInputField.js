import React from "react";
import imgPath from "../../../assets/images/btn-bg.svg";

function IBANInputField({ label, hint, ...props }) {
  return (
    <div className="row col-12 m-0 d-flex align-items-end gap-2 input-field flex-row flex-nowrap">
      <div className="col-10 m-0">
        <label htmlFor={props.id}>
          {label} {hint && <span className="hint">{hint}</span>}
        </label>
        <input className="form-control" {...props} />
      </div>
      <div className="col-2 IBAN-btn-box m-0">
        <img src={imgPath} alt="bg img" />
        <span className="IBAN-btn">+</span>
      </div>
    </div>
  );
}
export default IBANInputField;
