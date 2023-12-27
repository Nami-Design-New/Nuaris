import React, { useEffect, useState } from "react";
import fav from "../assets/images/fav.svg";
import axios from "../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../redux/slices/authSlice";

const OtpForm = ({ formData, setFormData }) => {
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // digits handle input
  const handleInput = (index, event) => {
    const currentInput = event.target;
    const maxLength = parseInt(currentInput.getAttribute("maxlength"), 10);
    if (currentInput.value.length >= maxLength) {
      const nextInput = document.getElementById(`input${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    // Concatenate previous OTP value with current input value
    const newOtpValue =
      otpValue.substring(0, index) +
      currentInput.value +
      otpValue.substring(index + 1);
    setOtpValue(newOtpValue);
    setFormData({ ...formData, otp: newOtpValue });
  };

  // digits handle delete
  const handleKeyDown = (index, event) => {
    const currentInput = event.target;
    const previousInput = document.getElementById(`input${index - 1}`);
    if (
      event.key === "Backspace" &&
      currentInput.value.length === 0 &&
      previousInput
    ) {
      previousInput.focus();
    }
    // Handle backspace by removing the last character from OTP
    if (event.key === "Backspace") {
      const newOtpValue =
        otpValue.substring(0, index - 1) + otpValue.substring(index);
      setOtpValue(newOtpValue);
      setFormData({ ...formData, otp: newOtpValue });
    }
  };

  // focusing first input
  useEffect(() => {
    const firstInput = document.getElementById("input1");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  // submit form
  const [loading, setLoading] = useState(false);
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
      <div className="otp-container">
        {[1, 2, 3, 4, 5, 6].map(index =>
          <input
            key={index}
            id={`input${index}`}
            className="otp-input"
            type="number"
            maxLength="1"
            inputMode="numeric"
            pattern="[0-9]"
            required
            value={otpValue[index - 1] || ""}
            onChange={e => handleInput(index, e)}
            onKeyDown={e => handleKeyDown(index, e)}
          />
        )}
      </div>
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
