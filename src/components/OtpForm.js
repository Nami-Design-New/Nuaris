import React, { useEffect, useState } from "react";
import axios from "../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../redux/slices/authSlice";
import { Box, Button } from "@mui/material";
import leftArrow from "../assets/images/left-arrow.svg";
import wavingHand from "../assets/images/waving-hand.svg";

const OtpForm = ({ formData, setFormData, setSelection }) => {
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
    "Content-Type": "application/json",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/login-otp/",
    headers: headersList,
    data: formData,
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .request(requestOptions)
      .then(() => {
        dispatch(setIsAuth(true));
        navigate("/");
      })
      .catch((err) => {
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
    <Box>
      <div className="login-message">
        <div className="welcome-message">
          <h2>Welcome Back!</h2>
          <img src={wavingHand} alt="waving hand" loading="lazy" />
        </div>
        <p className="guide">
          Enter the verification code sent to<span> mail@mail.com</span>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="otp-container">
          {[1, 2, 3, 4, 5, 6].map((index) => (
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
              onChange={(e) => handleInput(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>
        <Box className="submit-buttons">
          <Button
            sx={{
              border: "1px solid grey",
              flex: 1,
              ":hover": {
                border: "1px solid #006980",
              },
            }}
            variant="outlined"
            disabled={loading}
            onClick={() => setSelection("Selection")}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin" />
            ) : (
              <img src={leftArrow} alt="left arrow" loading="lazy" />
            )}
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            type="submit"
            color="secondary"
            sx={{ flex: 13 }}
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin ml-5" />
            ) : (
              "Confirm"
            )}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default OtpForm;
