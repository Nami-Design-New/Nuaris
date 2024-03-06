import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { State } from "country-state-city";
import { useNavigate } from "react-router";
import ReactFlagsSelect from "react-flags-select";
// ui elements
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import BackButton from "./../../ui/form-elements/BackButton";
import SelectField from "./../../ui/form-elements/SelectField";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import LogoUploadField from "./../../ui/form-elements/LogoUploadField";

const AgentForm = ({ setFormSelection }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityForCountry, setCityForCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    role: "agent",
    country: "SA",
    city: "'Asir",
  });

  // get cities for each country
  const fetchCitiesForCountry = (countryCode) => {
    const citiesArray = State.getStatesOfCountry(countryCode);
    const citiesNames = citiesArray.map((city) => city.name);
    setCities(citiesArray);
    setCityForCountry(citiesNames);
    setFormData({ ...formData, country: countryCode });
  };
  useEffect(() => {
    fetchCitiesForCountry(selectedCountry);
    // eslint-disable-next-line
  }, []);
  // Handle country selection
  const handleSelectCountry = (countryCode) => {
    setSelectedCountry(countryCode);
    fetchCitiesForCountry(countryCode);
  };
  // Handle city selection
  const handleSelectCity = (cityName) => {
    const selectedCity = cities.find((city) => city.name === cityName);
    if (selectedCity) {
      setFormData({
        ...formData,
        city: cityName,
        lat: Number(selectedCity.latitude).toFixed(6),
        lng: Number(selectedCity.longitude).toFixed(6),
      });
    }
  };

  /* form Submit requirments [Host Register] */
  const headersList = {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  };
  const requestOptions = {
    method: "POST",
    url: "/users/",
    headers: headersList,
    data: formData,
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.request(requestOptions);

      console.log(res);

      if (res?.response?.data?.non_field_errors) {
        toast.error(res.response.data.non_field_errors[0]);
        return;
      }

      if (res.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        setErrors(res.response.data);
        toast.error(`Something went wrong`);
      }

      // navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;
        Object.keys(errors).forEach((field) => {
          errors[field].forEach((message) => {
            toast.error(`${field}: ${message}`);
          });
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-ui">
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
            {errors?.email && (
              <small className="error">{errors?.email[0]}</small>
            )}
          </div>
          {/* phone number */}
          <div className="col-lg-6 col-12 p-2">
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="mobile_number"
            />
            {errors?.mobile_number && (
              <small className="error">{errors?.mobile_number[0]}</small>
            )}
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
            {errors?.username && (
              <small className="error">{errors?.username[0]}</small>
            )}
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
            {errors?.commercial_name && (
              <small className="error">{errors?.commercial_name[0]}</small>
            )}
          </div>
          {/* Licnce Type */}
          <div className="col-lg-6 col-12 p-2">
            <SelectField
              htmlFor="licence_type"
              label="Licence Type"
              options={["Freelancer", "Tour Guide"]}
              formData={formData}
              setFormData={setFormData}
              id="licenceType"
            />
            {errors?.licence_type && (
              <small className="error">{errors?.licence_type[0]}</small>
            )}
          </div>
          {/* Licenece Number */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="licence_number"
              type="number"
              label="License Number"
              placeholder="XXXX XXXX XXXX XXXX"
              id="licenseNumber"
              formData={formData}
              setFormData={setFormData}
            />
            {errors?.licence_number && (
              <small className="error">{errors?.licence_number[0]}</small>
            )}
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
                selected={selectedCountry}
                onSelect={(code) => {
                  handleSelectCountry(code);
                }}
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
                onChange={(e) => handleSelectCity(e.target.value)}
              >
                {cityForCountry ? (
                  cityForCountry.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))
                ) : (
                  <option value={""}>Please select city</option>
                )}
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
