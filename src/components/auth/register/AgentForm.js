import React, { useState } from "react";
// ui
import SelectField from "./../../ui/form-elements/SelectField";
import InputField from "../../ui/form-elements/InputField";
import PasswordField from "../../ui/form-elements/PasswordField";
import LogoUploadField from "./../../ui/form-elements/LogoUploadField";
import BackButton from "./../../ui/form-elements/BackButton";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import ReactFlagsSelect from "react-flags-select";

import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { State } from "country-state-city";
import { useNavigate } from "react-router";

const AgentForm = ({ setFormSelection }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: "agent",
    registration_type: "Company"
  });
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [cityForCountry, setCityForCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSelectCountry(countryCode) {
    setSelectedCountry(countryCode);
    const statesObj = State.getStatesOfCountry(countryCode);
    const statesName = statesObj.map(state => state.name);
    setCityForCountry(statesName);
    setFormData({ ...formData, country: countryCode });
  }
  /* form Submit Register  */
  const headersList = {
    Accept: "*/*",
    "Content-Type": "multipart/form-data"
  };
  const requestOptions = {
    method: "POST",
    url: "/users/",
    headers: headersList,
    data: formData
  };
  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.request(requestOptions);
      toast.success(`Welcome @${formData.username}`);
      navigate("/host-dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach(field => {
          errors[field].forEach(message => {
            toast.error(`${field}: ${message}`);
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="regiesteration-form">
      <div className="container p-0">
        <div className="row m-0">
          {/* first and last name */}
          <div className="col-lg-6 col-12 p-2 d-flex flex-column gap-3">
            <InputField
              htmlFor="first_name"
              label="First Name"
              placeholder="Ex: mahmoud"
              id="firstName"
              formData={formData}
              setFormData={setFormData}
            />
            <InputField
              htmlFor="last_name"
              label="Family Name"
              placeholder="Ex: mahmoud"
              id="lastName"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* logo */}
          <div className="col-lg-6 col-12 p-2">
            <LogoUploadField
              htmlFor="logo"
              label="Upload Your Logo"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* email */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="email"
              label="Email Address"
              placeholder="EX: mail@mail.com"
              type="email"
              id="email"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* phone number */}
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
          {/* username */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="username"
              label="Username"
              placeholder="EX: mahmoudgmal"
              id="userName"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* password */}
          <div className="col-lg-6 col-12 p-2">
            <PasswordField
              htmlFor="password"
              label="Password"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* commercial name */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="commercial_name"
              label="Commercial Name"
              placeholder="EX: luxury "
              id="commercialName"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* Commercial registration Type */}
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              htmlFor="registration_type"
              label="Commercial registration Type"
              options={[
                "Freelancer",
                "Company",
                "Sole Proprietorship",
                "Partnership",
                "Limited Liability Company",
                "Corporation"
              ]}
              formData={formData}
              setFormData={setFormData}
              id="commercialRegistrationType"
            />
          </div>
          {/* Commercial registration Number */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="registration_number"
              type="number"
              label="Commercial registration Number"
              placeholder="XXXX XXXX XXXX XXXX"
              id="commercialRegistrationNumber"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* country */}
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
          {/* City */}
          <div className="col-12 p-2">
            <div className="input-field">
              <label htmlFor="city">
                Company Location <span>(City)</span>
              </label>
              <select
                name="city"
                id="city"
                onChange={e => {
                  setFormData({ ...formData, city: e.target.value });
                }}
              >
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
              <BackButton setFormSelection={setFormSelection} />
              <SubmitButton loading={loading} name="Confirm" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AgentForm;
