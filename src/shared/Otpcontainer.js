import React, { useEffect, useState } from "react";

const Otpcontainer = ({ formData, setFormData }) => {
  const [otpString, setOtpString] = useState("");
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
  };
  // focusing first input
  useEffect(() => {
    const firstInput = document.getElementById("input1");
    if (firstInput) {
      firstInput.focus();
    }
  }, []);
  return (
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
          onChange={e => {
            setOtpString(otpString + e.target.value);
            setFormData(setFormData({ ...formData, otp: otpString }));
          }}
          onInput={event => handleInput(index, event)}
          onKeyDown={event => handleKeyDown(index, event)}
        />
      )}
    </div>
  );
};

export default Otpcontainer;
