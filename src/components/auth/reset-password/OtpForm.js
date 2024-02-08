import React, { useState } from "react";
import Otpcontainer from "./../../../shared/Otpcontainer";

const OtpForm = ({ formData, setFormData, setShowOtp }) => {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = e => {
    e.preventDefault();
    setShowOtp(false);
    setFormData({ ...formData, email: "" });
  };

  return (
    <div className="reset-form">
      <Otpcontainer formData={formData} setFormData={setFormData} />
      <div className="resend">
        <p>00:48</p>
        <h6>Resend the code</h6>
      </div>
      <div className="buttons">
        <button className="back" onClick={handleBackButtonClick}>
          <i className="fa-light fa-arrow-left" />
        </button>
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
          className="log"
        >
          Confirm <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
