import React, { useState } from "react";
import CommentField from "../../../ui/form-elements/CommentField";
import InputField from "../../../ui/form-elements/InputField";
import add from "../../../../assets/images/add.svg";

const PolicyForm = () => {
  const [formData, setFormData] = useState({
    weatherRestriction: "",
    rolesAndInstructions: "",
    allowedAndNotAllowed: "",
  });
  return (
    <div className="form-ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Renting Policy & Cancelation Policy</h6>
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="weatherRestriction"
            label="Weather Restriction"
            placeholder="Write here"
            id="weatherRestriction"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="rolesAndInstructions"
            label="Rules and instructions"
            placeholder="Write here"
            id="rolesAndInstructions"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <CommentField
            htmlFor="allowedAndNotAllowed"
            label="Allowed and not allowed items on board"
            placeholder="Write here"
            id="allowedAndNotAllowed"
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <div className="col-12 p-2">
          <div className="input-field policy_form">
            <div className="header">
              <label>Cancelation Policy</label>
              <button>
                <img src={add} alt="add" />
              </button>
            </div>
            <div className="col-12 p-2 policy_cancel">
              <div>
                <label htmlFor="firstCancelBefore">If cancel before</label>
                <InputField
                  formData={formData}
                  setFormData={setFormData}
                  htmlFor={"firstCancelBefore"}
                  placeholder={"Write here"}
                />
              </div>
              <div>
                <label htmlFor="secondDaysRefund">Days refund is</label>
                <InputField
                  formData={formData}
                  setFormData={setFormData}
                  htmlFor={"secondDaysRefund"}
                  placeholder={"00"}
                />
              </div>
            </div>
            <div className="col-12 p-2 policy_cancel">
              <div>
                <label htmlFor="secondCancelBefore">If cancel before</label>
                <InputField
                  formData={formData}
                  setFormData={setFormData}
                  htmlFor={"secondCancelBefore"}
                  placeholder={"Write here"}
                />
              </div>
              <div>
                <label h tmlFor="firstDaysRefund">
                  Days refund is
                </label>
                <InputField
                  formData={formData}
                  setFormData={setFormData}
                  htmlFor={"firstDaysRefund"}
                  placeholder={"00"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyForm;
