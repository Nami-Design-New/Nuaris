import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";

const PhoneField = ({ formData, setFormData }) => {
  const [phoneNumber, setPhoneNumber] = useState();

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setFormData({ ...formData, phone_number: value });
  };

  return (
    <div className="input-field">
      <label htmlFor="phone">Mobile Number</label>
      <div className="phone-group">
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          countryOptionsOrder={["AE", "SA", "GB", "IN"]}
          defaultCountry="AE"
          id="phone"
          name="phone"
        />
      </div>
    </div>
  );
};

export default PhoneField;
