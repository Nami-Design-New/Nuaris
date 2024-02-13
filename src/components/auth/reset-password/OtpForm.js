import React, { useState } from "react";
import Otpcontainer from "./../../../shared/Otpcontainer";
import { toast } from "react-toastify";
import SubmitButton from "./../../ui/form-elements/SubmitButton";

const OtpForm = ({
  formData,
  setFormData,
  setResetPasswordStep,
  otpFromResponse
}) => {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = e => {
    e.preventDefault();
    setResetPasswordStep("s1");
    setFormData({ ...formData, email: "" });
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    if (otpFromResponse === formData.otp) {
      setResetPasswordStep("s3");
    } else {
      toast.error("OTP Incorrect");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reset-form">
      <Otpcontainer formData={formData} setFormData={setFormData} />
      <div className="resend">
        <p>00:48</p>
        <h6>Resend the code</h6>
      </div>
      <div className="buttons">
        <button className="back" onClick={handleBackButtonClick}>
          <i className="fa-light fa-arrow-left" />
        </button>
        <SubmitButton loading={loading} name="Confirm" />
      </div>
    </form>
  );
};

export default OtpForm;
