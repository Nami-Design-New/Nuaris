import React, { useState } from "react";
import wavingHand from "../../../assets/images/waving-hand.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const RegisterSelection = ({ setSelection }) => {
  const [activeButton, setActiveButton] = useState("Agent");
  const handleButtonClick = (value) => {
    setActiveButton(value);
  };

  return (
    <Box sx={{ maxWidth: "480px" }}>
      <div className="login-message">
        <div className="welcome-message">
          <h2>Welcome! </h2>
          <img src={wavingHand} alt="waving hand" loading="lazy" />
        </div>
        <p className="guide">Please select the user type. </p>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginBottom: 1,
            gap: "12px",
          }}
        >
          <Button
            color={activeButton === "Host" ? "secondary" : "InputBG"}
            onClick={() => handleButtonClick("Host")}
            variant="contained"
            sx={{ width: "100%", padding: "36px", boxShadow: "none" }}
          >
            Host
          </Button>
          <Button
            color={activeButton === "Agent" ? "secondary" : "InputBG"}
            sx={{ width: "100%", padding: "36px", boxShadow: "none" }}
            variant="contained"
            onClick={() => handleButtonClick("Agent")}
          >
            Agent
          </Button>
        </Box>
        <Button
          color={activeButton === "Service Provider" ? "secondary" : "InputBG"}
          variant="contained"
          sx={{ padding: "36px", marginTop: "12px", boxShadow: "none" }}
          onClick={() => handleButtonClick("Service Provider")}
        >
          Service Provider
        </Button>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{ padding: "16px 20px" }}
        onClick={() => setSelection(activeButton)}
      >
        Next
      </Button>
    </Box>
  );
};

export default RegisterSelection;
