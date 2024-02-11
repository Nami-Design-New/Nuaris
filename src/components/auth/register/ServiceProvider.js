import React, { useState } from "react";
import SelectField from "./../../ui/SelectField";
import InputField from "../../ui/InputField";
import PasswordField from "../../ui/PasswordField";
import ReactFlagsSelect from "react-flags-select";
import { State } from "country-state-city";
import LogoUploadField from "../../ui/LogoUploadField";

const ServiceProvider = ({ setFormSelection }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cityForCountry, setCityForCountry] = useState(null);
  function handleSelectCountry(countryCode) {
    setSelectedCountry(countryCode);
    const statesObj = State.getStatesOfCountry(countryCode);
    const statesName = statesObj.map(state => state.name);
    setCityForCountry(statesName);
  }
  const handleBackButtonClick = e => {
    e.preventDefault();
    setFormSelection("");
  };

  return (
    <div className="regiesteration-form">
      <div className="container p-0">
        <div className="row m-0">
          <div className="col-lg-6 col-12 p-2 d-flex flex-column gap-3">
            <InputField
              htmlFor="firstName"
              label="First Name"
              placeholder="Ex: mahmoud"
              id="firstName"
            />
            <InputField
              htmlFor="lastName"
              label="Family Name"
              placeholder="Ex: mahmoud"
              id="lastName"
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <LogoUploadField htmlFor="logo" label="Upload Your Logo" />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="email"
              label="Email Address"
              placeholder="EX: mail@mail.com"
              type="email"
              id="email"
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="phone">Mobile Number</label>
              <div className="phone-group">
                <div className="phone-code">
                  <ReactFlagsSelect
                    searchable={false}
                    selectedSize={false}
                    onSelect={code => setSelectedCountry(code)}
                    selected={selectedCountry}
                    defaultCountry="AE"
                  />
                </div>
                <input
                  placeholder="0XXXXXXXXX"
                  type="tel"
                  id="phone"
                  name="phone"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="userName"
              label="Username"
              placeholder="EX: mahmoudgmal"
              id="userName"
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <PasswordField htmlFor="password" label="Password" />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="commercialName"
              label="Commercial Name"
              placeholder="EX: luxury "
              id="commercialName"
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              htmlFor="commercialRegistrationType"
              label="Commercial registration Type"
              options={[
                "Freelancer",
                "Sole Proprietorship",
                "Partnership",
                "Limited Liability Company",
                "Corporation"
              ]}
              id="commercialRegistrationType"
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="commercialRegistrationNumber"
              label="Commercial registration Number"
              placeholder="XXXX XXXX XXXX XXXX"
              id="commercialRegistrationNumber"
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label htmlFor="companyLocation">
                Company Location. (Country)
              </label>
              <ReactFlagsSelect
                searchable={true}
                selectedSize={false}
                onSelect={code => {
                  handleSelectCountry(code);
                }}
                selected={selectedCountry}
                defaultCountry="AE"
              />
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="input-field">
              <label htmlFor="city">Company Location (City)</label>
              <select name="city" id="city">
                {cityForCountry
                  ? cityForCountry.map((city, index) =>
                      <option key={index} value={city}>
                        {city}
                      </option>
                    )
                  : <option value={""}>Please select a country</option>}
              </select>
            </div>
          </div>
          <div className="col-12 p-2 mt-3">
            <div className="buttons">
              <button className="back" onClick={handleBackButtonClick}>
                <i className="fa-light fa-arrow-left" />
              </button>
              <button type="submit" className="log">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
