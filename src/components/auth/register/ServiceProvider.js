import React, { useEffect, useState } from "react";
import axios from "../../../util/axios";
import { toast } from "react-toastify";
import { State } from "country-state-city";
import { useNavigate } from "react-router";
import ReactFlagsSelect from "react-flags-select";
// ui elements
import MapModal from "./../../ui/map-modal/MapModal";
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import BackButton from "./../../ui/form-elements/BackButton";
import PasswordField from "../../ui/form-elements/PasswordField";
import SubmitButton from "./../../ui/form-elements/SubmitButton";
import LogoUploadField from "./../../ui/form-elements/LogoUploadField";
import MapLocationField from "./../../ui/form-elements/MapLocationField";

const ServiceProvider = ({ setFormSelection }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cities, setCities] = useState([]);
  const [cityForCountry, setCityForCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [checkedProducts, setCheckedProducts] = useState(false);
  const [checkedServices, setCheckedServices] = useState(false);
  const [serchedPlace, setSerchedPlace] = useState("Search on Map");
  const [formData, setFormData] = useState({
    registration_type: "Company",
    role: "support_user",
    country: "SA",
    city: "'Asir",
    lat: "30.044420",
    lng: "31.235712",
  });
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
        lat: selectedCity.latitude,
        lng: selectedCity.longitude,
      });
    }
  };
  const handleProductsChange = (e) => {
    setCheckedProducts(e.target.checked);
    if (checkedProducts) {
      checkedServices === true
        ? setFormData({ ...formData, business_core: "services" })
        : setFormData({ ...formData, business_core: "" });
    } else {
      checkedServices === true
        ? setFormData({ ...formData, business_core: "both" })
        : setFormData({ ...formData, business_core: "products" });
    }
  };
  const handleServicesChange = (e) => {
    setCheckedServices(e.target.checked);
    if (checkedServices) {
      checkedProducts === true
        ? setFormData({ ...formData, business_core: "products" })
        : setFormData({ ...formData, business_core: "" });
    } else {
      checkedProducts === true
        ? setFormData({ ...formData, business_core: "both" })
        : setFormData({ ...formData, business_core: "services" });
    }
  };
  /* form Submit Register  */
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
      await axios.request(requestOptions);
      toast.success("Account created successfully");
      navigate("/login");
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
            <PhoneField
              formData={formData}
              setFormData={setFormData}
              id="mobile_number"
            />
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
          {/* registration number */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="registration_number"
              type="number"
              label="Registration Number"
              placeholder="XXXX XXXX XXXX XXXX"
              id="commercialRegistrationNumber"
              formData={formData}
              setFormData={setFormData}
            />
          </div>
          {/* Company core */}
          <div className="col-lg-6 col-12 p-2">
            <div className="check-field">
              <label htmlFor="company_core">
                Company core <span>( you can choose both )</span>
              </label>
              <div className="inputs">
                <label htmlFor="products">
                  <input
                    type="checkbox"
                    name="core"
                    id="products"
                    onChange={handleProductsChange}
                    checked={checkedProducts}
                  />
                  <span>products</span>
                </label>
                <label htmlFor="services">
                  <input
                    type="checkbox"
                    name="core"
                    id="services"
                    onChange={handleServicesChange}
                    checked={checkedServices}
                  />
                  <span>services</span>
                </label>
              </div>
            </div>
          </div>
          {/* Company major business lines */}
          <div className="col-lg-6 col-12 p-2">
            <InputField
              htmlFor="business_lines"
              label="Company major business lines"
              placeholder="Write here"
              type="text"
              id="businessLines"
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
                selected={selectedCountry}
                onSelect={(code) => {
                  handleSelectCountry(code);
                }}
              />
            </div>
          </div>
          {/* City */}
          <div className="col-lg-6 col-12 p-2">
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
                  <option value={""}>Please select a country</option>
                )}
              </select>
            </div>
          </div>
          {/* longitude latitude */}
          <div className="col-12 p-2">
            <MapLocationField
              htmlFor="companyLocationOnMap"
              label="Company Location"
              hint="(on map)"
              name={serchedPlace}
              setShowModal={setShowModal}
            />
          </div>
          {/* map modal */}
          <MapModal
            showModal={showModal}
            setShowModal={setShowModal}
            setFormData={setFormData}
            formData={formData}
            setSerchedPlace={setSerchedPlace}
          />
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

export default ServiceProvider;
