import React, { useState } from "react";
import handWave from "../../../assets/images/waving-hand.svg";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import Otpcontainer from "../../../shared/Otpcontainer";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import FormBackButton from "../../ui/form-elements/FormBackButton";

const OtpForm = ({
  formData,
  setFormData,
  SetShowOtpForm,
  userTypeSelected,
  setShowLoginForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [, setCookie] = useCookies(["token"]);

  const handleBackButtonClick = (e) => {
    e.preventDefault();
    setShowLoginForm(true);
    SetShowOtpForm(false);
    setFormData({});
  };

  const requestOptions = {
    method: "POST",
    url: "/users/login-otp/",
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);
      toast.success(`Welcome Back @${res.data.user.username}`);
      setCookie("token", res.data.access_token, {
        path: "/",
        expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        secure: true,
      });
      setCookie("id", res.data.user.id, {
        path: "/",
        expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
        secure: true,
      });
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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="head">
          Welcome Back ! <img src={handWave} alt="hand-wave" />
        </h2>
        <p className="sub-head">
          Please enter the verification code sent to{" "}
          <span>{formData.email}</span>.
        </p>
        <Otpcontainer formData={formData} setFormData={setFormData} />
        <div className="resend">
          <p>00:48</p>
          <h6>Resend the code</h6>
        </div>
        <div className="buttons">
          <FormBackButton onClick={handleBackButtonClick} />
          <SubmitButton loading={loading} name="Confirm" />
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
