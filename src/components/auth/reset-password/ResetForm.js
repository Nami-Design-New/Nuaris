import React, { useState } from "react";
import EmailForm from "./EmailForm";
import PhoneForm from "./PhoneForm";

const ResetForm = ({ setShowOtp, formData, setFormData }) => {
  const [formType, setFormType] = useState("email");

  let formComponent;
  if (formType === "email") {
    formComponent = (
      <EmailForm
        formData={formData}
        setFormData={setFormData}
        setShowOtp={setShowOtp}
      />
    );
  } else {
    formComponent = <PhoneForm formData={formData} setFormData={setFormData} />;
  }

  return (
    <div className="reset-form">
      <div className="tabs">
        <button
          className={formType === "email" ? "active" : ""}
          onClick={() => setFormType("email")}
        >
          Email
        </button>
        <button
          className={formType === "phone" ? "active" : ""}
          onClick={() => setFormType("phone")}
        >
          Phone Number
        </button>
      </div>
      {formComponent}
    </div>
  );
};

export default ResetForm;
