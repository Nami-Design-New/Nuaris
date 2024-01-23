import React, { useState } from "react";
import loginImage from "../assets/images/login-image.png";
import LoginForm from "../components/LoginForm";
import OtpForm from "../components/OtpForm";
import LoginSelection from "../components/LoginSelection";
import { Box } from "@mui/material";
import logo from "../assets/images/logo.svg";
import line2 from "../assets/images/Line2.png";

const Login = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({});
  const [selection, setSelection] = useState("Selection");
  return (
    <div className="auth_section">
      <Box
        className="auth-form"
        sx={{
          height: "100%",
          padding: {
            xs: "50px",
            md: "80px 120px",
          },
        }}
      >
        <Box sx={{ paddingBottom: "50px" }}>
          <div className="head">
            <img src={logo} alt="logo" loading="lazy" />
            <img src={line2} alt="line" loading="lazy" />
            <h3>Login</h3>
          </div>
          <div className="create-account">
            <p>You don’t have an Account ?</p>
            <a href="#">Create account</a>
          </div>
        </Box>
        {selection === "Selection" && (
          <LoginSelection setSelection={setSelection} />
        )}
        {selection === "Agent" && (
          <LoginForm
            setShowOtp={setShowOtp}
            formData={formData}
            setFormData={setFormData}
            setSelection={setSelection}
          />
        )}
        {selection === "OTP" && (
          <OtpForm
            formData={formData}
            setFormData={setFormData}
            setSelection={setSelection}
          />
        )}
      
      </Box>
      <div className="login-image">
        <img src={loginImage} alt="logoFav" loading="lazy" />
      </div>
    </div>
  );
};

export default Login;
