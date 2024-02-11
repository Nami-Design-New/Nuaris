import React, { useState } from "react";
import axios from "../../../util/axios";
import Otpcontainer from "./../../../shared/Otpcontainer";
import { toast } from "react-toastify";

const OtpForm = ({ formData, setFormData, setResetPasswordStep }) => {
  const [loading, setLoading] = useState(false);

  const handleBackButtonClick = e => {
    e.preventDefault();
    setResetPasswordStep("s1");
    setFormData({ ...formData, email: "" });
  };

  const headersList = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  const requestOptions = {
    method: "POST",
    url: "/users/login-otp/",
    headers: headersList,
    data: formData
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.request(requestOptions);

    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.otp &&
        error.response.data.otp.length > 0
      ) {
        const errorMessage = error.response.data.otp[0];
        toast.error(errorMessage);
      }
    } finally {
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
        <button
          style={{ opacity: loading ? 0.7 : 1 }}
          disabled={loading}
          type="submit"
          className="log"
        >
          Confirm <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
