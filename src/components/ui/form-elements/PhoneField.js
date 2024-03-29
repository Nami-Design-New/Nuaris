import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";

const PhoneField = ({ formData, setFormData, id, value }) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setFormData({ ...formData, [id]: value });
  };

  return (
    <div className="input-field">
      <label htmlFor="phone">Mobile Number</label>
      <div className="phone-group">
        <PhoneInput
          placeholder="Enter phone number"
          value={value || phoneNumber}
          onChange={handlePhoneNumberChange}
          countryOptionsOrder={["SA", "AE"]}
          defaultCountry="SA"
          id="phone"
          name="phone"
        />
      </div>
    </div>
  );
};

export default PhoneField;
