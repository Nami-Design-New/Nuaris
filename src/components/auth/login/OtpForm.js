import React, {useState } from "react";
import fav from "../../../assets/images/fav.svg";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../../redux/slices/authSlice";
import Otpcontainer from "../../../shared/Otpcontainer";

const OtpForm = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    await axios
      .request(requestOptions)
      .then(() => {
        dispatch(setIsAuth(true));
        navigate("/");
      })
      .catch(err => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.otp &&
          err.response.data.otp.length > 0
        ) {
          const errorMessage = err.response.data.otp[0];
          toast.error(errorMessage);
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="head">
        <img src={fav} alt="logoFav" loading="lazy" />
        <h1>Enter the verification code</h1>
        <p>
          We've sent a 6-digit confirmation code to
          <span> example@example.com </span>
          enter the code for verification
        </p>
      </div>
      <Otpcontainer formData={formData} setFormData={setFormData} />
      <button
        style={{ opacity: loading ? 0.7 : 1 }}
        disabled={loading}
        type="submit"
      >
        Confirm <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
      </button>
    </form>
  );
};

export default OtpForm;
