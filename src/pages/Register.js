import React, { useState } from "react";
import registerImage from "../assets/images/register-image.png";
import RegisterForm from "../components/auth/register/RegisterForm";
import ServiceProviderForm from "../components/auth/register/ServiceProviderForm";
import OtpForm from "../components/auth/register/OtpForm";
import RegisterSelection from "../components/auth/register/RegisterSelection";
import { Box, Typography } from "@mui/material";
import logo from "../assets/images/logo.svg";
import line2 from "../assets/images/Line2.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HostForm from "../components/auth/register/HostForm";
import AgentForm from "../components/auth/register/AgentForm";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#006980",
    },
    InputBG: {
      main: "#F8F8F8",
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          borderRadius: "12px",
          border: "1px solid #F2F2F2",
          background: "#F8F8F8",
          "&:focus": {
            borderRadius: "12px",
          },
        },
        icon: {
          color: "#006980",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          // Custom styles
          borderRadius: "12px",
          border: "1px solid #F2F2F2",
          background: "#F8F8F8",
          // Note: You may also need to style the focused state
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "1px solid white",
            },
            "&:hover fieldset": {
              borderColor: "#006980", // Optional: Hover state
            },
            "&.Mui-focused fieldset": {
              borderColor: "#006980", // Optional: Focus state
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#006980",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#006980",
          },
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#F2F2F2",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          color: "#231F20",
          fontFamily: "Outfit",
          fontSize: "16px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
          paddingBottom: "8px",
        },
      },
    },
  },
});

const Register = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({});
  const [selection, setSelection] = useState("Selection");
  return (
    <div className="auth_section">
      <Box
        className="auth-form"
        sx={{
          height: "100%",
          flex: selection === "Selection" || selection === "OTP" ? "1" : "3",
          padding: {
            xs: "16px",
            md: "80px 120px",
          },
        }}
      >
        <Box sx={{ paddingBottom: "50px" }}>
          <div className="head">
            <img src={logo} alt="logo" loading="lazy" />
            <img src={line2} alt="line" loading="lazy" />
            <h3>
              {selection === "Selection" || selection === "OTP"
                ? "Register"
                : selection}
            </h3>
          </div>
          <div className="create-account">
            <p>You already have an Account ?</p>
            <a href="login">Login</a>
          </div>
        </Box>
        {selection === "Selection" && (
          <RegisterSelection setSelection={setSelection} />
        )}
        {selection === "Register" && (
          <RegisterForm
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
        {selection === "Service Provider" && (
          <ThemeProvider theme={theme}>
            <ServiceProviderForm
              formData={formData}
              setFormData={setFormData}
              setSelection={setSelection}
            />
          </ThemeProvider>
        )}

        {selection === "Host" && (
          <ThemeProvider theme={theme}>
            <HostForm
              formData={formData}
              setFormData={setFormData}
              setSelection={setSelection}
            />
          </ThemeProvider>
        )}
        {selection === "Agent" && (
          <ThemeProvider theme={theme}>
            <AgentForm
              formData={formData}
              setFormData={setFormData}
              setSelection={setSelection}
            />
          </ThemeProvider>
        )}
      </Box>
      <Box
        className="auth-image-container"
        sx={{
          flex: "1",
        }}
      >
        <img
          src={registerImage}
          className="register-image"
          alt="logoFav"
          loading="lazy"
        />
      </Box>
    </div>
  );
};

export default Register;
