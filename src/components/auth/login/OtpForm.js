import React, { useState } from "react";
import handWave from "../../../assets/images/waving-hand.svg";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../redux/slices/authSlice";
import Otpcontainer from "../../../shared/Otpcontainer";

const OtpForm = ({
  formData,
  setFormData,
  SetShowOtpForm,
  setShowLoginForm
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackButtonClick = e => {
    e.preventDefault();
    setShowLoginForm(true);
    SetShowOtpForm(false);
    setFormData({});
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
      dispatch(setIsAuth(true));
      navigate("/");
      toast.success(`Welcome Back @${response.data.user.username}`);
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
          <button className="back" onClick={handleBackButtonClick}>
            <i className="fa-light fa-arrow-left" />
          </button>
          <button
            style={{ opacity: loading ? 0.7 : 1 }}
            disabled={loading}
            type="submit"
            className="log"
          >
            Confirm{" "}
            <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
