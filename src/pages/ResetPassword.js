import React, { useState } from "react";
import logoH from "../assets/images/logoH.svg";
import ResetForm from "../components/auth/reset-password/ResetForm";
import OtpForm from "./../components/auth/reset-password/OtpForm";
import NewPassword from "./../components/auth/reset-password/NewPassword";

const ResetPassword = () => {
  const [resetPasswordStep, setResetPasswordStep] = useState("s1");
  const [formData, setFormData] = useState({});
  const [otpFromResponse, setOtpFromResponse] = useState("");

  let title, subTitle;
  if (resetPasswordStep === "s1") {
    title = "Forgot your password ..!";
    subTitle =
      "Please enter the registered email or phone number with us to receive the verification code.";
  } else if (resetPasswordStep === "s2") {
    title = "Enter verification code";
    subTitle = <>Please enter the verification code sent to <span>{formData.email}</span>.</>;
  } else {
    title = "update your password..!";
    subTitle = "Create a new robust and memorable password.";
  }

  return (
    <section className="reset-section">
      <div className="header">
        <div className="logo">
          <img src={logoH} alt="logo" />
        </div>
      </div>
      <div className="reset-container">
        <h1>
          {title}
        </h1>
        <p>
          {subTitle}
        </p>
        {resetPasswordStep === "s1" &&
          <ResetForm
            setResetPasswordStep={setResetPasswordStep}
            formData={formData}
            setFormData={setFormData}
            setOtpFromResponse={setOtpFromResponse}
          />}
        {resetPasswordStep === "s2" &&
          <OtpForm
            setResetPasswordStep={setResetPasswordStep}
            formData={formData}
            otpFromResponse={otpFromResponse}
            setFormData={setFormData}
          />}
        {resetPasswordStep === "s3" &&
          <NewPassword formData={formData} setFormData={setFormData} />}
      </div>
    </section>
  );
};

export default ResetPassword;
