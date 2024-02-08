import React, { useState } from "react";
import logoH from "../assets/images/logoH.svg";
import ResetForm from "../components/auth/reset-password/ResetForm";
import OtpForm from "./../components/auth/reset-password/OtpForm";

const ResetPassword = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({});
  return (
    <section className="reset-section">
      <div className="header">
        <div className="logo">
          <img src={logoH} alt="logo" />
        </div>
      </div>
      <div className="reset-container">
        <h1>
          {!showOtp ? "forgot your password ..!" : "Enter Verification Code"}
        </h1>
        <p>
          {!showOtp
            ? `Please enter the registered email or phone number with us to receive the verification code.`
            : <>Please enter the verification code sent to <span>{formData.email}</span>.</>}
        </p>
        {!showOtp
          ? <ResetForm
              setShowOtp={setShowOtp}
              formData={formData}
              setFormData={setFormData}
            />
          : <OtpForm
              setShowOtp={setShowOtp}
              formData={formData}
              setFormData={setFormData}
            />}
      </div>
    </section>
  );
};

export default ResetPassword;
